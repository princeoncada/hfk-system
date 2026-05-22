import Link from 'next/link'
import { getPlan } from '@/lib/planning.store'

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7)
}

function formatMonthLabel(month: string): string {
  const [year, m] = month.split('-')
  return new Date(Number(year), Number(m) - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export default async function MonthProgress() {
  const month = currentMonth()
  const plan = getPlan(month)

  if (plan === null) {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold">Monthly Plan</h2>
        <div className="mt-3 rounded-lg border border-warm-brown/20 p-4 text-center">
          <p className="text-sm text-warm-brown/50">
            No plan for {formatMonthLabel(month)}.
          </p>
          <p className="mt-1 text-xs text-warm-brown/30">
            POST /api/planning/generate to create one.
          </p>
        </div>
      </section>
    )
  }

  const today = new Date().toISOString().slice(0, 10)
  const totalDays = plan.days.length
  const elapsedDays = plan.days.filter((day) => day.date <= today).length
  const pct = totalDays > 0 ? Math.round((elapsedDays / totalDays) * 100) : 0
  const todayPlan = plan.days.find((day) => day.date === today)

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold">
          {formatMonthLabel(month)}
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-warm-brown/60">
            {elapsedDays} / {totalDays} days
          </span>
          <Link
            href={`/planner/${month}`}
            className="text-sm text-sage-green hover:underline"
          >
            View Planner →
          </Link>
        </div>
      </div>

      <div className="mb-3 mt-2 h-2 w-full rounded-full bg-warm-brown/10">
        <div
          className="h-2 rounded-full bg-sage-green"
          style={{ width: `${pct}%` }}
        />
      </div>

      {todayPlan ? (
        <p className="text-sm">
          <span className="text-warm-brown/50">Today: </span>
          <span className="font-medium">{todayPlan.topic}</span>
          <span className="text-warm-brown/50">
            {' '}· Grade {todayPlan.grade} · {todayPlan.subject}
          </span>
        </p>
      ) : (
        <p className="text-sm text-warm-brown/40">
          No entry for today in this plan.
        </p>
      )}
    </section>
  )
}
