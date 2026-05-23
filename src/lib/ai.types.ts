import type {
  Activity,
  Grade,
  Subject,
  VocabularyEntry,
} from './types'
import type { VaultProvenance } from './vault.types'

export interface WorksheetDraftRequest {
  topic: string
  grade: Grade
  subject: Subject
  template: string
  objective?: string
  instruction?: string
}

export interface WorksheetDraft {
  subtitle?: string
  vocabulary: VocabularyEntry[]
  activities: Activity[]
  parentNotes?: string
}

export interface WorksheetDraftResponse {
  draft: WorksheetDraft
  provenance: VaultProvenance[]
}

export interface CaptionDraftRequest {
  worksheetTitle: string
  grade: Grade
  subject: Subject
  topic: string
  instruction?: string
}

export interface CaptionDraftResponse {
  caption: string
  hashtags: string[]
  provenance: VaultProvenance[]
}

export interface DailySummaryRequest {
  date: string
  pendingApprovals: number
  recentWorksheets: string[]
}

export interface DailySummaryResponse {
  headline: string
  summary: string
}
