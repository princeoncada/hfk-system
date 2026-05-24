'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type {
  DailyPackage,
  DirectionPayload,
  GateName,
  GatePayload,
  GateStatus,
  TemplatePayload,
} from '@/lib/approval.types'
import type {
  CaptionDraftResponse,
  WorksheetDraft,
  WorksheetDraftResponse,
} from '@/lib/ai.types'
import type { PlanDay } from '@/lib/planning.types'
import type { Grade, Subject } from '@/lib/types'
import RedirectModal from './RedirectModal'

const GATE_ORDER: GateName[] = [
  'direction',
  'worksheet',
  'template',
  'caption',
  'final',
]

const GATE_LABELS: Record<GateName, string> = {
  direction: 'Direction',
  worksheet: 'Worksheet',
  template: 'Template',
  caption: 'Caption',
  final: 'Final Package',
}

const GATE_DESCRIPTIONS: Record<GateName, string> = {
  direction: 'Approve the topic, grade, and subject for today.',
  worksheet: 'Review the AI-drafted worksheet content.',
  template: 'Select and approve the layout template.',
  caption: 'Review the AI-drafted Facebook caption.',
  final: 'Approve the complete package for publishing.',
}

const STATUS_BADGE: Record<GateStatus, string> = {
  pending: 'bg-paper text-ink-2 border-[rgba(92,64,51,0.14)]',
  approved: 'bg-sage-tint text-sage-deep border-sage/20',
  rejected: 'bg-rose-tint text-[#8C3D31] border-rose/30',
  redirecting: 'bg-yellow-tint text-[#7A5A11] border-yellow/40',
}

const SUBJECTS: Subject[] = [
  'math',
  'science',
  'reading',
  'vocabulary',
  'bible',
  'values',
]

const GRADES: Grade[] = [1, 2, 3, 4, 5, 6]

const SUBJECT_LABELS: Record<Subject, string> = {
  math: 'Math',
  science: 'Science',
  reading: 'Reading',
  vocabulary: 'Reading/Vocab',
  bible: 'Bible',
  values: 'Values',
}

const TEMPLATES = [
  {
    id: 'cozy_v1',
    label: 'Cozy v1',
    description: 'Clean serif layout. Vocabulary, activities, parent notes.',
  },
]

const inputClass =
  'border border-[rgba(92,64,51,0.14)] rounded-[10px] px-3 py-2 text-[14px] text-ink bg-paper focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage/50 w-full'
const selectClass = `${inputClass} appearance-none`
const primaryButtonClass =
  'bg-ink text-cream rounded-[10px] px-4 py-2.5 text-sm font-medium font-sans hover:bg-[#1a120e] transition-colors disabled:opacity-40'
const textButtonClass =
  'bg-transparent text-ink-3 px-2.5 py-2 text-sm font-sans hover:text-ink transition-colors'

function isDirection(p: GatePayload): p is DirectionPayload {
  return p !== null && typeof p === 'object' && 'topic' in p && 'grade' in p
}

function isWorksheet(p: GatePayload): p is WorksheetDraftResponse {
  return p !== null && typeof p === 'object' && 'draft' in p
}

function isTemplate(p: GatePayload): p is TemplatePayload {
  return p !== null && typeof p === 'object' && 'templateId' in p
}

function isCaption(p: GatePayload): p is CaptionDraftResponse {
  return p !== null && typeof p === 'object' && 'caption' in p
}

interface ReviewFlowProps {
  pkg: DailyPackage
  planDay?: PlanDay | null
}

function StatusLabel({ status }: { status: GateStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-sans border ${STATUS_BADGE[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status === 'redirecting' ? 'needs attention' : status}
    </span>
  )
}

function StepCircle({ status }: { status: GateStatus }) {
  if (status === 'approved') {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-sm font-semibold text-white">
        &#10003;
      </span>
    )
  }

  if (status === 'redirecting' || status === 'rejected') {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow text-sm font-semibold text-ink">
        !
      </span>
    )
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[rgba(92,64,51,0.2)] bg-paper text-sm font-semibold text-ink-4" />
  )
}

