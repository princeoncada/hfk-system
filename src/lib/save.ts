import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { WorksheetContent } from '@/lib/types'
import { validateWorksheet } from '@/lib/schema'

const WORKSHEETS_DIR = path.join(process.cwd(), 'content', 'worksheets')

export function saveWorksheet(data: unknown): string {
  const candidate =
    data && typeof data === 'object' && !Array.isArray(data)
      ? {
          ...data,
          id:
            'id' in data && typeof data.id === 'string' && data.id.length > 0
              ? data.id
              : randomUUID(),
        }
      : data
  const ws = validateWorksheet(candidate) as WorksheetContent

  fs.mkdirSync(WORKSHEETS_DIR, { recursive: true })
  const filePath = path.join(WORKSHEETS_DIR, `${ws.id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(ws, null, 2), 'utf-8')

  return ws.id
}

export function deleteWorksheet(id: string): void {
  const filePath = path.join(WORKSHEETS_DIR, `${id}.json`)
  if (!fs.existsSync(filePath)) {
    throw new Error('Worksheet not found: ' + id)
  }

  fs.unlinkSync(filePath)
}
