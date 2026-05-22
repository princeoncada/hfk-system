import Link from 'next/link'
import { getPackage } from '@/lib/approval.store'
import type { GateName, GateStatus } from '@/lib/approval.types'

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

const STATUS_BADGE: Record<GateStatus, string> = {
  pending: 'bg-[rgba(247,242,232,0.1)] text-ink-4 border-[rgba(247,242,232,0.15)]',
  approved: 'bg-sage-tint text-sage-deep border-sage/25',
  rejected: 'bg-rose-tint text-rose border-rose/30',
  redirecting: 'bg-yellow-tint text-[#7A5A11] border-yellow/40',
}

const STATUS_LABEL: Record<GateStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  redirecting: 'Needs attention',
}

export default async function TodayStatus() {
  const pkg = getPackage()
  const gates = GATE_ORDER.map((name) => pkg.gates[name])
  const approvedCount = gates.filter((gate) => gate.status === 'approved').length
  const attentionCount = gates.filter(
    (gate) => gate.status === 'redirecting' || gate.status === 'rejected',
  ).length

  return (
    <section className="rounded-[14px] bg-ink text-cream overflow-hidden shadow-lift">
      <div className="flex items-start justify-between gap-3 px-6 py-5">
        <div>
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-4 uppercase">
            Today's Package
          </p>
          <h2 className="font-display text-[26px] text-cream leading-tight">
            Daily approval gates
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={
              approvedCount === 5
                ? 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-sans border bg-sage-tint text-sage-deep border-sage/20'
                : 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-sans border bg-[rgba(247,242,232,0.12)] text-cream border-[rgba(247,242,232,0.18)]'
            }
          >
            {approvedCount === 5
              ? 'Package ready'
              : `${approvedCount} / 5 approved`}
          </span>
          <Link
            href="/review"
            className="text-[13px] text-cream/60 hover:text-cream transition-colors"
          >
            Review &rarr;
          </Link>
        </div>
      </div>

      {attentionCount > 0 ? (
        <p className="px-6 pb-1 text-[12px] text-yellow">
          {attentionCount} gate{attentionCount > 1 ? 's' : ''} need
          {attentionCount === 1 ? 's' : ''} attention
        </p>
      ) : null}

      <div className="grid grid-cols-5 gap-2 px-6 pb-5">
        {gates.map((gate) => (
          <div
            key={gate.name}
            className="flex flex-col gap-1 rounded-[10px] bg-[rgba(247,242,232,0.08)] border border-[rgba(247,242,232,0.12)] p-3"
          >
            <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-4">
              {GATE_LABELS[gate.name]}
            </p>
            <span
              className={`w-fit inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-sans border ${STATUS_BADGE[gate.status]}`}
            >
              {STATUS_LABEL[gate.status]}
            </span>
            {gate.approvedAt ? (
              <p className="text-[10px] text-ink-4 mt-0.5">
                {new Date(gate.approvedAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
