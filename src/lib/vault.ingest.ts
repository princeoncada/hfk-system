import { getChromaCollection } from './chroma'
import type { VaultAsset } from './vault.types'

export async function buildDocumentText(asset: VaultAsset): Promise<string> {
  switch (asset.assetType) {
    case 'template':
      return `${asset.name} template. Subjects: ${asset.subjects.join(', ')}. Grades: ${asset.grades.join(', ')}. ${asset.notes ?? ''}`.trim()
    case 'worksheet':
      return `${asset.title} worksheet for Grade ${asset.grade} ${asset.subject}. ${asset.notes ?? ''}`.trim()
    case 'caption':
      return `${asset.name} caption pattern. Sample: ${asset.sampleText}. Subjects: ${asset.subjects.join(', ')}. Grades: ${asset.grades.join(', ')}. ${asset.notes ?? ''}`.trim()
    case 'prompt':
      return `${asset.name} prompt for ${asset.purpose} targeting ${asset.targetTool}. ${asset.promptText.slice(0, 400)}`.trim()
    case 'topic':
      return `${asset.topicName} topic for Grade ${asset.grade} ${asset.subject}. ${asset.notes ?? ''}`.trim()
    case 'avatar':
      return `${asset.character} avatar. Variant: ${asset.variant ?? 'default'}. ${asset.notes ?? ''}`.trim()
    case 'brand-rule':
      return `${asset.name} brand rule. Category: ${asset.category}. ${asset.rule}. Source: ${asset.source}.`.trim()
  }
}

export async function buildChromaMetadata(
  asset: VaultAsset,
): Promise<Record<string, string | number | boolean>> {
  const metadata: Record<string, string | number | boolean> = {
    id: asset.id,
    assetType: asset.assetType,
    lifecycle: asset.lifecycle,
    freshness: asset.freshness,
    reuseScore: asset.reuseScore,
    uses_30d: asset.uses_30d,
  }

  if (asset.assetType === 'worksheet' || asset.assetType === 'topic') {
    metadata.subject = asset.subject
    metadata.grade = asset.grade
  }

  metadata.raw_json = JSON.stringify(asset)
  return metadata
}

export async function ingestAsset(asset: VaultAsset): Promise<void> {
  const collection = await getChromaCollection()
  const document = await buildDocumentText(asset)
  const metadata = await buildChromaMetadata(asset)

  await collection.upsert({
    ids: [asset.id],
    documents: [document],
    metadatas: [metadata],
  })
}

export async function removeAsset(id: string): Promise<void> {
  const collection = await getChromaCollection()
  await collection.delete({ ids: [id] })
}
