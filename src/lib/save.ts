import fs from 'fs'
import path from 'path'
import type { WorksheetContent } from '@/lib/types'
import { validateWorksheet } from '@/lib/schema'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'worksheets')

export function saveWorksheet(data: unknown): string {
  const ws = validateWorksheet(data) as WorksheetContent

  fs.mkdirSync(CONTENT_DIR, { recursive: true })
  const filePath = path.join(CONTENT_DIR, `${ws.id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(ws, null, 2), 'utf-8')

  return ws.id
}
