import { Queue, Worker } from 'bullmq'
import Redis from 'ioredis'
import prisma from '@opsboard/db'
import { CronExpressionParser } from 'cron-schedule'

// ✅ Conexão Redis com handler de erro explícito para evitar crashes silenciosos
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
})

connection.on('error', (err) => {
  console.error('[Redis] Connection error:', err.message)
})

connection.on('reconnecting', () => {
  console.warn('[Redis] Reconnecting...')
})

// ==========================================
// Queues
// ==========================================
export const routineQueue = new Queue('routine-scheduler', { connection })
export const overdueQueue = new Queue('overdue-checker', { connection })

// ==========================================
// Helpers
// ==========================================

/**
 * Verifica se uma rotina deve gerar uma execução hoje,
 * baseando-se na frequência e/ou cronExpression configurada.
 *
 * @param routine - Objeto com frequência e cronExpression
 * @param timezone - Timezone do workspace (padrão: UTC)
 */
function shouldRunToday(
  routine: { frequency: string; cronExpression: string | null },
  timezone = 'UTC'
): boolean {
  // Usa a timezone do workspace para determinar o "hoje" correto
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: timezone })
  )

  // Rotinas com cronExpression customizada: usa cron-schedule
  if (routine.cronExpression) {
    try {
      const cron = CronExpressionParser.parse(routine.cronExpression)
      const prev = cron.prev()
      const todayStart = new Date(now)
      todayStart.setHours(0, 0, 0, 0)
      return prev >= todayStart
    } catch {
      // Se o cron for inválido, cai no fallback por frequência
      console.warn(
        `[Worker] cronExpression inválida para rotina com frequência "${routine.frequency}". Usando fallback.`
      )
    }
  }

  // Fallback baseado em frequência
  switch (routine.frequency) {
    case 'daily':
      return true
    case 'weekly':
      return now.getDay() === 1 // Segunda-feira
    case 'monthly':
      return now.getDate() === 1 // Primeiro do mês
    default:
      return false
  }
}

// ==========================================
// Workers
// ==========================================

export const routineWorker = new Worker(
  'routine-scheduler',
  async (job) => {
    console.log(`[Worker] Running routine scheduler: ${job.id}`)

    const activeRoutines = await prisma.routine.findMany({
      where: { isActive: true },
      select: {
        id: true,
        workspaceId: true,
        assignedToId: true,
        slaHours: true,
        frequency: true,
        cronExpression: true,
        // ✅ Incluindo timezone do workspace para shouldRunToday
        workspace: {
          select: { timezone: true },
        },
      },
    })

    let createdCount = 0

    for (const routine of activeRoutines) {
      const timezone = (routine as any).workspace?.timezone ?? 'UTC'

      if (!shouldRunToday(routine, timezone)) continue

      const todayStart = new Date(
        new Date().toLocaleString('en-US', { timeZone: timezone })
      )
      todayStart.setHours(0, 0, 0, 0)

      const existing = await prisma.execution.findFirst({
        where: {
          routineId: routine.id,
          createdAt: { gte: todayStart },
        },
      })

      if (!existing) {
        const dueAt = new Date()
        if (routine.slaHours) {
          dueAt.setTime(Date.now() + routine.slaHours * 60 * 60 * 1000)
        } else {
          dueAt.setHours(23, 59, 59, 999)
        }

        await prisma.execution.create({
          data: {
            workspaceId: routine.workspaceId,
            routineId: routine.id,
            assignedToId: routine.assignedToId,
            status: 'pending',
            dueAt,
          },
        })
        createdCount++
      }
    }

    console.log(`[Worker] routine-scheduler generated ${createdCount} executions.`)
    return { createdCount }
  },
  { connection }
)

export const overdueWorker = new Worker(
  'overdue-checker',
  async (job) => {
    console.log(`[Worker] Running overdue checker: ${job.id}`)

    const now = new Date()

    const result = await prisma.execution.updateMany({
      where: {
        status: 'pending',
        dueAt: { lt: now },
      },
      data: {
        status: 'overdue',
      },
    })

    console.log(`[Worker] overdue-checker marked ${result.count} executions as overdue.`)
    return { updatedCount: result.count }
  },
  { connection }
)

// ==========================================
// Init Schedules
// ==========================================
export async function startWorkers() {
  await routineQueue.add(
    'daily-generation',
    {},
    {
      repeat: {
        pattern: '0 0 * * *', // Todo dia à meia-noite UTC
      },
    }
  )

  await overdueQueue.add(
    'hourly-check',
    {},
    {
      repeat: {
        pattern: '0 * * * *', // A cada hora
      },
    }
  )

  console.log('BullMQ Workers and Schedulers started.')
}
