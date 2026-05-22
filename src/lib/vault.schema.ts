import { z } from 'zod'
import type {
  VaultAsset,
  VaultAvatar,
  VaultBrandRule,
  VaultCaption,
  VaultPrompt,
  VaultQueryResult,
  VaultTemplate,
  VaultTopic,
  VaultWorksheet,
} from './vault.types'
import { GradeSchema, SubjectSchema } from './schema'
import { REJECTION_REASONS } from './vault.constants'

export const VaultAssetTypeSchema = z.enum([
  'template',
  'worksheet',
  'caption',
  'prompt',
  'topic',
  'avatar',
  'brand-rule',
])

export const VaultLifecycleSchema = z.enum([
  'draft',
  'approved',
  'archived',
  'retired',
])

export const FreshnessLevelSchema = z.enum([
  'fresh',
  'healthy',
  'stale_ish',
  'stale',
  'retired',
])

export const RejectionReasonSchema = z.enum(REJECTION_REASONS)

export const VaultProvenanceSchema = z.object({
  vaultId: z.string().min(1),
  assetType: VaultAssetTypeSchema,
  confidence: z.number().min(0).max(1),
})

export const VaultRejectionRecordSchema = z.object({
  rejectedAt: z.string(),
  reason: RejectionReasonSchema,
  notes: z.string().optional(),
})

export const VaultAssetBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  assetType: VaultAssetTypeSchema,
  lifecycle: VaultLifecycleSchema,
  freshness: FreshnessLevelSchema,
  reuseScore: z.number().min(0).max(1),
  uses_30d: z.number().int().min(0),
  lastUsed: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  approvedAt: z.string().optional(),
  archivedAt: z.string().optional(),
  retiredAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  rejection: VaultRejectionRecordSchema.optional(),
})

const AllSubjectsSchema = z.tuple([z.literal('all')])
const AllGradesSchema = z.tuple([z.literal('all')])

export const VaultTemplateSchema = VaultAssetBaseSchema.extend({
  assetType: z.literal('template'),
  subjects: z.union([z.array(SubjectSchema), AllSubjectsSchema]),
  grades: z.union([z.array(GradeSchema), AllGradesSchema]),
  fileRef: z.string().min(1),
  performanceAvgReach: z.number().optional(),
})

export const VaultWorksheetSchema = VaultAssetBaseSchema.extend({
  assetType: z.literal('worksheet'),
  title: z.string().min(1),
  subject: SubjectSchema,
  grade: GradeSchema,
  contentId: z.string().min(1),
  provenance: z.array(VaultProvenanceSchema),
  performanceReach: z.number().optional(),
  performanceSaves: z.number().optional(),
  cooldownUntil: z.string().optional(),
})

export const VaultCaptionSchema = VaultAssetBaseSchema.extend({
  assetType: z.literal('caption'),
  pattern: z.string().min(1),
  subjects: z.array(SubjectSchema),
  grades: z.array(GradeSchema),
  sampleText: z.string().min(1),
  performanceAvgReach: z.number().optional(),
  provenance: z.array(VaultProvenanceSchema),
})

export const VaultPromptSchema = VaultAssetBaseSchema.extend({
  assetType: z.literal('prompt'),
  purpose: z.string().min(1),
  targetTool: z.string().min(1),
  promptText: z.string().min(1),
  subjects: z.array(SubjectSchema).optional(),
  grades: z.array(GradeSchema).optional(),
})

export const VaultTopicSchema = VaultAssetBaseSchema.extend({
  assetType: z.literal('topic'),
  topicName: z.string().min(1),
  subject: SubjectSchema,
  grade: GradeSchema,
  uses_90d: z.number().int().min(0),
  duplicateRisk: z.boolean(),
  lastUsed: z.string().optional(),
})

export const VaultAvatarSchema = VaultAssetBaseSchema.extend({
  assetType: z.literal('avatar'),
  character: z.string().min(1),
  variant: z.string().optional(),
  fileRef: z.string().min(1),
})

export const VaultBrandRuleSchema = VaultAssetBaseSchema.extend({
  assetType: z.literal('brand-rule'),
  category: z.string().min(1),
  rule: z.string().min(1),
  source: z.string().min(1),
})

export const VaultAssetSchema = z.discriminatedUnion('assetType', [
  VaultTemplateSchema,
  VaultWorksheetSchema,
  VaultCaptionSchema,
  VaultPromptSchema,
  VaultTopicSchema,
  VaultAvatarSchema,
  VaultBrandRuleSchema,
])

export const VaultQueryResultSchema = z.object({
  asset: VaultAssetSchema,
  score: z.number().min(0).max(1),
  distance: z.number().min(0),
})

export function validateVaultAsset(data: unknown): VaultAsset {
  return VaultAssetSchema.parse(data) as VaultAsset
}

export function isValidVaultAsset(data: unknown): boolean {
  return VaultAssetSchema.safeParse(data).success
}

export function validateVaultTemplate(data: unknown): VaultTemplate {
  return VaultTemplateSchema.parse(data) as VaultTemplate
}

export function validateVaultWorksheet(data: unknown): VaultWorksheet {
  return VaultWorksheetSchema.parse(data) as VaultWorksheet
}

export function validateVaultCaption(data: unknown): VaultCaption {
  return VaultCaptionSchema.parse(data) as VaultCaption
}

export function validateVaultPrompt(data: unknown): VaultPrompt {
  return VaultPromptSchema.parse(data) as VaultPrompt
}

export function validateVaultTopic(data: unknown): VaultTopic {
  return VaultTopicSchema.parse(data) as VaultTopic
}

export function validateVaultAvatar(data: unknown): VaultAvatar {
  return VaultAvatarSchema.parse(data) as VaultAvatar
}

export function validateVaultBrandRule(data: unknown): VaultBrandRule {
  return VaultBrandRuleSchema.parse(data) as VaultBrandRule
}

export function validateVaultQueryResult(data: unknown): VaultQueryResult {
  return VaultQueryResultSchema.parse(data) as VaultQueryResult
}
