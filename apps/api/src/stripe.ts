import Stripe from 'stripe'
import prisma from '@opsboard/db'
import type { SubscriptionStatus } from '@opsboard/db'

// ✅ Versão da API Stripe centralizada — atualize aqui quando migrar
const STRIPE_API_VERSION = '2025-04-30.basil' as const

// ✅ Falha explicitamente se a chave não estiver definida
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    'STRIPE_SECRET_KEY não definido. Defina a variável de ambiente antes de iniciar o servidor.'
  )
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: STRIPE_API_VERSION,
})

/**
 * Mapeia o status de assinatura do Stripe para o enum do Prisma.
 * Garante type-safety e evita `as any`.
 */
function mapStripeStatusToPrisma(status: Stripe.Subscription.Status): SubscriptionStatus {
  const map: Record<string, SubscriptionStatus> = {
    active: 'active',
    past_due: 'past_due',
    canceled: 'canceled',
    trialing: 'trialing',
    unpaid: 'canceled',
    incomplete: 'past_due',
    incomplete_expired: 'canceled',
    paused: 'canceled',
  }
  return map[status] ?? 'canceled'
}

/**
 * Tipo explícito para o raw body do Stripe no Fastify.
 * Evita `as any` no request.
 */
interface FastifyRequestWithRawBody {
  headers: Record<string, string | string[] | undefined>
  url: string
  rawBody?: Buffer
  body: unknown
  log: {
    error: (msg: string, ...args: unknown[]) => void
    info: (msg: string, ...args: unknown[]) => void
  }
}

interface FastifyReply {
  status: (code: number) => FastifyReply
  send: (payload?: unknown) => void
}

// Webhook payload parser (Fastify requires raw body for Stripe signature validation)
export const handleWebhook = async (
  request: FastifyRequestWithRawBody,
  reply: FastifyReply
) => {
  const sig = request.headers['stripe-signature'] as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (!webhookSecret) throw new Error('Missing STRIPE_WEBHOOK_SECRET')
    if (!request.rawBody) throw new Error('Missing raw body — verifique o content type parser')

    event = stripe.webhooks.constructEvent(request.rawBody, sig, webhookSecret)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    request.log.error(`Webhook signature verification failed: ${message}`)
    return reply.status(400).send({ error: `Webhook Error: ${message}` })
  }

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
              plan: 'pro',
              subscriptionStatus: 'active',
            },
          })

          await prisma.activityLog.create({
            data: {
              workspaceId,
              action: 'plan_upgraded',
              entityType: 'workspace',
              entityId: workspaceId,
            },
          })
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const mappedStatus = mapStripeStatusToPrisma(subscription.status)
        const isActive = mappedStatus === 'active' || mappedStatus === 'trialing'

        const workspace = await prisma.workspace.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        })

        if (workspace) {
          await prisma.workspace.update({
            where: { id: workspace.id },
            data: {
              subscriptionStatus: mappedStatus,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              plan: isActive ? workspace.plan : 'free',
            },
          })

          if (!isActive) {
            await prisma.activityLog.create({
              data: {
                workspaceId: workspace.id,
                action: 'plan_downgraded',
                entityType: 'workspace',
                entityId: workspace.id,
              },
            })
          }
        }
        break
      }

      default:
        request.log.info(`Unhandled event type ${event.type}`)
    }
  } catch (err: unknown) {
    // ✅ Loga o erro completo server-side sem vazar detalhes internos para o cliente
    request.log.error('Error processing webhook:', err)
    return reply.status(500).send({ error: 'Webhook handler failed. Verifique os logs do servidor.' })
  }

  reply.send({ received: true })
}

export async function createCheckoutSession(
  workspaceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } })
  if (!workspace) throw new Error('Workspace not found')

  if (!process.env.STRIPE_PRO_PRICE_ID) {
    throw new Error('STRIPE_PRO_PRICE_ID não definido.')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    client_reference_id: workspaceId,
    customer: workspace.stripeCustomerId || undefined,
    line_items: [
      {
        price: process.env.STRIPE_PRO_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session.url
}
