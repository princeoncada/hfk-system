import Link from 'next/link'
import { getWorksheetById } from '@/lib/content'
import WorksheetBuilder from '@/components/worksheets/WorksheetBuilder'
import { listTemplates } from '@/lib/template.store'
import type { TemplateDefinition } from '@/lib/template.types'

export default function WorksheetBuilderPage({ params }: { params: { id: string } }) {
  const worksheet = getWorksheetById(params.id)

  if (!worksheet) {
    return (
      <div className="bg-paper rounded-[14px] border border-[rgba(92,64,51,0.14)] p-8 text-center">
        <p className="mb-3 text-[13px] text-ink-3">Worksheet not found.</p>
        <Link href="/worksheets" className="text-[13px] text-sage hover:underline">
          Back to worksheets
        </Link>
      </div>
    )
  }

  const customTemplateDefs: TemplateDefinition[] = listTemplates()

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Worksheets
        </p>
        <h1 className="font-display text-[38px] leading-[1.1]">
          {worksheet.title}
        </h1>
      </div>

      <WorksheetBuilder initialWorksheet={worksheet} customTemplateDefs={customTemplateDefs} />
    </>
  )
}
