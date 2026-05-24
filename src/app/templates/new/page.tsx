import { TemplateSlotEditor } from '@/components/templates/editor'

export default async function NewTemplatePage() {
  return (
    <>
      <div className="mb-8">
        <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
          Templates
        </p>
        <h1 className="font-display text-[38px] leading-[1.1]">
          New Template
        </h1>
      </div>

      <TemplateSlotEditor />
    </>
  )
}
