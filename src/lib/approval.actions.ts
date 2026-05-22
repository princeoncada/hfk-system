import { ingestAsset } from './vault.ingest'
import {
  validateVaultCaption,
  validateVaultWorksheet,
} from './vault.schema'
import { REUSE_SCORE_DEFAULT } from './vault.constants'
import { getPackage, savePackage } from './approval.store'
import type {
  DailyPackage,
  DirectionPayload,
  GateName,
  GatePayload,
} from './approval.types'
import type {
  CaptionDraftResponse,
  WorksheetDraftResponse,
} from './ai.types'
import type { Grade, Subject } from './types'

function isWorksheetPayload(p: GatePayload): p is WorksheetDraftResponse {
  return p !== null && typeof p === 'object' && 'draft' in p
}

function isCaptionPayload(p: GatePayload): p is CaptionDraftResponse {
  return p !== null && typeof p === 'object' && 'caption' in p
}

function isDirectionPayload(p: GatePayload): p is DirectionPayload {
  return (
    p !== null &&
    typeof p === 'object' &&
    'topic' in p &&
    'grade' in p
  )
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9/-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function directionSubject(payload: GatePayload): Subject {
  return isDirectionPayload(payload) ? payload.subject : 'math'
}

function directionGrade(payload: GatePayload): Grade {
  return isDirectionPayload(payload) ? payload.grade : 1
}

async function writeWorksheetToVault(
  packageId: string,
  directionPayload: GatePayload,
  payload: WorksheetDraftResponse,
  now: string,
): Promise<void> {
  const title = payload.draft.subtitle ?? 'Worksheet Draft'
  const asset = validateVaultWorksheet({
    id: `worksheet/${packageId}-${slugify(payload.draft.subtitle ?? 'draft')}`,
    name: title,
    assetType: 'worksheet',
    lifecycle: 'approved',
    freshness: 'fresh',
    reuseScore: REUSE_SCORE_DEFAULT,
    uses_30d: 0,
    createdAt: now,
    updatedAt: now,
    title,
    subject: directionSubject(directionPayload),
    grade: directionGrade(directionPayload),
    contentId: `worksheet/${packageId}`,
    provenance: payload.provenance,
  })

  await ingestAsset(asset)
}

async function writeCaptionToVault(
  packageId: string,
  directionPayload: GatePayload,
  payload: CaptionDraftResponse,
  now: string,
): Promise<void> {
  const asset = validateVaultCaption({
    id: `caption/${packageId}`,
    name: `Caption ${packageId}`,
    assetType: 'caption',
    lifecycle: 'approved',
    freshness: 'fresh',
    reuseScore: REUSE_SCORE_DEFAULT,
    uses_30d: 0,
    createdAt: now,
    updatedAt: now,
    pattern: 'facebook-caption',
    subjects: [directionSubject(directionPayload)],
    grades: [directionGrade(directionPayload)],
    sampleText: payload.caption,
    provenance: payload.provenance,
  })

  await ingestAsset(asset)
}

export async function approveGate(
  gate: GateName,
  packageId: string,
  payload?: GatePayload,
): Promise<DailyPackage> {
  const pkg = getPackage(packageId)
  const now = new Date().toISOString()
  const resolvedPayload =
    payload !== undefined ? payload : pkg.gates[gate].payload
  const directionPayload = pkg.gates.direction.payload

  if (gate === 'worksheet' && isWorksheetPayload(resolvedPayload)) {
    try {
      await writeWorksheetToVault(packageId, directionPayload, resolvedPayload, now)
    } catch (error) {
      console.warn('Worksheet gate approved but Vault write-back failed.', error)
    }
  }

  if (gate === 'caption' && isCaptionPayload(resolvedPayload)) {
    try {
      await writeCaptionToVault(packageId, directionPayload, resolvedPayload, now)
    } catch (error) {
      console.warn('Caption gate approved but Vault write-back failed.', error)
    }
  }

  pkg.gates[gate] = {
    ...pkg.gates[gate],
    status: 'approved',
    payload: resolvedPayload,
    approvedAt: now,
  }
  pkg.updatedAt = now
  savePackage(pkg)
  return pkg
}

export async function rejectGate(
  gate: GateName,
  packageId: string,
  reason: string,
  notes?: string,
): Promise<DailyPackage> {
  const pkg = getPackage(packageId)
  const now = new Date().toISOString()

  pkg.gates[gate] = {
    ...pkg.gates[gate],
    status: 'rejected',
    rejectionReason: reason,
    rejectionNotes: notes,
    rejectedAt: now,
  }
  pkg.updatedAt = now
  savePackage(pkg)
  return pkg
}

export async function redirectGate(
  gate: GateName,
  packageId: string,
  note: string,
): Promise<DailyPackage> {
  const pkg = getPackage(packageId)
  const now = new Date().toISOString()

  pkg.gates[gate] = {
    ...pkg.gates[gate],
    status: 'redirecting',
    redirectNote: note,
    redirectedAt: now,
  }
  pkg.updatedAt = now
  savePackage(pkg)
  return pkg
}
