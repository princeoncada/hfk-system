import { queryVault } from './vault.query'
import type { RagContext } from './vault.rag'
import type {
  VaultAsset,
  VaultBrandRule,
  VaultProvenance,
  VaultTopic,
  VaultWorksheet,
} from './vault.types'

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value
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

function toProvenance(asset: VaultAsset, confidence: number): VaultProvenance {
  return {
    vaultId: asset.id,
    assetType: asset.assetType,
    confidence,
  }
}

export async function retrievePlanningContext(
  month: string,
): Promise<RagContext> {
  const brandRules = await queryVault({
    query: 'HFK brand guidelines voice tone style',
    filters: { assetType: 'brand-rule' },
    limit: 4,
  })
  const recentWorksheets = await queryVault({
    query: 'worksheet topic grade subject',
    filters: { assetType: 'worksheet' },
    limit: 12,
  })
  const duplicateTopics = await queryVault({
    query: 'topic duplicate risk recently covered',
    filters: { assetType: 'topic' },
    limit: 8,
  })

  const brandRuleText = brandRules
    .flatMap((result) =>
      isBrandRule(result.asset) ? [truncate(result.asset.rule, 600)] : [],
    )
    .join('\n\n')

  const recentWorksheetText = recentWorksheets
    .flatMap((result) =>
      isWorksheet(result.asset)
        ? [`${result.asset.title} - Grade ${result.asset.grade} ${result.asset.subject}`]
        : [],
    )
    .join('\n')

  const duplicateTopicText = duplicateTopics
    .flatMap((result) =>
      isTopic(result.asset)
        ? [`${result.asset.topicName} - Grade ${result.asset.grade} ${result.asset.subject}`]
        : [],
    )
    .join('\n')

  return {
    contextBlock: [
      `Planning context for ${month}`,
      '',
      '=== HFK BRAND GUIDELINES ===',
      brandRuleText || 'No brand guidelines found.',
      '',
      '=== RECENTLY COVERED TOPICS (avoid duplicates) ===',
      recentWorksheetText || 'No recent worksheets found.',
      '',
      '=== HIGH DUPLICATE RISK TOPICS ===',
      duplicateTopicText || 'No flagged topics.',
    ].join('\n'),
    provenance: [...brandRules, ...recentWorksheets, ...duplicateTopics].map(
      (result) => toProvenance(result.asset, result.score),
    ),
  }
}
