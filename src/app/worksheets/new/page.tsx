import type { Grade, Subject, WorksheetContent } from '@/lib/types'
import WorksheetBuilder from '@/components/worksheets/WorksheetBuilder'
import { listTemplates } from '@/lib/template.store'
import type { TemplateDefinition } from '@/lib/template.types'

export default function NewWorksheetPage() {
  const customTemplateDefs: TemplateDefinition[] = listTemplates()
  const blank: Partial<WorksheetContent> = {
    id: '',
    title: 'New Worksheet',
    grade: 1 as Grade,
    subject: 'math' as Subject,
    template: 'cozy_v1',
    vocabulary: [],
    activities: [],
    parentNotes: '',
    footerText: '',
    createdAt: new Date().toISOString(),
    status: 'draft',
  }

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Worksheets
        </p>
        <h1 className="font-display text-[38px] leading-[1.1]">
          New Worksheet.
        </h1>
      </div>

      <WorksheetBuilder initialWorksheet={blank} customTemplateDefs={customTemplateDefs} />
    </>
  )
}
