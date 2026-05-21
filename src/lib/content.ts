import fs from 'fs'
import path from 'path'
import { WorksheetContent } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getWorksheets(): WorksheetContent[] {
  const dir = path.join(CONTENT_DIR, 'worksheets')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      return JSON.parse(raw) as WorksheetContent
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getWorksheetById(id: string): WorksheetContent | null {
  return getWorksheets().find((ws) => ws.id === id) ?? null
}
