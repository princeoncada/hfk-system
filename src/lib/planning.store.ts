import fs from 'fs'
import path from 'path'
import type { MonthlyPlan } from './planning.types'

const DATA_DIR = path.join(process.cwd(), 'data', 'plans')

export function getPlan(month: string): MonthlyPlan | null {
  const filePath = path.join(DATA_DIR, `${month}.json`)

  if (!fs.existsSync(filePath)) return null

  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as MonthlyPlan
}

export function savePlan(plan: MonthlyPlan): void {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(DATA_DIR, `${plan.month}.json`),
    JSON.stringify(plan, null, 2),
  )
}
