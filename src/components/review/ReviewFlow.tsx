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
  WorksheetDraftResponse,
} from '@/lib/ai.types'
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

const inputClass =
  'border border-[rgba(92,64,51,0.14)] rounded-[10px] px-3 py-2 text-[14px] text-ink bg-paper focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage/50 w-full'
const selectClass = `${inputClass} appearance-none`
const primaryButtonClass =
  'bg-ink text-cream rounded-[10px] px-4 py-2.5 text-sm font-medium font-sans hover:bg-[#1a120e] transition-colors disabled:opacity-40'
const rejectButtonClass =
  'bg-rose-tint text-[#8C3D31] border border-rose/30 rounded-[10px] px-4 py-2 text-[13px] font-medium hover:bg-rose/10 disabled:opacity-40'
const redirectButtonClass =
  'bg-yellow-tint text-[#7A5A11] border border-yellow/40 rounded-[10px] px-4 py-2 text-[13px] font-medium hover:bg-yellow/20'
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

export default function ReviewFlow({ pkg }: ReviewFlowProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<GateName | null>(null)
  const [redirectTarget, setRedirectTarget] = useState<GateName | null>(null)
  const [rejectTarget, setRejectTarget] = useState<GateName | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [dirForm, setDirForm] = useState({
    topic: '',
    grade: 1 as Grade,
    subject: 'math' as Subject,
    objective: '',
  })
  const [templateId, setTemplateId] = useState('')

  const allPriorApproved = GATE_ORDER.slice(0, 4).every(
    (gate) => pkg.gates[gate].status === 'approved',
  )

  async function callGateApi(
    gate: GateName,
    action: 'approve' | 'reject' | 'redirect',
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

  function reject(gate: GateName) {
    if (!rejectReason.trim()) return
    void callGateApi(gate, 'reject', { reason: rejectReason })
    setRejectTarget(null)
    setRejectReason('')
  }

  function redirect(gate: GateName, note: string) {
    void callGateApi(gate, 'redirect', { note })
    setRedirectTarget(null)
  }

  function renderDirectionBody(payload: GatePayload, status: GateStatus) {
    if (status === 'approved' && isDirection(payload)) {
      return (
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
              <dd className="max-w-md text-right text-ink">{payload.objective}</dd>
            </div>
          ) : null}
        </dl>
      )
    }

    return (
      <div className="space-y-3">
        {status === 'redirecting' ? (
          <p className="text-[13px] text-[#7A5A11]">
            {pkg.gates.direction.redirectNote}
          </p>
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
      return (
        <div className="space-y-3">
          {payload.draft.subtitle ? (
            <p className="font-medium text-ink">{payload.draft.subtitle}</p>
          ) : null}
          <div>
            <p className="text-[13px] text-ink-3">
              Vocabulary: {payload.draft.vocabulary.length} terms
            </p>
            <ul className="mt-1 space-y-1">
              {payload.draft.vocabulary.slice(0, 3).map((entry) => (
                <li key={entry.word} className="text-[14px] text-ink">
                  <span className="font-medium">{entry.word}:</span>{' '}
                  {entry.definition}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] text-ink-3">Activities</p>
            <ul className="mt-1 list-inside list-disc text-[14px] text-ink">
              {payload.draft.activities.map((activity, index) => (
                <li key={`${activity.type}-${index}`}>{activity.type}</li>
              ))}
            </ul>
          </div>
          {payload.provenance.length > 0 ? (
            <ProvenancePanel provenance={payload.provenance} />
          ) : null}
        </div>
      )
    }

    return (
      <p className="text-[14px] italic text-ink-3">
        No worksheet draft yet. Generate one via POST /api/ai/draft/worksheet.
      </p>
    )
  }

  function renderTemplateBody(payload: GatePayload, status: GateStatus) {
    if (status === 'approved' && isTemplate(payload)) {
      return <p className="text-[14px] text-ink">Template: {payload.templateId}</p>
    }

    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="e.g. template/cozy_v1"
          value={templateId}
          onChange={(event) => setTemplateId(event.target.value)}
          className={inputClass}
        />
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

  function renderCaptionBody(payload: GatePayload, status: GateStatus) {
    if (status === 'redirecting') {
      return (
        <p className="text-[14px] italic text-[#7A5A11]">
          {pkg.gates.caption.redirectNote}
        </p>
      )
    }

    if (isCaption(payload)) {
      return (
        <div>
          <blockquote className="border-l-2 border-sage pl-4 text-[14px] text-ink-2 italic">
            {payload.caption}
          </blockquote>
          <div className="mt-3 flex flex-wrap gap-2">
            {payload.hashtags.map((tag) => (
              <span
                key={tag}
                className="bg-cream text-ink-3 border border-[rgba(92,64,51,0.1)] rounded-full px-2.5 py-0.5 text-[11px]"
              >
                #{tag}
              </span>
            ))}
          </div>
          {payload.provenance.length > 0 ? (
            <ProvenancePanel provenance={payload.provenance} />
          ) : null}
        </div>
      )
    }

    return (
      <p className="text-[14px] italic text-ink-3">
        No caption draft yet. Generate one via POST /api/ai/draft/caption.
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

  function renderRejectControl(gate: GateName) {
    if (rejectTarget === gate) {
      return (
        <div className="flex flex-1 items-center gap-2">
          <input
            type="text"
            placeholder="Rejection reason"
            value={rejectReason}
            onChange={(event) => setRejectReason(event.target.value)}
            className={inputClass}
          />
          <button
            onClick={() => reject(gate)}
            disabled={!rejectReason.trim()}
            className={rejectButtonClass}
          >
            Confirm
          </button>
          <button
            onClick={() => setRejectTarget(null)}
            className={textButtonClass}
          >
            Cancel
          </button>
        </div>
      )
    }

    return (
      <button
        onClick={() => setRejectTarget(gate)}
        className={rejectButtonClass}
      >
        Reject
      </button>
    )
  }

  function renderActionRow(gate: GateName, payload: GatePayload, status: GateStatus) {
    if (
      gate === 'direction' ||
      gate === 'template' ||
      status === 'approved' ||
      status === 'rejected'
    ) {
      return null
    }

    const canApproveWorksheet = gate === 'worksheet' && isWorksheet(payload)
    const canApproveCaption = gate === 'caption' && isCaption(payload)
    const canApproveFinal = gate === 'final' && allPriorApproved
    const canApprove = canApproveWorksheet || canApproveCaption || canApproveFinal

    return (
      <div className="border-t border-[rgba(92,64,51,0.08)] mt-4 pt-4 flex flex-wrap items-center gap-2.5">
        {canApprove ? (
          <button
            onClick={() => approve(gate)}
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
        {renderRejectControl(gate)}
        {status !== 'redirecting' ? (
          <button
            onClick={() => setRedirectTarget(gate)}
            className={redirectButtonClass}
          >
            Redirect
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
                  {GATE_DESCRIPTIONS[gateName]}
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
          onConfirm={(note) => redirect(redirectTarget, note)}
          onCancel={() => setRedirectTarget(null)}
        />
      ) : null}
    </div>
  )
}
