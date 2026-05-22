import Link from 'next/link'
import ReviewFlow from '@/components/review/ReviewFlow'
import { getPackage } from '@/lib/approval.store'

export default async function ReviewPage() {
  const pkg = getPackage()

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            Daily Package Review
          </h1>
          <p className="mt-0.5 text-sm text-warm-brown/60">{pkg.date}</p>
        </div>
        <Link
          href="/"
          className="text-sm text-warm-brown/60 hover:text-warm-brown"
        >
          ← Home
        </Link>
      </div>
      <ReviewFlow pkg={pkg} />
    </div>
  )
}
