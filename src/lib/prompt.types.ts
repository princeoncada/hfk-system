import type { Grade, Subject } from './types'
import type { VaultPrompt, VaultProvenance } from './vault.types'

export interface PromptAssemblyRequest {
  topic: string
  grade: Grade
  subject: Subject
  targetTool?: string
  objective?: string
}

export interface AssembledPrompt {
  promptText: string
  sourcePrompt: VaultPrompt
  provenance: VaultProvenance[]
}
