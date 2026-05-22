import fs from 'fs'
import path from 'path'
import { getWorksheets } from './content'
import { REUSE_SCORE_DEFAULT } from './vault.constants'
import { ingestAsset } from './vault.ingest'
import {
  validateVaultAvatar,
  validateVaultBrandRule,
  validateVaultPrompt,
  validateVaultTemplate,
  validateVaultWorksheet,
} from './vault.schema'
import type {
  VaultAvatar,
  VaultBrandRule,
  VaultPrompt,
  VaultTemplate,
  VaultWorksheet,
} from './vault.types'

interface SeedResult {
  seeded: number
  errors: string[]
}

export interface SeedSummary {
  worksheets: SeedResult
  templates: SeedResult
  avatars: SeedResult
  vault: SeedResult
  total: number
}

const ROOT_DIR = process.cwd()
const TEMPLATE_DIR = path.join(ROOT_DIR, 'src', 'components', 'templates')
const AVATAR_DIR = path.join(ROOT_DIR, 'assets', 'avatars')
const VAULT_DIR = path.join(ROOT_DIR, 'vault')

function todayIso(): string {
  return new Date().toISOString()
}

function withoutExtension(filename: string): string {
  return path.basename(filename, path.extname(filename))
}

function slugify(value: string): string {
  return value
    .replace(/\\/g, '/')
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function listFilesRecursive(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFilesRecursive(fullPath)
    if (entry.isFile()) return [fullPath]
    return []
  })
}

function relativePathFromRoot(fullPath: string): string {
  return path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/')
}

async function ingestValidatedAsset(
  asset: VaultWorksheet | VaultTemplate | VaultAvatar | VaultBrandRule | VaultPrompt,
): Promise<void> {
  await ingestAsset(asset)
}

export async function seedWorksheets(): Promise<SeedResult> {
  const errors: string[] = []
  let seeded = 0

  for (const worksheet of getWorksheets()) {
    try {
      const asset = validateVaultWorksheet({
        id: worksheet.id,
        name: worksheet.title,
        assetType: 'worksheet',
        lifecycle: 'approved',
        freshness: 'fresh',
        reuseScore: REUSE_SCORE_DEFAULT,
        uses_30d: 0,
        createdAt: worksheet.createdAt,
        updatedAt: worksheet.createdAt,
        contentId: worksheet.id,
        title: worksheet.title,
        subject: worksheet.subject,
        grade: worksheet.grade,
        provenance: [],
      })

      await ingestValidatedAsset(asset)
      seeded += 1
    } catch (error) {
      errors.push(`Worksheet ${worksheet.id}: ${String(error)}`)
    }
  }

  return { seeded, errors }
}

export async function seedTemplates(): Promise<SeedResult> {
  const errors: string[] = []
  let seeded = 0
  const now = todayIso()
  const files = listFilesRecursive(TEMPLATE_DIR).filter((file) =>
    file.endsWith('.tsx'),
  )

  for (const file of files) {
    const filename = path.basename(file)
    const name = withoutExtension(filename)

    try {
      const asset = validateVaultTemplate({
        id: `template/${name.toLowerCase()}`,
        name,
        assetType: 'template',
        lifecycle: 'approved',
        freshness: 'fresh',
        reuseScore: REUSE_SCORE_DEFAULT,
        uses_30d: 0,
        createdAt: now,
        updatedAt: now,
        subjects: ['all'],
        grades: ['all'],
        fileRef: relativePathFromRoot(file),
      })

      await ingestValidatedAsset(asset)
      seeded += 1
    } catch (error) {
      errors.push(`Template ${filename}: ${String(error)}`)
    }
  }

  return { seeded, errors }
}

export async function seedAvatars(): Promise<SeedResult> {
  const errors: string[] = []
  let seeded = 0
  const now = todayIso()
  const imageExtensions = new Set(['.png', '.jpg', '.svg', '.webp'])
  const files = listFilesRecursive(AVATAR_DIR).filter((file) =>
    imageExtensions.has(path.extname(file).toLowerCase()),
  )

  for (const file of files) {
    const filename = path.basename(file)
    const name = withoutExtension(filename)

    try {
      const asset = validateVaultAvatar({
        id: `avatar/${name.toLowerCase()}`,
        name,
        assetType: 'avatar',
        lifecycle: 'approved',
        freshness: 'fresh',
        reuseScore: REUSE_SCORE_DEFAULT,
        uses_30d: 0,
        createdAt: now,
        updatedAt: now,
        character: name,
        fileRef: relativePathFromRoot(file),
      })

      await ingestValidatedAsset(asset)
      seeded += 1
    } catch (error) {
      errors.push(`Avatar ${filename}: ${String(error)}`)
    }
  }

  return { seeded, errors }
}

