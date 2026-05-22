import { getAssetsByType, queryVault } from './vault.query'
import type { Grade, Subject } from './types'
import type {
  VaultAsset,
  VaultBrandRule,
  VaultPrompt,
  VaultProvenance,
} from './vault.types'
import type {
  AssembledPrompt,
  PromptAssemblyRequest,
} from './prompt.types'

const SUBJECT_DISPLAY: Record<Subject, string> = {
  math: 'Math',
  science: 'Science',
  reading: 'Reading',
  vocabulary: 'Reading/Vocabulary',
  bible: 'Bible/Values',
  values: 'Bible/Values',
}

function isPrompt(asset: VaultAsset): asset is VaultPrompt {
  return asset.assetType === 'prompt'
}

function isBrandRule(asset: VaultAsset): asset is VaultBrandRule {
  return asset.assetType === 'brand-rule'
}

function interpolate(
  text: string,
  topic: string,
  grade: Grade,
  subject: Subject,
  objective?: string,
): string {
  return text
    .replace(/{topic}/gi, topic)
    .replace(/{grade}/gi, String(grade))
    .replace(/{grade_label}/gi, `Grade ${grade}`)
    .replace(/{subject}/gi, SUBJECT_DISPLAY[subject])
    .replace(/{objective}/gi, objective ?? '')
}

function hasPlaceholders(text: string): boolean {
  return /{topic}|{grade}|{grade_label}|{subject}|{objective}/i.test(text)
}

function toProvenance(asset: VaultAsset, confidence: number): VaultProvenance {
  return {
    vaultId: asset.id,
    assetType: asset.assetType,
    confidence,
  }
}

export async function listPrompts(): Promise<VaultPrompt[]> {
  const assets = await getAssetsByType('prompt')
  return assets.filter((asset): asset is VaultPrompt => isPrompt(asset))
}

export async function assemblePrompt(
  request: PromptAssemblyRequest,
): Promise<AssembledPrompt> {
  const { topic, grade, subject, targetTool, objective } = request
  const tool = targetTool ?? 'external'

  const promptResults = await queryVault({
    query: `${topic} ${SUBJECT_DISPLAY[subject]} grade ${grade} ${tool}`,
    filters: { assetType: 'prompt' },
    limit: 3,
  })
  const brandResults = await queryVault({
    query: 'HFK brand voice tone style guidelines',
    filters: { assetType: 'brand-rule' },
    limit: 3,
  })
  const sourcePrompt = promptResults.flatMap((result) =>
    isPrompt(result.asset) ? [result.asset] : [],
  )[0]

  if (!sourcePrompt) {
    throw new Error('No prompt found in Vault for the given context.')
  }

  const brandVoiceBlock =
    brandResults
      .flatMap((result) =>
        isBrandRule(result.asset) ? [result.asset.rule] : [],
      )
      .join('\n\n') || 'No brand guidelines found.'

  const base = interpolate(
    sourcePrompt.promptText,
    topic,
    grade,
    subject,
    objective,
  )
  const contextAppend = [
    '',
    '---',
    'CONTENT CONTEXT:',
    `Topic: ${topic}`,
    `Grade: Grade ${grade}`,
    `Subject: ${SUBJECT_DISPLAY[subject]}`,
    ...(objective ? [`Objective: ${objective}`] : []),
  ].join('\n')
  const withContext = hasPlaceholders(sourcePrompt.promptText)
    ? base
    : base + contextAppend

  const promptText = [
    withContext,
    '',
    '---',
    'BRAND VOICE GUIDELINES:',
    brandVoiceBlock,
  ].join('\n')

  const provenance = [...promptResults, ...brandResults].map((result) =>
    toProvenance(result.asset, result.score),
  )

  return { promptText, sourcePrompt, provenance }
}
