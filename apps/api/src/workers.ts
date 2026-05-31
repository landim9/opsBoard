import { Queue, Worker } from 'bullmq'
import Redis from 'ioredis'
import prisma from '@opsboard/db'
import { CronExpressionParser } from 'cron-schedule'

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
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
 */
function shouldRunToday(routine: {
  frequency: string
  cronExpression: string | null
}): boolean {
  const now = new Date()

  // Rotinas com cronExpression customizada: usa cron-schedule
  if (routine.cronExpression) {
    try {
      const cron = CronExpressionParser.parse(routine.cronExpression)
      // Verifica se o cron está previsto para hoje
      const prev = cron.prev()
      const todayStart = new Date(now)
      todayStart.setHours(0, 0, 0, 0)
      return prev >= todayStart
    } catch {
      // Se o cron for inválido, cai no fallback por frequência
    }
  }

  // Fallback baseado em frequência
  switch (routine.frequency) {
    case 'daily':
      return true
    case 'weekly':
      // Executa toda segunda-feira (dia 1)
      return now.getDay() === 1
    case 'monthly':
      // Executa no primeiro dia do mês
      return now.getDate() === 1
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
      },
    })

    let createdCount = 0

    for (const routine of activeRoutines) {
      // Pula rotinas que não estão agendadas para hoje
      if (!shouldRunToday(routine)) continue

      // Evita criar duplicatas para o mesmo dia
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)

      const existing = await prisma.execution.findFirst({
        where: {
          routineId: routine.id,
          createdAt: { gte: todayStart },
        },
      })

      if (!existing) {
        // Calcula due date com base no SLA ou fim do dia
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
        pattern: '0 0 * * *', // Todo dia à meia-noite
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
