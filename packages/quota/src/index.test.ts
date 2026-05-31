import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { QuotaCheckResult } from './index'

/**
 * Testes de integração para checkQuota.
 * Usa mocks do Prisma para isolar a lógica de negócio.
 */

// Mock do módulo @opsboard/db
vi.mock('@opsboard/db', () => ({
  default: {
    workspace: {
      findUniqueOrThrow: vi.fn(),
    },
    planQuota: {
      findUniqueOrThrow: vi.fn(),
    },
    routine: {
      count: vi.fn(),
    },
    workspaceMember: {
      count: vi.fn(),
    },
  },
}))

import prisma from '@opsboard/db'
import { checkQuota } from './index'

const mockPrisma = prisma as any

describe('checkQuota', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('create_routine', () => {
    it('deve permitir criar rotina quando abaixo do limite', async () => {
      mockPrisma.workspace.findUniqueOrThrow.mockResolvedValue({ plan: 'free' })
      mockPrisma.planQuota.findUniqueOrThrow.mockResolvedValue({ maxRoutines: 10, maxUsers: 3 })
      mockPrisma.routine.count.mockResolvedValue(5)

      const result = await checkQuota('ws-1', 'create_routine')

      expect(result.allowed).toBe(true)
      expect(result.currentUsage).toBe(5)
      expect(result.limit).toBe(10)
    })

    it('deve bloquear criar rotina quando no limite', async () => {
      mockPrisma.workspace.findUniqueOrThrow.mockResolvedValue({ plan: 'free' })
      mockPrisma.planQuota.findUniqueOrThrow.mockResolvedValue({ maxRoutines: 10, maxUsers: 3 })
      mockPrisma.routine.count.mockResolvedValue(10)

      const result = await checkQuota('ws-1', 'create_routine')

      expect(result.allowed).toBe(false)
      expect(result.upgradeTo).toBe('pro')
      expect(result.reason).toContain('10')
    })

    it('deve sempre permitir quando maxRoutines é -1 (ilimitado)', async () => {
      mockPrisma.workspace.findUniqueOrThrow.mockResolvedValue({ plan: 'business' })
      mockPrisma.planQuota.findUniqueOrThrow.mockResolvedValue({ maxRoutines: -1, maxUsers: -1 })

      const result = await checkQuota('ws-1', 'create_routine')

      expect(result.allowed).toBe(true)
      // Não deve ter chamado o count do banco
      expect(mockPrisma.routine.count).not.toHaveBeenCalled()
    })
  })

  describe('invite_user', () => {
    it('deve bloquear convite quando no limite de membros', async () => {
      mockPrisma.workspace.findUniqueOrThrow.mockResolvedValue({ plan: 'free' })
      mockPrisma.planQuota.findUniqueOrThrow.mockResolvedValue({ maxUsers: 3, maxRoutines: 10 })
      mockPrisma.workspaceMember.count.mockResolvedValue(3)

      const result = await checkQuota('ws-1', 'invite_user')

      expect(result.allowed).toBe(false)
      expect(result.upgradeTo).toBe('pro')
    })
  })

  describe('recursos booleanos', () => {
    it('deve bloquear export_data no plano free', async () => {
      mockPrisma.workspace.findUniqueOrThrow.mockResolvedValue({ plan: 'free' })
      mockPrisma.planQuota.findUniqueOrThrow.mockResolvedValue({
        maxRoutines: 10,
        maxUsers: 3,
        canExport: false,
        canAuditTrail: false,
        canApiAccess: false,
        canMultiUnit: false,
      })

      const result = await checkQuota('ws-1', 'export_data')

      expect(result.allowed).toBe(false)
      expect(result.upgradeTo).toBe('pro')
    })

    it('deve permitir audit_trail no plano pro', async () => {
      mockPrisma.workspace.findUniqueOrThrow.mockResolvedValue({ plan: 'pro' })
      mockPrisma.planQuota.findUniqueOrThrow.mockResolvedValue({
        maxRoutines: 50,
        maxUsers: 20,
        canExport: true,
        canAuditTrail: true,
        canApiAccess: false,
        canMultiUnit: false,
      })

      const result = await checkQuota('ws-1', 'audit_trail')

      expect(result.allowed).toBe(true)
    })

    it('deve bloquear api_access nos planos free e pro', async () => {
      mockPrisma.workspace.findUniqueOrThrow.mockResolvedValue({ plan: 'pro' })
      mockPrisma.planQuota.findUniqueOrThrow.mockResolvedValue({
        maxRoutines: 50,
        maxUsers: 20,
        canExport: true,
        canAuditTrail: true,
        canApiAccess: false,
        canMultiUnit: false,
      })

      const result = await checkQuota('ws-1', 'api_access')

      expect(result.allowed).toBe(false)
      expect(result.upgradeTo).toBe('business')
    })
  })
})
