import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'
import { getMockSnapshot } from '@/lib/analytics.mock'

export default function AnalyticsPage() {
  const snapshot = getMockSnapshot()

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Analytics
        </p>
        <h1 className="font-display text-[38px] leading-[1.1]">
          What&apos;s working.
        </h1>
      </div>
      <AnalyticsDashboard snapshot={snapshot} />
    </div>
  )
}
