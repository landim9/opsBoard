import { Queue, Worker, QueueScheduler } from 'bullmq'
import Redis from 'ioredis'
import prisma from '@opsboard/db'

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

// ==========================================
// Queues
// ==========================================
export const routineQueue = new Queue('routine-scheduler', { connection })
export const overdueQueue = new Queue('overdue-checker', { connection })

// ==========================================
// Workers
// ==========================================

export const routineWorker = new Worker('routine-scheduler', async (job) => {
  console.log(`[Worker] Running routine scheduler: ${job.id}`)
  
  // 1. Fetch active routines that are due to run today
  // For MVP, we will simulate the check. In production, we'd use cron parsers (like cron-parser)
  // to evaluate `cronExpression` against the current Date and generate Executions.

  const activeRoutines = await prisma.routine.findMany({
    where: { isActive: true },
  })

  let createdCount = 0

  for (const routine of activeRoutines) {
     // Simplified logic: Create a daily execution if none exists for today
     const todayStart = new Date()
     todayStart.setHours(0, 0, 0, 0)

     const existing = await prisma.execution.findFirst({
        where: {
           routineId: routine.id,
           createdAt: { gte: todayStart }
        }
     })

     if (!existing) {
        // Calculate due date based on SLA or default to end of day
        const dueAt = new Date()
        dueAt.setHours(23, 59, 59, 999)

        if (routine.slaHours) {
           dueAt.setTime(Date.now() + routine.slaHours * 60 * 60 * 1000)
        }

        await prisma.execution.create({
           data: {
              workspaceId: routine.workspaceId,
              routineId: routine.id,
              assignedToId: routine.assignedToId,
              status: 'pending',
              dueAt,
           }
        })
        createdCount++
     }
  }

  console.log(`[Worker] routine-scheduler generated ${createdCount} executions.`)
  return { createdCount }
}, { connection })


export const overdueWorker = new Worker('overdue-checker', async (job) => {
  console.log(`[Worker] Running overdue checker: ${job.id}`)
  
  const now = new Date()

  // Find all pending executions past their due date
  const result = await prisma.execution.updateMany({
    where: {
      status: 'pending',
      dueAt: { lt: now }
    },
    data: {
      status: 'overdue'
    }
  })

  console.log(`[Worker] overdue-checker marked ${result.count} executions as overdue.`)
  return { updatedCount: result.count }
}, { connection })


// ==========================================
// Init Schedules
// ==========================================
export async function startWorkers() {
   // Schedule the jobs to run repeatedly
   await routineQueue.add('daily-generation', {}, {
      repeat: {
         pattern: '0 0 * * *' // Every day at midnight
      }
   })

   await overdueQueue.add('hourly-check', {}, {
      repeat: {
         pattern: '0 * * * *' // Every hour
      }
   })

   console.log('BullMQ Workers and Schedulers started.')
}
