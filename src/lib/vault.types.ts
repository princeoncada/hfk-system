import type { Grade, Subject } from './types'

export type VaultAssetType =
  | 'template'
  | 'worksheet'
  | 'caption'
  | 'prompt'
  | 'topic'
  | 'avatar'
  | 'brand-rule'

export type VaultLifecycle = 'draft' | 'approved' | 'archived' | 'retired'

export type FreshnessLevel =
  | 'fresh'
  | 'healthy'
  | 'stale_ish'
  | 'stale'
  | 'retired'

export type RejectionReason =
  | 'off-brand'
  | 'wrong-grade'
  | 'duplicate'
  | 'stale'
  | 'other'

export interface VaultProvenance {
  vaultId: string
  assetType: VaultAssetType
  confidence: number
}

export interface VaultRejectionRecord {
  rejectedAt: string
  reason: RejectionReason
  notes?: string
}

export interface VaultAssetBase {
  id: string
  name: string
  assetType: VaultAssetType
  lifecycle: VaultLifecycle
  freshness: FreshnessLevel
  reuseScore: number
  uses_30d: number
  lastUsed?: string
  createdAt: string
  updatedAt: string
  approvedAt?: string
  archivedAt?: string
  retiredAt?: string
  tags?: string[]
  notes?: string
  rejection?: VaultRejectionRecord
}

export interface VaultTemplate extends VaultAssetBase {
  assetType: 'template'
  subjects: Subject[] | ['all']
  grades: Grade[] | ['all']
  fileRef: string
  performanceAvgReach?: number
}

export interface VaultWorksheet extends VaultAssetBase {
  assetType: 'worksheet'
  title: string
  subject: Subject
  grade: Grade
  contentId: string
  provenance: VaultProvenance[]
  performanceReach?: number
  performanceSaves?: number
  cooldownUntil?: string
}

export interface VaultCaption extends VaultAssetBase {
  assetType: 'caption'
  pattern: string
  subjects: Subject[]
  grades: Grade[]
  sampleText: string
  performanceAvgReach?: number
  provenance: VaultProvenance[]
}

export interface VaultPrompt extends VaultAssetBase {
  assetType: 'prompt'
  purpose: string
  targetTool: string
  promptText: string
  subjects?: Subject[]
  grades?: Grade[]
}

export interface VaultTopic extends VaultAssetBase {
  assetType: 'topic'
  topicName: string
  subject: Subject
  grade: Grade
  uses_90d: number
  duplicateRisk: boolean
  lastUsed?: string
}

export interface VaultAvatar extends VaultAssetBase {
  assetType: 'avatar'
  character: string
  variant?: string
  fileRef: string
}

export interface VaultBrandRule extends VaultAssetBase {
  assetType: 'brand-rule'
  category: string
  rule: string
  source: string
}

export type VaultAsset =
  | VaultTemplate
  | VaultWorksheet
  | VaultCaption
  | VaultPrompt
  | VaultTopic
  | VaultAvatar
  | VaultBrandRule

export interface VaultQueryResult {
  asset: VaultAsset
  score: number
  distance: number
}
