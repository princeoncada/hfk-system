import Link from 'next/link'
import PlannerView from '@/components/planner/PlannerView'
import { getPlan } from '@/lib/planning.store'

export default async function PlannerMonthPage({
  params,
}: {
  params: { month: string }
}) {
  const { month } = params
  const plan = getPlan(month)
  const [year, m] = month.split('-').map(Number)
  const prevDate = new Date(year, m - 2, 1)
  const nextDate = new Date(year, m, 1)
  const prevMonth = `${prevDate.getFullYear()}-${String(
    prevDate.getMonth() + 1,
  ).padStart(2, '0')}`
  const nextMonth = `${nextDate.getFullYear()}-${String(
    nextDate.getMonth() + 1,
  ).padStart(2, '0')}`
  const monthLabel = new Date(year, m - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Plan
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display text-[38px] leading-[1.1]">{monthLabel}</h1>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/planner/${prevMonth}`}
              className="w-8 h-8 grid place-items-center rounded-[8px] border border-[rgba(92,64,51,0.14)] text-ink-3 hover:text-ink hover:bg-cream-deep transition-colors text-[14px]"
            >
              &larr;
            </Link>
            <Link
              href={`/planner/${nextMonth}`}
              className="w-8 h-8 grid place-items-center rounded-[8px] border border-[rgba(92,64,51,0.14)] text-ink-3 hover:text-ink hover:bg-cream-deep transition-colors text-[14px]"
            >
              &rarr;
            </Link>
          </div>
        </div>
      </div>

      <PlannerView month={month} plan={plan} monthLabel={monthLabel} />
    </>
  )
}
