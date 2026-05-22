import type { FreshnessLevel, RejectionReason } from './vault.types'

export const FRESHNESS_THRESHOLDS = {
  fresh: 0,
  healthy: 4,
  stale_ish: 8,
  stale: Number.POSITIVE_INFINITY,
  retired: null,
} as const satisfies Record<FreshnessLevel, number | null>

export const REUSE_COOLDOWN_DAYS = 60

export const REUSE_SCORE_DEFAULT = 1.0

export const REJECTION_REASONS = [
  'off-brand',
  'wrong-grade',
  'duplicate',
  'stale',
  'other',
] as const satisfies readonly RejectionReason[]
