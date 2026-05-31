// ============================================================
// Shared types for OpsBoard
// ============================================================

export type PlanTier = 'free' | 'pro' | 'business'
export type WorkspaceRole = 'owner' | 'manager' | 'executor' | 'viewer'
export type ExecutionStatus = 'pending' | 'done' | 'skipped' | 'issue' | 'overdue'
export type RoutineFrequency = 'daily' | 'weekly' | 'monthly' | 'custom'

export interface JwtPayload {
  sub: string          // user id
  workspaceId: string
  role: WorkspaceRole
  plan: PlanTier
  iat?: number
  exp?: number
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}

export interface QuotaExceededError extends ApiError {
  error: 'QUOTA_EXCEEDED'
  upgradeMessage: string
  upgradeTo: 'pro' | 'business'
  currentUsage?: number
  limit?: number
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Dashboard metrics
export interface DashboardMetrics {
  routinesToday: number
  completedToday: number
  pendingToday: number
  overdueToday: number
  completionRate: number  // 0-100
  recentExecutions: RecentExecution[]
  myPendingTasks: PendingTask[]
}

export interface RecentExecution {
  id: string
  routineTitle: string
  executedBy: string
  executedAt: string
  status: ExecutionStatus
}

export interface PendingTask {
  id: string
  routineTitle: string
  dueAt: string
  isOverdue: boolean
  routineId: string
}
