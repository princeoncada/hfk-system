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
      <section className="rounded-[14px] bg-paper border border-[rgba(92,64,51,0.14)] shadow-card px-6 py-5">
        <h2 className="font-display text-[24px]">Monthly Plan</h2>
        <div className="mt-3 text-center">
          <p className="text-[13px] text-ink-3">
            No plan for {formatMonthLabel(month)}.
          </p>
          <p className="mt-1 text-[12px] text-ink-4">
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
    <section className="rounded-[14px] bg-paper border border-[rgba(92,64,51,0.14)] shadow-card px-6 py-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[24px] leading-none">
          {formatMonthLabel(month)}
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-ink-3">
            {elapsedDays} / {totalDays} days
          </span>
          <Link
            href={`/planner/${month}`}
            className="text-[13px] text-sage hover:underline"
          >
            View Planner &rarr;
          </Link>
        </div>
      </div>

      <div className="mt-3 mb-4 h-1.5 w-full rounded-full bg-[rgba(92,64,51,0.1)]">
        <div
          className="h-1.5 rounded-full bg-sage"
          style={{ width: `${pct}%` }}
        />
      </div>

      {todayPlan ? (
        <div>
          <p className="font-display text-[16px] text-ink">{todayPlan.topic}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-sans border bg-sage-tint text-sage-deep border-sage/20">
              {todayPlan.subject}
            </span>
            <span className="text-[13px] text-ink-3">Grade {todayPlan.grade}</span>
          </div>
        </div>
      ) : (
        <p className="text-[13px] text-ink-4">
          No entry for today in this plan.
        </p>
      )}
    </section>
  )
}
