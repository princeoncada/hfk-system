import fs from 'fs'
import path from 'path'
import type { TemplateDefinition } from './template.types'
import { validateTemplateDefinition } from './template.types'

const VAULT_TEMPLATES_DIR = path.join(process.cwd(), 'vault', 'templates')

export function listTemplates(): TemplateDefinition[] {
  if (!fs.existsSync(VAULT_TEMPLATES_DIR)) return []
  return fs
    .readdirSync(VAULT_TEMPLATES_DIR)
    .filter((f) => f.endsWith('.json'))
    .flatMap((file) => {
      try {
        const raw = fs.readFileSync(path.join(VAULT_TEMPLATES_DIR, file), 'utf-8')
        return [validateTemplateDefinition(JSON.parse(raw))]
      } catch {
        return []
      }
    })
}

export function getTemplateById(id: string): TemplateDefinition | null {
  const filePath = path.join(VAULT_TEMPLATES_DIR, `${id}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    return validateTemplateDefinition(JSON.parse(fs.readFileSync(filePath, 'utf-8')))
  } catch {
    return null
  }
}

export function saveTemplate(definition: TemplateDefinition): void {
  fs.mkdirSync(VAULT_TEMPLATES_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(VAULT_TEMPLATES_DIR, `${definition.id}.json`),
    JSON.stringify(definition, null, 2),
  )
}
