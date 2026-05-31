import Stripe from 'stripe'
import prisma from '@opsboard/db'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not defined. Stripe integration will not work.')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-06-20',
})

// Webhook payload parser (Fastify requires raw body for Stripe signature validation)
export const handleWebhook = async (request: any, reply: any) => {
  const sig = request.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (!webhookSecret) throw new Error('Missing webhook secret')
    // Note: Fastify needs to be configured to expose raw body for this route
    event = stripe.webhooks.constructEvent(request.rawBody, sig, webhookSecret)
  } catch (err: any) {
    request.log.error(`Webhook signature verification failed: ${err.message}`)
    return reply.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const workspaceId = session.client_reference_id
        
        if (workspaceId && session.subscription) {
          await prisma.workspace.update({
            where: { id: workspaceId },
            data: {
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: session.subscription as string,
              plan: 'pro', // Defaulting to pro on checkout success for MVP
              subscriptionStatus: 'active',
            },
          })
          
          await prisma.activityLog.create({
            data: {
               workspaceId,
               action: 'plan_upgraded',
               entityType: 'workspace',
               entityId: workspaceId,
            }
          })
        }
        break
      }
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const status = subscription.status

        const workspace = await prisma.workspace.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        })

        if (workspace) {
          await prisma.workspace.update({
            where: { id: workspace.id },
            data: {
              subscriptionStatus: status as any,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              plan: status === 'active' || status === 'trialing' ? workspace.plan : 'free',
            },
          })

          if (status === 'canceled' || status === 'unpaid') {
             await prisma.activityLog.create({
               data: {
                 workspaceId: workspace.id,
                 action: 'plan_downgraded',
                 entityType: 'workspace',
                 entityId: workspace.id,
               }
             })
          }
        }
        break
      }
      default:
        request.log.info(`Unhandled event type ${event.type}`)
    }
  } catch (err) {
    request.log.error('Error processing webhook:', err)
    return reply.status(500).send('Webhook handler failed')
  }

  reply.send({ received: true })
}

export async function createCheckoutSession(workspaceId: string, successUrl: string, cancelUrl: string) {
   const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } })
   if (!workspace) throw new Error("Workspace not found")

   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: workspaceId,
      customer: workspace.stripeCustomerId || undefined,
      line_items: [
         {
            price: process.env.STRIPE_PRO_PRICE_ID || 'price_test_123',
            quantity: 1,
         }
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
   })

   return session.url
}
