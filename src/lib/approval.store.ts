import fs from 'fs'
import path from 'path'
import type { DailyPackage, GateName, GateState } from './approval.types'

const DATA_DIR = path.join(process.cwd(), 'data', 'packages')
const GATE_NAMES: GateName[] = [
  'direction',
  'worksheet',
  'template',
  'caption',
  'final',
]

function todayId(): string {
  return new Date().toISOString().slice(0, 10)
}

function createGate(name: GateName): GateState {
  return {
    name,
    status: 'pending',
    payload: null,
  }
}

function createPackage(id: string): DailyPackage {
  const now = new Date().toISOString()
  const pkg: DailyPackage = {
    id,
    date: id,
    gates: GATE_NAMES.reduce(
      (gates, gateName) => ({
        ...gates,
        [gateName]: createGate(gateName),
      }),
      {} as Record<GateName, GateState>,
    ),
    createdAt: now,
    updatedAt: now,
  }

  savePackage(pkg)
  return pkg
}

export function getPackage(id = todayId()): DailyPackage {
  const filePath = path.join(DATA_DIR, `${id}.json`)

  if (!fs.existsSync(filePath)) {
    return createPackage(id)
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as DailyPackage
}

export function savePackage(pkg: DailyPackage): void {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(
    path.join(DATA_DIR, `${pkg.id}.json`),
    JSON.stringify(pkg, null, 2),
  )
}