function parseJsonFile(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

function buildBrandRuleFromFile(
  file: string,
  data: Record<string, unknown>,
  now: string,
): VaultBrandRule {
  const relativePath = relativePathFromRoot(file)
  const name = withoutExtension(path.basename(file))

  return validateVaultBrandRule({
    id: `brand-rule/${slugify(relativePath)}`,
    name,
    assetType: 'brand-rule',
    lifecycle: 'approved',
    freshness: 'fresh',
    reuseScore: REUSE_SCORE_DEFAULT,
    uses_30d: 0,
    createdAt: now,
    updatedAt: now,
    category: typeof data.category === 'string' ? data.category : 'general',
    rule: typeof data.rule === 'string' ? data.rule : JSON.stringify(data),
    source: relativePath,
  })
}

function buildPromptFromFile(
  file: string,
  data: Record<string, unknown>,
  now: string,
): VaultPrompt {
  const relativePath = relativePathFromRoot(file)
  const name = withoutExtension(path.basename(file))

  return validateVaultPrompt({
    id: `prompt/${slugify(relativePath)}`,
    name,
    assetType: 'prompt',
    lifecycle: 'approved',
    freshness: 'fresh',
    reuseScore: REUSE_SCORE_DEFAULT,
    uses_30d: 0,
    createdAt: now,
    updatedAt: now,
    purpose: typeof data.purpose === 'string' ? data.purpose : name,
    targetTool:
      typeof data.targetTool === 'string' ? data.targetTool : 'external',
    promptText:
      typeof data.promptText === 'string'
        ? data.promptText
        : JSON.stringify(data),
  })
}

function buildBrandRuleFromMarkdown(file: string, now: string): VaultBrandRule {
  const relativePath = relativePathFromRoot(file)
  const name = withoutExtension(path.basename(file))

  return validateVaultBrandRule({
    id: `brand-rule/${slugify(relativePath)}`,
    name,
    assetType: 'brand-rule',
    lifecycle: 'approved',
    freshness: 'fresh',
    reuseScore: REUSE_SCORE_DEFAULT,
    uses_30d: 0,
    createdAt: now,
    updatedAt: now,
    category: 'reference',
    rule: fs.readFileSync(file, 'utf-8').trim() || '(no content)',
    source: relativePath,
  })
}

function buildPromptFromMarkdown(file: string, now: string): VaultPrompt {
  const relativePath = relativePathFromRoot(file)
  const name = withoutExtension(path.basename(file))
  const contents = fs.readFileSync(file, 'utf-8').trim()

  return validateVaultPrompt({
    id: `prompt/${slugify(relativePath)}`,
    name,
    assetType: 'prompt',
    lifecycle: 'approved',
    freshness: 'fresh',
    reuseScore: REUSE_SCORE_DEFAULT,
    uses_30d: 0,
    createdAt: now,
    updatedAt: now,
    purpose: name.toLowerCase().replace(/[_-]+/g, ' '),
    targetTool: 'external',
    promptText: contents,
  })
}

export async function seedVault(): Promise<SeedResult> {
  const errors: string[] = []
  let seeded = 0
  const now = todayIso()
  const files = listFilesRecursive(VAULT_DIR)

  for (const file of files) {
    const extension = path.extname(file).toLowerCase()

    try {
      if (extension === '.json') {
        const data = parseJsonFile(file)
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          const message = `Vault ${relativePathFromRoot(file)}: skipped non-object JSON`
          console.warn(message)
          errors.push(message)
          continue
        }

        if ('rule' in data || 'category' in data) {
          await ingestValidatedAsset(
            buildBrandRuleFromFile(file, data as Record<string, unknown>, now),
          )
          seeded += 1
          continue
        }

        if ('promptText' in data || 'purpose' in data) {
          await ingestValidatedAsset(
            buildPromptFromFile(file, data as Record<string, unknown>, now),
          )
          seeded += 1
          continue
        }

        const message = `Vault ${relativePathFromRoot(file)}: skipped unsupported JSON`
        console.warn(message)
        errors.push(message)
        continue
      }

      if (extension === '.md') {
        const relativePath = relativePathFromRoot(file)
        const isPromptFile = relativePath.startsWith('vault/prompts/')
        const contents = fs.readFileSync(file, 'utf-8').trim()

        if (contents.length === 0) {
          console.warn(`Vault ${relativePath}: skipped empty file`)
          continue
        }

        if (isPromptFile) {
          await ingestValidatedAsset(buildPromptFromMarkdown(file, now))
        } else {
          await ingestValidatedAsset(buildBrandRuleFromMarkdown(file, now))
        }
        seeded += 1
      }
    } catch (error) {
      errors.push(`Vault ${relativePathFromRoot(file)}: ${String(error)}`)
    }
  }

  return { seeded, errors }
}

export async function seedAll(): Promise<SeedSummary> {
  const worksheets = await seedWorksheets()
  const templates = await seedTemplates()
  const avatars = await seedAvatars()
  const vault = await seedVault()

  return {
    worksheets,
    templates,
    avatars,
    vault,
    total:
      worksheets.seeded + templates.seeded + avatars.seeded + vault.seeded,
  }
}
