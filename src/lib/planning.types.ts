import type { Grade, Subject } from './types'
import type { VaultProvenance } from './vault.types'

export interface PlanDay {
  date: string
  topic: string
  grade: Grade
  subject: Subject
  objective?: string
  confidence: number
  duplicateRisk: boolean
  locked?: boolean
  notes?: string
}

export interface MonthlyPlan {
  id: string
  month: string
  days: PlanDay[]
  generatedAt: string
  provenance: VaultProvenance[]
}

export interface PlanRequest {
  month: string
  subjectRotation?: Subject[]
  gradeRotation?: Grade[]
}

export interface PlanResponse {
  plan: MonthlyPlan
  provenance: VaultProvenance[]
}
