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
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-warm-brown/60 hover:text-warm-brown"
          >
            ← Home
          </Link>
          <h1 className="font-display text-2xl font-semibold">{monthLabel}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/planner/${prevMonth}`}
            className="px-2 py-1 text-sm text-warm-brown/60 hover:text-warm-brown"
          >
            ←
          </Link>
          <Link
            href={`/planner/${nextMonth}`}
            className="px-2 py-1 text-sm text-warm-brown/60 hover:text-warm-brown"
          >
            →
          </Link>
        </div>
      </div>

      <PlannerView month={month} plan={plan} monthLabel={monthLabel} />
    </div>
  )
}
