import prisma from '@opsboard/db'
import type { PlanTier } from '@opsboard/db'

export type QuotaFeature =
  | 'create_routine'
  | 'invite_user'
  | 'view_full_history'
  | 'export_data'
  | 'api_access'
  | 'multi_unit'
  | 'audit_trail'

export interface QuotaCheckResult {
  allowed: boolean
  reason?: string
  upgradeMessage?: string
  upgradeTo?: 'pro' | 'business'
  currentUsage?: number
  limit?: number
}

export async function checkQuota(
  workspaceId: string,
  feature: QuotaFeature
): Promise<QuotaCheckResult> {
  const workspace = await prisma.workspace.findUniqueOrThrow({
    where: { id: workspaceId },
    select: { plan: true },
  })

  const quota = await prisma.planQuota.findUniqueOrThrow({
    where: { plan: workspace.plan },
  })

  const plan = workspace.plan

  switch (feature) {
    case 'create_routine': {
      if (quota.maxRoutines === -1) return { allowed: true }
      const count = await prisma.routine.count({
        where: { workspaceId, isActive: true },
      })
      if (count >= quota.maxRoutines) {
        return {
          allowed: false,
          currentUsage: count,
          limit: quota.maxRoutines,
          reason: `Limite de ${quota.maxRoutines} rotinas ativas atingido no plano ${plan}.`,
          upgradeMessage:
            plan === 'free'
              ? 'Faça upgrade para o Pro e crie até 50 rotinas ativas.'
              : 'Entre em contato para o plano Business com rotinas ilimitadas.',
          upgradeTo: plan === 'free' ? 'pro' : 'business',
        }
      }
      return { allowed: true, currentUsage: count, limit: quota.maxRoutines }
    }

    case 'invite_user': {
      if (quota.maxUsers === -1) return { allowed: true }
      const count = await prisma.workspaceMember.count({ where: { workspaceId } })
      if (count >= quota.maxUsers) {
        return {
          allowed: false,
          currentUsage: count,
          limit: quota.maxUsers,
          reason: `Limite de ${quota.maxUsers} membros atingido no plano ${plan}.`,
          upgradeMessage:
            plan === 'free'
              ? 'O plano Pro suporta até 20 membros por workspace.'
              : 'Plano Business oferece membros ilimitados.',
          upgradeTo: plan === 'free' ? 'pro' : 'business',
        }
      }
      return { allowed: true, currentUsage: count, limit: quota.maxUsers }
    }

    case 'view_full_history': {
      if (quota.maxExecutionsHistoryDays === -1) return { allowed: true }
      return {
        allowed: false,
        reason: `Histórico limitado a ${quota.maxExecutionsHistoryDays} dias no plano ${plan}.`,
        upgradeMessage: 'O plano Pro oferece histórico completo e ilimitado.',
        upgradeTo: 'pro',
      }
    }

    case 'export_data':
      if (!quota.canExport) {
        return {
          allowed: false,
          reason: 'Exportação de dados não disponível no plano Free.',
          upgradeMessage: 'Faça upgrade para o Pro e exporte seu histórico em CSV/XLSX.',
          upgradeTo: 'pro',
        }
      }
      return { allowed: true }

    case 'audit_trail':
      if (!quota.canAuditTrail) {
        return {
          allowed: false,
          reason: 'Trilha de atividades completa disponível apenas nos planos Pro e Business.',
          upgradeMessage: 'Faça upgrade para o Pro para acessar o histórico completo de ações.',
          upgradeTo: 'pro',
        }
      }
      return { allowed: true }

    case 'api_access':
      if (!quota.canApiAccess) {
        return {
          allowed: false,
          reason: 'Acesso à API disponível apenas no plano Business.',
          upgradeMessage: 'Entre em contato para integrar o OpsBoard via API.',
          upgradeTo: 'business',
        }
      }
      return { allowed: true }

    case 'multi_unit':
      if (!quota.canMultiUnit) {
        return {
          allowed: false,
          reason: 'Múltiplas unidades disponíveis apenas no plano Business.',
          upgradeMessage: 'Gerencie filiais e unidades com o plano Business.',
          upgradeTo: 'business',
        }
      }
      return { allowed: true }

    default:
      return { allowed: true }
  }
}

export function getUpgradeUrl(plan: 'pro' | 'business'): string {
  const urls: Record<string, string> = {
    pro: process.env.NEXT_PUBLIC_STRIPE_PRO_URL ?? '/pricing',
    business: '/contato',
  }
  return urls[plan]
}
