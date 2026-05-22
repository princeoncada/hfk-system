import type { Grade, Subject } from './types'
import { queryVault } from './vault.query'
import type {
  VaultAsset,
  VaultBrandRule,
  VaultCaption,
  VaultProvenance,
  VaultTopic,
  VaultWorksheet,
} from './vault.types'

export interface RagContext {
  contextBlock: string
  provenance: VaultProvenance[]
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value
}

function toProvenance(asset: VaultAsset, confidence: number): VaultProvenance {
  return {
    vaultId: asset.id,
    assetType: asset.assetType,
    confidence,
  }
}

function isBrandRule(asset: VaultAsset): asset is VaultBrandRule {
  return asset.assetType === 'brand-rule'
}

function isWorksheet(asset: VaultAsset): asset is VaultWorksheet {
  return asset.assetType === 'worksheet'
}

function isTopic(asset: VaultAsset): asset is VaultTopic {
  return asset.assetType === 'topic'
}

function isCaption(asset: VaultAsset): asset is VaultCaption {
  return asset.assetType === 'caption'
}

export async function retrieveWorksheetContext(
  topic: string,
  grade: Grade,
  subject: Subject,
): Promise<RagContext> {
  const brandRules = await queryVault({
    query: 'HFK brand guidelines voice tone style',
    filters: { assetType: 'brand-rule' },
    limit: 4,
  })
  const priorWorksheets = await queryVault({
    query: `${subject} Grade ${grade} worksheet`,
    filters: { assetType: 'worksheet', subject, grade },
    limit: 2,
  })
  const topicOverlap = await queryVault({
    query: topic,
    filters: { assetType: 'topic' },
    limit: 2,
  })

  const brandRuleText = brandRules
    .flatMap((result) =>
      isBrandRule(result.asset) ? [truncate(result.asset.rule, 600)] : [],
    )
    .join('\n\n')

  const priorWorksheetText = priorWorksheets
    .flatMap((result) =>
      isWorksheet(result.asset)
        ? [
            `Title: ${result.asset.title}, Grade: ${result.asset.grade}, Subject: ${result.asset.subject}`,
          ]
        : [],
    )
    .join('\n')

  const topicText = topicOverlap
    .flatMap((result) =>
      isTopic(result.asset)
        ? [
            `Prior topic: ${result.asset.topicName} (used ${result.asset.uses_30d} times in 30d)`,
          ]
        : [],
    )
    .join('\n')

  const contextBlock = [
    '=== HFK BRAND GUIDELINES ===',
    brandRuleText || 'No brand guidelines found.',
    '',
    '=== PRIOR WORKSHEETS (same grade/subject) ===',
    priorWorksheetText || 'No prior worksheets found for this grade/subject.',
    '',
    '=== TOPIC OVERLAP CHECK ===',
    topicText || 'No overlapping topics found.',
  ].join('\n')

  return {
    contextBlock,
    provenance: [...brandRules, ...priorWorksheets, ...topicOverlap].map(
      (result) => toProvenance(result.asset, result.score),
    ),
  }
}

export async function retrieveCaptionContext(
  subject: Subject,
  grade: Grade,
): Promise<RagContext> {
  const brandRules = await queryVault({
    query: 'HFK brand voice tone Facebook caption style',
    filters: { assetType: 'brand-rule' },
    limit: 3,
  })
  const captionPatterns = await queryVault({
    query: `${subject} caption pattern`,
    limit: 3,
  })

  const brandRuleText = brandRules
    .flatMap((result) =>
      isBrandRule(result.asset) ? [truncate(result.asset.rule, 600)] : [],
    )
    .join('\n\n')

  const captionPatternText = captionPatterns
    .flatMap((result) =>
      isCaption(result.asset)
        ? [`Pattern: ${result.asset.name} - Sample: ${result.asset.sampleText}`]
        : [],
    )
    .join('\n')

  const contextBlock = [
    '=== HFK BRAND VOICE ===',
    brandRuleText || 'No brand voice rules found.',
    '',
    '=== CAPTION PATTERNS ===',
    captionPatternText || 'No existing caption patterns found.',
    '',
    `Audience context: Grade ${grade} ${subject}.`,
  ].join('\n')

  return {
    contextBlock,
    provenance: [...brandRules, ...captionPatterns].map((result) =>
      toProvenance(result.asset, result.score),
    ),
  }
}
