import { ChromaClient, type Collection } from 'chromadb'
import { CHROMA_URL } from './chroma'
import { getTemplateById, saveTemplate } from './template.store'
import type { TemplateDefinition } from './template.types'

const TEMPLATE_COLLECTION = 'template_definitions'

async function getTemplateCollection(): Promise<Collection> {
  const client = new ChromaClient({ path: CHROMA_URL })
  return client.getOrCreateCollection({
    name: TEMPLATE_COLLECTION,
    metadata: { 'hnsw:space': 'cosine' },
  })
}

function buildTemplateDocument(def: TemplateDefinition): string {
  const subjects = def.subjectAffinity?.join(', ') ?? 'all subjects'
  const grades = def.gradeAffinity?.join(', ') ?? 'all grades'
  return `${def.name} template. ${def.description}. Best for: ${subjects}. Grade levels: ${grades}.`
}

export async function ingestTemplateDefinition(
  def: TemplateDefinition,
): Promise<void> {
  try {
    const collection = await getTemplateCollection()
    await collection.upsert({
      ids: [def.id],
      documents: [buildTemplateDocument(def)],
      metadatas: [
        {
          id: def.id,
          name: def.name,
          reuseScore: def.reuseScore ?? 0,
          subjectAffinity: def.subjectAffinity?.join(',') ?? '',
          gradeAffinity: def.gradeAffinity?.join(',') ?? '',
        },
      ],
    })
  } catch {
    // ChromaDB is optional for runtime operation.
  }
}

export async function queryBestTemplate(
  grade: string,
  subject: string,
  topic: string,
): Promise<string | null> {
  try {
    const collection = await getTemplateCollection()
    const count = await collection.count()
    if (count === 0) return null

    const results = await collection.query({
      queryTexts: [`Grade ${grade} ${subject} worksheet template for ${topic}`],
      nResults: 1,
    })

    return results.ids?.[0]?.[0] ?? null
  } catch {
    return null
  }
}

export async function incrementTemplateReuseScore(id: string): Promise<void> {
  const def = getTemplateById(id)
  if (!def) return

  const updated: TemplateDefinition = {
    ...def,
    reuseScore: (def.reuseScore ?? 0) + 1,
  }

  saveTemplate(updated)

  try {
    await ingestTemplateDefinition(updated)
  } catch {
    // ChromaDB is optional for runtime operation.
  }
}
