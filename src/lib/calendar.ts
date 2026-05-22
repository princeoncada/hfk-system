import fs from 'fs'
import path from 'path'
import type { DailyPackage } from './approval.types'

const PACKAGES_DIR = path.join(process.cwd(), 'data', 'packages')

export function getPackagesForMonth(month: string): Record<string, DailyPackage> {
  const result: Record<string, DailyPackage> = {}
  if (!fs.existsSync(PACKAGES_DIR)) return result

  const files = fs.readdirSync(PACKAGES_DIR)
  for (const file of files) {
    if (file.startsWith(month) && file.endsWith('.json')) {
      const date = file.replace('.json', '')
      try {
        const raw = fs.readFileSync(path.join(PACKAGES_DIR, file), 'utf-8')
        result[date] = JSON.parse(raw) as DailyPackage
      } catch {
        // skip malformed files silently
      }
    }
  }
  return result
}
