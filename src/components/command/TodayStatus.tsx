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
  pending: 'bg-warm-brown/10 text-warm-brown/50',
  approved: 'bg-sage-green/20 text-sage-green',
  rejected: 'bg-red-100 text-red-500',
  redirecting: 'bg-soft-yellow text-warm-brown',
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
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">Today's Package</h2>
        <span
          className={
            approvedCount === 5
              ? 'rounded-full bg-sage-green/20 px-3 py-1 text-xs font-medium text-sage-green'
              : 'rounded-full bg-warm-brown/10 px-3 py-1 text-xs font-medium text-warm-brown/60'
          }
        >
          {approvedCount === 5 ? 'Package ready' : `${approvedCount} / 5 approved`}
        </span>
      </div>

      {attentionCount > 0 ? (
        <p className="mt-1 text-sm text-amber-600">
          {attentionCount} gate{attentionCount > 1 ? 's' : ''} need
          {attentionCount === 1 ? 's' : ''} attention
        </p>
      ) : null}

      <div className="mt-3 grid grid-cols-5 gap-2">
        {gates.map((gate) => (
          <div
            key={gate.name}
            className="flex flex-col gap-1 rounded-lg border border-warm-brown/20 p-3"
          >
            <p className="text-xs uppercase tracking-wide text-warm-brown/50">
              {GATE_LABELS[gate.name]}
            </p>
            <span
              className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[gate.status]}`}
            >
              {STATUS_LABEL[gate.status]}
            </span>
            {gate.approvedAt ? (
              <p className="text-xs text-warm-brown/30">
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
