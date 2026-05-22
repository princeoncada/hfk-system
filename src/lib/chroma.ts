import { ChromaClient, Collection } from 'chromadb'

export const CHROMA_URL = process.env.CHROMA_URL ?? 'http://localhost:8000'
export const COLLECTION_NAME = 'vault_assets'

let cachedClient: ChromaClient | null = null
let cachedCollection: Collection | null = null

export async function getChromaCollection(): Promise<Collection> {
  if (cachedCollection) return cachedCollection

  try {
    if (!cachedClient) {
      cachedClient = new ChromaClient({ path: CHROMA_URL })
    }

    cachedCollection = await cachedClient.getOrCreateCollection({
      name: COLLECTION_NAME,
      metadata: { 'hnsw:space': 'cosine' },
    })

    return cachedCollection
  } catch {
    cachedClient = null
    cachedCollection = null
    throw new Error(
      'ChromaDB is not running. Start it with: chroma run --path ./chroma-data',
    )
  }
}
