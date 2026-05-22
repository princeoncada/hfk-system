import type { Grade, Subject } from './types'
import { getChromaCollection } from './chroma'
import type {
  VaultAsset,
  VaultAssetType,
  VaultLifecycle,
  VaultQueryResult,
} from './vault.types'
import { validateVaultAsset } from './vault.schema'

type WhereClause =
  | Record<string, { $eq: string | number }>
  | { $and: Record<string, { $eq: string | number }>[] }

export interface QueryFilters {
  assetType?: VaultAssetType
  lifecycle?: VaultLifecycle
  subject?: Subject
  grade?: Grade
}

export interface QueryOptions {
  query: string
  filters?: QueryFilters
  limit?: number
}

function buildWhere(filters?: QueryFilters): WhereClause | undefined {
  if (!filters) return undefined

  const clauses = Object.entries(filters)
    .filter((entry): entry is [string, string | number] => entry[1] !== undefined)
    .map(([field, value]) => ({ [field]: { $eq: value } }))

  if (clauses.length === 0) return undefined
  if (clauses.length === 1) return clauses[0]
  return { $and: clauses }
}

function parseMetadataAsset(metadata: unknown): VaultAsset | null {
  if (!metadata || typeof metadata !== 'object') return null

  const rawJson = (metadata as { raw_json?: unknown }).raw_json
  if (typeof rawJson !== 'string') return null

  try {
    return validateVaultAsset(JSON.parse(rawJson))
  } catch (error) {
    console.warn('Skipping invalid Vault asset returned from ChromaDB', error)
    return null
  }
}

export async function queryVault(
  options: QueryOptions,
): Promise<VaultQueryResult[]> {
  const collection = await getChromaCollection()
  const nResults = Math.min(Math.max(options.limit ?? 5, 1), 20)
  const where = buildWhere(options.filters)

  const response = await collection.query({
    queryTexts: [options.query],
    nResults,
    ...(where ? { where } : {}),
  })

  const metadatas = response.metadatas?.[0] ?? []
  const distances = response.distances?.[0] ?? []

  return metadatas
    .map((metadata, index): VaultQueryResult | null => {
      const asset = parseMetadataAsset(metadata)
      if (!asset) return null

      const distance = Number(distances[index] ?? 0)
      const score = Math.max(0, 1 - distance / 2)
      return { asset, score, distance }
    })
    .filter((result): result is VaultQueryResult => result !== null)
    .sort((a, b) => b.score - a.score)
}

export async function getAssetById(id: string): Promise<VaultAsset | null> {
  const collection = await getChromaCollection()
  const response = await collection.get({ ids: [id] })
  const metadata = response.metadatas?.[0]
  return parseMetadataAsset(metadata)
}

export async function getAssetsByType(
  assetType: VaultAssetType,
): Promise<VaultAsset[]> {
  const collection = await getChromaCollection()
  const response = await collection.get({
    where: { assetType: { $eq: assetType } },
  })

  const metadatas = response.metadatas ?? []
  return metadatas
    .map((metadata) => parseMetadataAsset(metadata))
    .filter((asset): asset is VaultAsset => asset !== null)
}
