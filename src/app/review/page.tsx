import ReviewFlow from '@/components/review/ReviewFlow'
import { getPackage } from '@/lib/approval.store'
import { getPlan } from '@/lib/planning.store'
import type { PlanDay } from '@/lib/planning.types'
import { queryBestTemplate } from '@/lib/template.chroma'
import { listTemplates } from '@/lib/template.store'
import type { TemplateDefinition } from '@/lib/template.types'

export default async function ReviewPage() {
  const pkg = getPackage()
  const month = pkg.date.slice(0, 7)
  const plan = getPlan(month)
  const planDay: PlanDay | null = plan?.days.find((d) => d.date === pkg.date) ?? null
  const customTemplates: TemplateDefinition[] = listTemplates()
  let recommendedTemplateId: string | null = null

  if (customTemplates.length > 0) {
    const payload = pkg.gates.direction.payload
    if (
      payload !== null &&
      typeof payload === 'object' &&
      'grade' in payload &&
      'subject' in payload &&
      'topic' in payload
    ) {
      try {
        recommendedTemplateId = await queryBestTemplate(
          String((payload as { grade: unknown }).grade),
          String((payload as { subject: unknown }).subject),
          String((payload as { topic: unknown }).topic),
        )
      } catch {
        // ChromaDB not running - no recommendation.
      }
    }
  }

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
      <ReviewFlow
        pkg={pkg}
        planDay={planDay}
        customTemplates={customTemplates}
        recommendedTemplateId={recommendedTemplateId}
      />
    </>
  )
}
