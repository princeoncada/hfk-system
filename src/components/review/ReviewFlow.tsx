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
  pending: 'bg-warm-brown/10 text-warm-brown/50',
  approved: 'bg-sage-green/20 text-sage-green',
  rejected: 'bg-red-100 text-red-500',
  redirecting: 'bg-soft-yellow text-warm-brown',
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
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[status]}`}
    >
      {status === 'redirecting' ? 'needs attention' : status}
    </span>
  )
}

function StepCircle({ status }: { status: GateStatus }) {
  if (status === 'approved') {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-green text-sm font-semibold text-white">
        ✓
      </span>
    )
  }

  if (status === 'redirecting' || status === 'rejected') {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-sm font-semibold text-white">
        !
      </span>
    )
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-warm-brown/20 bg-white text-sm font-semibold text-warm-brown/40" />
  )
}

function ProvenancePanel({
  provenance,
}: {
  provenance: Array<{ vaultId: string; assetType: string; confidence: number }>
}) {
  return (
    <details className="mt-3">
      <summary className="cursor-pointer text-xs text-warm-brown/40 hover:text-warm-brown/60">
        Grounded by {provenance.length} Vault asset
        {provenance.length !== 1 ? 's' : ''}
      </summary>
      <ul className="mt-2 space-y-1">
        {provenance.map((item) => (
          <li
            key={item.vaultId}
            className="flex justify-between gap-4 text-xs text-warm-brown/50"
          >
            <span>{item.vaultId}</span>
            <span className="text-warm-brown/30">
              {item.assetType} · {(item.confidence * 100).toFixed(0)}%
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
        <dl className="grid gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-warm-brown/50">Topic</dt>
            <dd className="font-medium">{payload.topic}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-warm-brown/50">Grade</dt>
            <dd>Grade {payload.grade}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-warm-brown/50">Subject</dt>
            <dd>{SUBJECT_LABELS[payload.subject]}</dd>
          </div>
          {payload.objective ? (
            <div className="flex justify-between gap-4">
              <dt className="text-warm-brown/50">Objective</dt>
              <dd className="max-w-md text-right">{payload.objective}</dd>
            </div>
          ) : null}
        </dl>
      )
    }

    return (
      <div className="space-y-3">
        {status === 'redirecting' ? (
          <p className="text-sm text-amber-700">
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
          className="w-full rounded border border-warm-brown/20 px-3 py-2 text-sm"
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
            className="rounded border border-warm-brown/20 px-3 py-2 text-sm"
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
            className="rounded border border-warm-brown/20 px-3 py-2 text-sm"
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
          className="w-full rounded border border-warm-brown/20 px-3 py-2 text-sm"
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
          className="rounded bg-sage-green px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
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
          <p className="text-sm italic text-amber-700">
            {pkg.gates.worksheet.redirectNote}
          </p>
          <p className="text-sm text-warm-brown/50">
            Draft will be regenerated with this guidance.
          </p>
        </div>
      )
    }

    if (isWorksheet(payload)) {
      return (
        <div className="space-y-3">
          {payload.draft.subtitle ? (
            <p className="font-medium">{payload.draft.subtitle}</p>
          ) : null}
          <div>
            <p className="text-sm text-warm-brown/50">
              Vocabulary: {payload.draft.vocabulary.length} terms
            </p>
            <ul className="mt-1 space-y-1">
              {payload.draft.vocabulary.slice(0, 3).map((entry) => (
                <li key={entry.word} className="text-sm">
                  <span className="font-medium">{entry.word}:</span>{' '}
                  {entry.definition}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-warm-brown/50">Activities</p>
            <ul className="mt-1 list-inside list-disc text-sm">
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
      <p className="text-sm italic text-warm-brown/50">
        No worksheet draft yet. Generate one via POST /api/ai/draft/worksheet.
      </p>
    )
  }

  function renderTemplateBody(payload: GatePayload, status: GateStatus) {
    if (status === 'approved' && isTemplate(payload)) {
      return <p className="text-sm">Template: {payload.templateId}</p>
    }

    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="e.g. template/cozy_v1"
          value={templateId}
          onChange={(event) => setTemplateId(event.target.value)}
          className="flex-1 rounded border border-warm-brown/20 px-3 py-2 text-sm"
        />
        <button
          onClick={() => approve('template', { templateId })}
          disabled={!templateId.trim() || loading === 'template'}
          className="rounded bg-sage-green px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {loading === 'template' ? '...' : 'Approve Template'}
        </button>
      </div>
    )
  }

  function renderCaptionBody(payload: GatePayload, status: GateStatus) {
    if (status === 'redirecting') {
      return (
        <p className="text-sm italic text-amber-700">
          {pkg.gates.caption.redirectNote}
        </p>
      )
    }

    if (isCaption(payload)) {
      return (
        <div>
          <blockquote className="border-l-4 border-sage-green pl-4 text-sm italic">
            {payload.caption}
          </blockquote>
          <div className="mt-3 flex flex-wrap gap-2">
            {payload.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-warm-brown/10 px-2 py-0.5 text-xs text-warm-brown/60"
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
      <p className="text-sm italic text-warm-brown/50">
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
              className="flex items-center justify-between text-sm"
            >
              <span>{GATE_LABELS[gateName]}</span>
              <span className="text-warm-brown/50">
                {pkg.gates[gateName].status}
              </span>
            </li>
          ))}
        </ul>
        {status === 'approved' ? (
          <p className="text-sm text-sage-green">Package complete!</p>
        ) : allPriorApproved ? (
          <p className="text-sm text-sage-green">
            All gates approved. Ready to finalize.
          </p>
        ) : (
          <p className="text-sm text-warm-brown/50">
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
            className="flex-1 rounded border border-warm-brown/20 px-3 py-1.5 text-sm"
          />
          <button
            onClick={() => reject(gate)}
            disabled={!rejectReason.trim()}
            className="rounded bg-red-100 px-3 py-1.5 text-sm font-medium text-red-500 disabled:opacity-40"
          >
            Confirm
          </button>
          <button
            onClick={() => setRejectTarget(null)}
            className="px-3 py-1.5 text-sm text-warm-brown/50 hover:text-warm-brown"
          >
            Cancel
          </button>
        </div>
      )
    }

    return (
      <button
        onClick={() => setRejectTarget(gate)}
        className="rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-500"
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
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-warm-brown/10 pt-4">
        {canApprove ? (
          <button
            onClick={() => approve(gate)}
            disabled={loading === gate}
            className="rounded bg-sage-green px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
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
            className="rounded bg-soft-yellow px-4 py-2 text-sm font-medium text-warm-brown"
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
                <p className="mt-2 text-xs font-medium">{GATE_LABELS[gateName]}</p>
              </div>
              {index < GATE_ORDER.length - 1 ? (
                <div className="mt-4 h-px flex-1 bg-warm-brown/20" />
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
            className="mb-4 overflow-hidden rounded-lg border border-warm-brown/20"
          >
            <div className="flex items-center justify-between bg-warm-brown/5 px-4 py-3">
              <div>
                <h2 className="font-medium">{GATE_LABELS[gateName]}</h2>
                <p className="mt-0.5 text-xs text-warm-brown/50">
                  {GATE_DESCRIPTIONS[gateName]}
                </p>
              </div>
              <StatusLabel status={gate.status} />
            </div>
            <div className="px-4 py-4">
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
