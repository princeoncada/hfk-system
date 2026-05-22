import type { Grade, Subject } from './types'
import type {
  CaptionDraftResponse,
  WorksheetDraftResponse,
} from './ai.types'

export type GateName =
  | 'direction'
  | 'worksheet'
  | 'template'
  | 'caption'
  | 'final'

export type GateStatus = 'pending' | 'approved' | 'rejected' | 'redirecting'

export interface DirectionPayload {
  topic: string
  grade: Grade
  subject: Subject
  objective?: string
}

export interface TemplatePayload {
  templateId: string
}

export type GatePayload =
  | DirectionPayload
  | WorksheetDraftResponse
  | TemplatePayload
  | CaptionDraftResponse
  | null

export interface GateState {
  name: GateName
  status: GateStatus
  payload: GatePayload
  redirectNote?: string
  rejectionReason?: string
  rejectionNotes?: string
  approvedAt?: string
  rejectedAt?: string
  redirectedAt?: string
}

export interface DailyPackage {
  id: string
  date: string
  gates: Record<GateName, GateState>
  createdAt: string
  updatedAt: string
}

export interface ApproveGateRequest {
  payload?: GatePayload
}

export interface RejectGateRequest {
  reason: string
  notes?: string
}

export interface RedirectGateRequest {
  note: string
}
