import ReviewFlow from '@/components/review/ReviewFlow'
import { getPackage } from '@/lib/approval.store'

export default async function ReviewPage() {
  const pkg = getPackage()

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Today &middot; Review
        </p>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-[38px] leading-[1.1]">
            Daily Package Review
          </h1>
          <p className="text-[13px] text-ink-3 mb-1">{pkg.date}</p>
        </div>
      </div>
      <ReviewFlow pkg={pkg} />
    </>
  )
}