function ProvenancePanel({
  provenance,
}: {
  provenance: Array<{ vaultId: string; assetType: string; confidence: number }>
}) {
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-[12px] text-ink-3 hover:text-ink-2">
        Grounded by {provenance.length} Vault asset
        {provenance.length !== 1 ? 's' : ''}
      </summary>
      <ul className="mt-2 space-y-1">
        {provenance.map((item) => (
          <li
            key={item.vaultId}
            className="flex justify-between gap-4 text-[12px] text-ink-3"
          >
            <span>{item.vaultId}</span>
            <span className="text-ink-4">
              {item.assetType} &middot; {(item.confidence * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default function ReviewFlow({ pkg, planDay }: ReviewFlowProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<GateName | null>(null)
  const [redirectTarget, setRedirectTarget] = useState<GateName | null>(null)
  const [dirForm, setDirForm] = useState({
    topic: planDay?.topic ?? '',
    grade: (planDay?.grade ?? 1) as Grade,
    subject: (planDay?.subject ?? 'math') as Subject,
    objective: planDay?.objective ?? '',
  })
  const [templateId, setTemplateId] = useState('')
  const [worksheetDraft, setWorksheetDraft] =
    useState<WorksheetDraftResponse | null>(null)
  const [captionDraft, setCaptionDraft] =
    useState<CaptionDraftResponse | null>(null)
  const [worksheetInstruction, setWorksheetInstruction] = useState('')
  const [captionInstruction, setCaptionInstruction] = useState('')
  const [generating, setGenerating] = useState<'worksheet' | 'caption' | null>(
    null,
  )
  const [generateError, setGenerateError] = useState<string | null>(null)

  const allPriorApproved = GATE_ORDER.slice(0, 4).every(
    (gate) => pkg.gates[gate].status === 'approved',
  )

  async function callGateApi(
    gate: GateName,
    action: 'approve',
    body: object,
  ) {
    setLoading(gate)
    try {
      await fetch(`/api/approval/gate/${gate}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  function approve(gate: GateName, payload?: GatePayload) {
    void callGateApi(gate, 'approve', payload ? { payload } : {})
  }

  async function resetGate(gate: GateName) {
    setLoading(gate)
    try {
      await fetch(`/api/approval/gate/${gate}/reset`, { method: 'POST' })
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  async function handleGenerate(gate: 'worksheet' | 'caption') {
    setGenerateError(null)
    setGenerating(gate)
    try {
      const dirPayload = pkg.gates.direction.payload
      if (!isDirection(dirPayload)) return

      if (gate === 'worksheet') {
        const res = await fetch('/api/ai/draft/worksheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: dirPayload.topic,
            grade: dirPayload.grade,
            subject: dirPayload.subject,
            objective: dirPayload.objective,
            template: templateId || 'cozy_v1',
            instruction: worksheetInstruction || undefined,
          }),
        })
        if (!res.ok) {
          const errData = (await res.json()) as { error?: string }
          throw new Error(errData.error ?? 'Worksheet generation failed')
        }
        const data = (await res.json()) as WorksheetDraftResponse
        setWorksheetDraft(data)
      }

      if (gate === 'caption') {
        const res = await fetch('/api/ai/draft/caption', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            worksheetTitle: dirPayload.topic,
            grade: dirPayload.grade,
            subject: dirPayload.subject,
            topic: dirPayload.topic,
            instruction: captionInstruction || undefined,
          }),
        })
        if (!res.ok) {
          const errData = (await res.json()) as { error?: string }
          throw new Error(errData.error ?? 'Caption generation failed')
        }
        const data = (await res.json()) as CaptionDraftResponse
        setCaptionDraft(data)
      }
    } catch (err) {
      setGenerateError(
        err instanceof Error ? err.message : 'Generation failed',
      )
    } finally {
      setGenerating(null)
    }
  }

  function renderDirectionBody(payload: GatePayload, status: GateStatus) {
    if (status === 'approved' && isDirection(payload)) {
      return (
        <div className="space-y-3">
          <dl className="grid gap-2 text-[14px]">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-3">Topic</dt>
              <dd className="font-medium text-ink">{payload.topic}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-3">Grade</dt>
              <dd className="text-ink">Grade {payload.grade}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-3">Subject</dt>
              <dd className="text-ink">{SUBJECT_LABELS[payload.subject]}</dd>
            </div>
            {payload.objective ? (
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">Objective</dt>
                <dd className="max-w-md text-right text-ink">
                  {payload.objective}
                </dd>
              </div>
            ) : null}
          </dl>
          <button
            onClick={() => void resetGate('direction')}
            disabled={loading === 'direction'}
            className={textButtonClass}
          >
            Edit Direction
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {status === 'redirecting' ? (
          <p className="text-[13px] text-[#7A5A11]">
            {pkg.gates.direction.redirectNote}
          </p>
        ) : null}
        {planDay ? (
          <button
            type="button"
            onClick={() =>
              setDirForm({
                topic: planDay.topic,
                grade: planDay.grade as Grade,
                subject: planDay.subject as Subject,
                objective: planDay.objective ?? '',
              })
            }
            className={textButtonClass}
          >
            Fill from Plan
          </button>
        ) : null}
        <input
          type="text"
          placeholder="Topic"
          value={dirForm.topic}
          onChange={(event) =>
            setDirForm((current) => ({ ...current, topic: event.target.value }))
          }
          className={inputClass}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select
            value={dirForm.grade}
            onChange={(event) =>
              setDirForm((current) => ({
                ...current,
                grade: Number(event.target.value) as Grade,
              }))
            }
            className={selectClass}
          >
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            ))}
          </select>
          <select
            value={dirForm.subject}
            onChange={(event) =>
              setDirForm((current) => ({
                ...current,
                subject: event.target.value as Subject,
              }))
            }
            className={selectClass}
          >
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {SUBJECT_LABELS[subject]}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Objective (optional)"
          value={dirForm.objective}
          onChange={(event) =>
            setDirForm((current) => ({
              ...current,
              objective: event.target.value,
            }))
          }
          className={inputClass}
        />
        <button
          onClick={() =>
            approve('direction', {
              topic: dirForm.topic,
              grade: dirForm.grade,
              subject: dirForm.subject,
              objective: dirForm.objective || undefined,
            })
          }
          disabled={!dirForm.topic.trim() || loading === 'direction'}
          className={primaryButtonClass}
        >
          {loading === 'direction' ? '...' : 'Set Direction & Approve'}
        </button>
      </div>
    )
  }

  function renderWorksheetDraft(
    draft: WorksheetDraft,
    provenance: WorksheetDraftResponse['provenance'],
  ) {
    return (
      <div className="space-y-4">
        {draft.subtitle ? (
          <p className="text-[13px] italic text-ink-2">{draft.subtitle}</p>
        ) : null}

        {draft.vocabulary.length > 0 ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-2">
              Vocabulary
            </p>
            <div className="space-y-1.5">
              {draft.vocabulary.map((entry) => (
                <div key={entry.word} className="flex gap-3 text-[13px]">
                  <span className="font-semibold text-ink min-w-[110px] shrink-0">
                    {entry.word}
                  </span>
                  <span className="text-ink-2">{entry.definition}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {draft.activities.length > 0 ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-2">
              Activities
            </p>
            <div className="space-y-2">
              {draft.activities.map((activity, index) => (
                <div
                  key={index}
                  className="rounded-[8px] bg-cream-deep border border-[rgba(92,64,51,0.08)] p-3"
                >
                  <p className="text-[11px] font-semibold text-ink capitalize mb-1">
                    {activity.type.replace(/-/g, ' ')}
                  </p>
                  <p className="text-[12px] italic text-ink-2 mb-2">
                    {activity.instruction}
                  </p>
                  <ul className="space-y-0.5">
                    {activity.items.map((item, i) => (
                      <li key={i} className="text-[12px] text-ink-3">
                        {i + 1}. {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {draft.parentNotes ? (
          <div className="rounded-[8px] bg-yellow-tint border border-[rgba(92,64,51,0.1)] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-1">
              Parent Notes
            </p>
            <p className="text-[13px] text-ink-2">{draft.parentNotes}</p>
          </div>
        ) : null}

        {provenance.length > 0 ? (
          <ProvenancePanel provenance={provenance} />
        ) : null}
      </div>
    )
  }

  function renderWorksheetBody(payload: GatePayload, status: GateStatus) {
    if (status === 'redirecting') {
      return (
        <div className="space-y-2">
          <p className="text-[14px] italic text-[#7A5A11]">
            {pkg.gates.worksheet.redirectNote}
          </p>
          <p className="text-[13px] text-ink-3">
            Draft will be regenerated with this guidance.
          </p>
        </div>
      )
    }

    if (isWorksheet(payload)) {
      return renderWorksheetDraft(payload.draft, payload.provenance)
    }

    if (worksheetDraft && status !== 'approved') {
      return renderWorksheetDraft(worksheetDraft.draft, worksheetDraft.provenance)
    }

    if (pkg.gates.direction.status === 'approved') {
      return (
        <div>
          <button
            onClick={() => void handleGenerate('worksheet')}
            disabled={generating === 'worksheet'}
            className="bg-ink text-cream rounded-[10px] px-5 py-2.5 text-[14px] font-medium hover:bg-[#1a120e] transition-colors disabled:opacity-40"
          >
            {generating === 'worksheet' ? 'Generating…' : 'Generate Worksheet'}
          </button>
          {generateError && generating !== 'worksheet' ? (
            <p className="text-[12px] text-rose mt-1">{generateError}</p>
          ) : null}
          {worksheetInstruction ? (
            <p className="text-[11px] text-ink-3 mt-1 truncate max-w-[280px]">
              Instructions: {worksheetInstruction}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setRedirectTarget('worksheet')}
            className="text-[11px] text-ink-4 hover:text-ink-2 transition-colors underline-offset-2 underline mt-0.5"
          >
            {worksheetInstruction ? 'Edit instructions' : 'Add instructions'}
          </button>
          <p className="text-[12px] text-ink-3 mt-2">
            AI will draft a worksheet based on the approved direction.
          </p>
        </div>
      )
    }

    return (
      <p className="text-[14px] italic text-ink-3">
        Approve the Direction gate first.
      </p>
    )
  }

  function renderTemplateBody(payload: GatePayload, status: GateStatus) {
    if (status === 'approved' && isTemplate(payload)) {
      return <p className="text-[14px] text-ink">Template: {payload.templateId}</p>
    }

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setTemplateId(template.id)}
              className={`cursor-pointer rounded-[12px] border-2 p-4 text-left transition-colors ${
                templateId === template.id
                  ? 'border-sage bg-sage-tint'
                  : 'border-[rgba(92,64,51,0.14)] bg-paper hover:border-sage/40 hover:bg-cream'
              }`}
            >
              <span className="flex items-center gap-4">
                <span className="w-[48px] h-[60px] rounded-[6px] bg-cream-deep border border-[rgba(92,64,51,0.1)] grid place-items-center text-[10px] font-mono text-ink-4">
                  v1
                </span>
                <span>
                  <span className="block font-medium text-ink text-[14px]">
                    {template.label}
                  </span>
                  <span className="block text-[12px] text-ink-3 mt-0.5">
                    {template.description}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => approve('template', { templateId })}
          disabled={!templateId.trim() || loading === 'template'}
          className={primaryButtonClass}
        >
          {loading === 'template' ? '...' : 'Approve Template'}
        </button>
      </div>
    )
  }

  function renderCaptionDraft(draft: CaptionDraftResponse) {
    return (
      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-2">
            Caption
          </p>
          <div className="relative rounded-[10px] border border-[rgba(92,64,51,0.14)] bg-cream-deep p-4">
            <button
              onClick={() => void navigator.clipboard.writeText(draft.caption)}
              className="absolute top-2.5 right-3 text-[11px] font-medium text-ink-3 hover:text-ink transition-colors"
            >
              Copy
            </button>
            <p className="text-[13px] text-ink leading-relaxed pr-10">
              {draft.caption}
            </p>
          </div>
        </div>

        {draft.hashtags.length > 0 ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-4 mb-2">
              Hashtags
            </p>
            <p className="text-[13px] text-ink-2 leading-relaxed">
              {draft.hashtags.map((tag) => `#${tag}`).join('  ')}
            </p>
          </div>
        ) : null}

        {draft.provenance.length > 0 ? (
          <ProvenancePanel provenance={draft.provenance} />
        ) : null}
      </div>
    )
  }

  function renderCaptionBody(payload: GatePayload, status: GateStatus) {
    if (status === 'redirecting') {
      return (
        <p className="text-[14px] italic text-[#7A5A11]">
          {pkg.gates.caption.redirectNote}
        </p>
      )
    }

    if (isCaption(payload)) {
      return renderCaptionDraft(payload)
    }

    if (captionDraft && status !== 'approved') {
      return renderCaptionDraft(captionDraft)
    }

    if (pkg.gates.worksheet.status === 'approved') {
      return (
        <div>
          <button
            onClick={() => void handleGenerate('caption')}
            disabled={generating === 'caption'}
            className="bg-ink text-cream rounded-[10px] px-5 py-2.5 text-[14px] font-medium hover:bg-[#1a120e] transition-colors disabled:opacity-40"
          >
            {generating === 'caption' ? 'Generating…' : 'Generate Caption'}
          </button>
          {generateError && generating !== 'caption' ? (
            <p className="text-[12px] text-rose mt-1">{generateError}</p>
          ) : null}
          {captionInstruction ? (
            <p className="text-[11px] text-ink-3 mt-1 truncate max-w-[280px]">
              Instructions: {captionInstruction}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setRedirectTarget('caption')}
            className="text-[11px] text-ink-4 hover:text-ink-2 transition-colors underline-offset-2 underline mt-0.5"
          >
            {captionInstruction ? 'Edit instructions' : 'Add instructions'}
          </button>
          <p className="text-[12px] text-ink-3 mt-2">
            AI will draft a Facebook caption based on the worksheet.
          </p>
        </div>
      )
    }

    return (
      <p className="text-[14px] italic text-ink-3">
        Approve the Worksheet gate first.
      </p>
    )
  }

  function renderFinalBody(status: GateStatus) {
    return (
      <div className="space-y-3">
        <ul className="space-y-1">
          {GATE_ORDER.map((gateName) => (
            <li
              key={gateName}
              className="flex items-center justify-between text-[14px]"
            >
              <span className="text-ink">{GATE_LABELS[gateName]}</span>
              <span className="text-ink-3">{pkg.gates[gateName].status}</span>
            </li>
          ))}
        </ul>
        {status === 'approved' ? (
          <p className="text-[13px] text-sage-deep">Package complete!</p>
        ) : allPriorApproved ? (
          <p className="text-[13px] text-sage-deep">
            All gates approved. Ready to finalize.
          </p>
        ) : (
          <p className="text-[13px] text-ink-3">
            Complete all gates before finalizing.
          </p>
        )}
      </div>
    )
  }

  function renderGateBody(gate: GateName, payload: GatePayload, status: GateStatus) {
    if (gate === 'direction') return renderDirectionBody(payload, status)
    if (gate === 'worksheet') return renderWorksheetBody(payload, status)
    if (gate === 'template') return renderTemplateBody(payload, status)
    if (gate === 'caption') return renderCaptionBody(payload, status)
    return renderFinalBody(status)
  }

  function renderActionRow(gate: GateName, payload: GatePayload, status: GateStatus) {
    if (
      gate === 'direction' ||
      gate === 'template' ||
      status === 'approved' ||
      status === 'rejected' ||
      status === 'redirecting'
    ) {
      return null
    }

    const canApproveWorksheet =
      gate === 'worksheet' && (isWorksheet(payload) || worksheetDraft !== null)
    const canApproveCaption =
      gate === 'caption' && (isCaption(payload) || captionDraft !== null)
    const canApproveFinal = gate === 'final' && allPriorApproved
    const canApprove = canApproveWorksheet || canApproveCaption || canApproveFinal

    if (gate === 'final' && !canApproveFinal) {
      return null
    }

    return (
      <div className="border-t border-[rgba(92,64,51,0.08)] mt-4 pt-4 flex flex-wrap items-center gap-2.5">
        {canApprove ? (
          <button
            onClick={() => {
              if (gate === 'worksheet' && worksheetDraft) {
                approve('worksheet', worksheetDraft)
                return
              }
              if (gate === 'caption' && captionDraft) {
                approve('caption', captionDraft)
                return
              }
              approve(gate)
            }}
            disabled={loading === gate}
            className={primaryButtonClass}
          >
            {loading === gate
              ? '...'
              : gate === 'worksheet'
                ? 'Approve Worksheet'
                : gate === 'caption'
                  ? 'Approve Caption'
                  : 'Approve Package'}
          </button>
        ) : null}
        {gate === 'worksheet' && worksheetDraft ? (
          <button
            onClick={() => void handleGenerate('worksheet')}
            disabled={generating === 'worksheet'}
            className={textButtonClass}
          >
            Regenerate
          </button>
        ) : null}
        {gate === 'caption' && captionDraft ? (
          <button
            onClick={() => void handleGenerate('caption')}
            disabled={generating === 'caption'}
            className={textButtonClass}
          >
            Regenerate
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-start">
        {GATE_ORDER.map((gateName, index) => {
          const gate = pkg.gates[gateName]

          return (
            <div key={gateName} className="flex flex-1 items-start">
              <div className="flex flex-1 flex-col items-center text-center">
                <StepCircle status={gate.status} />
                <p className="mt-2 text-[12px] font-medium text-ink-3">
                  {GATE_LABELS[gateName]}
                </p>
              </div>
              {index < GATE_ORDER.length - 1 ? (
                <div className="bg-[rgba(92,64,51,0.14)] h-px flex-1 mt-4" />
              ) : null}
            </div>
          )
        })}
      </div>

      {GATE_ORDER.map((gateName) => {
        const gate = pkg.gates[gateName]

        return (
          <div
            key={gateName}
            className="bg-paper border border-[rgba(92,64,51,0.14)] rounded-[14px] overflow-hidden mb-4 shadow-card"
          >
            <div className="bg-cream-deep px-5 py-3.5 border-b border-[rgba(92,64,51,0.08)] flex items-center justify-between gap-4">
              <div>
                <h2 className="font-medium text-ink text-[14px]">
                  {GATE_LABELS[gateName]}
                </h2>
                <p className="text-[12px] text-ink-3 mt-0.5">
                  {gateName === 'direction'
                    ? planDay
                      ? "Loaded from today's plan. Adjust if needed then approve."
                      : 'No plan found for today. Enter the direction manually.'
                    : GATE_DESCRIPTIONS[gateName]}
                </p>
              </div>
              <StatusLabel status={gate.status} />
            </div>
            <div className="px-5 py-4">
              {renderGateBody(gateName, gate.payload, gate.status)}
              {renderActionRow(gateName, gate.payload, gate.status)}
            </div>
          </div>
        )
      })}

      {redirectTarget ? (
        <RedirectModal
          gate={GATE_LABELS[redirectTarget]}
          initialValue={
            redirectTarget === 'worksheet'
              ? worksheetInstruction
              : captionInstruction
          }
          onConfirm={(note) => {
            if (redirectTarget === 'worksheet') setWorksheetInstruction(note)
            if (redirectTarget === 'caption') setCaptionInstruction(note)
            setRedirectTarget(null)
          }}
          onCancel={() => setRedirectTarget(null)}
        />
      ) : null}
    </div>
  )
}
