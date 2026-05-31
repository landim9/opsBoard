import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import jwt from '@fastify/jwt'
import rateLimit from '@fastify/rate-limit'
import { handleWebhook, createCheckoutSession } from './stripe'
import { startWorkers } from './workers'

// ✅ Segurança: não subir com JWT secret padrão em nenhum ambiente
if (!process.env.JWT_SECRET) {
  throw new Error(
    'JWT_SECRET não definido. Defina a variável de ambiente antes de iniciar o servidor.'
  )
}

const fastify = Fastify({
  logger: process.env.NODE_ENV === 'development',
})

// ✅ CORS com origens explícitas — nunca usar origin: true em produção
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())

// ✅ Interface tipada para evitar `as any` no raw body do Stripe
declare module 'fastify' {
  interface FastifyRequest {
    rawBody?: Buffer
  }
}

// Plugins
fastify.addContentTypeParser('application/json', { parseAs: 'buffer' }, (req, body, done) => {
  try {
    if (req.url.startsWith('/webhooks/stripe')) {
      req.rawBody = body as Buffer
    }
    const json = JSON.parse((body as Buffer).toString())
    done(null, json)
  } catch (err) {
    done(err as Error, undefined)
  }
})

fastify.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'), false)
    }
  },
  credentials: true,
})
fastify.register(helmet)
fastify.register(rateLimit, { max: 100, timeWindow: '1 minute' })
fastify.register(jwt, { secret: process.env.JWT_SECRET })

// ✅ Tipos explícitos no hook de autenticação
interface JwtPayload {
  workspaceId: string
  userId: string
}

const authenticate = async (request: any, reply: any) => {
  try {
    await request.jwtVerify()
  } catch {
    reply.status(401).send({ error: 'Unauthorized' })
  }
}

// Routes
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

// Stripe Webhooks (Raw Body — sem autenticação JWT, usa assinatura Stripe)
fastify.post('/webhooks/stripe', { config: { rawBody: true } }, handleWebhook)

// ✅ Checkout protegido por JWT
fastify.post(
  '/api/billing/checkout',
  { preHandler: [authenticate] },
  async (request, reply) => {
    const jwtPayload = (request as any).user as JwtPayload
    const { successUrl, cancelUrl } = request.body as {
      successUrl: string
      cancelUrl: string
    }

    if (!jwtPayload?.workspaceId) {
      return reply.status(400).send({ error: 'workspaceId ausente no token JWT' })
    }

    try {
      const url = await createCheckoutSession(jwtPayload.workspaceId, successUrl, cancelUrl)
      return { url }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Internal server error'
      return reply.status(500).send({ error: message })
    }
  }
)

// Start
const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' })
    console.log(`API running on port ${process.env.PORT || 3001}`)

    if (process.env.NODE_ENV !== 'test') {
      await startWorkers()
    }
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
