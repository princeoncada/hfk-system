import Link from 'next/link'
import { TemplateSlotEditor } from '@/components/templates/editor'
import { getTemplateById } from '@/lib/template.store'

interface EditTemplatePageProps {
  params: { id: string }
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
  const def = getTemplateById(params.id)

  if (!def) {
    return (
      <div className="mx-auto max-w-sm rounded-card bg-paper p-8 text-center shadow-card">
        <p className="mb-4 text-[14px] text-ink-2">Template not found</p>
        <Link href="/templates" className="text-[13px] text-sage hover:underline">
          Back to templates
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
          Templates
        </p>
        <h1 className="font-display text-[38px] leading-[1.1]">
          Edit: {def.name}
        </h1>
      </div>

      <TemplateSlotEditor initialDefinition={def} />
    </>
  )
}
