import Link from 'next/link'

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

      <div className="mx-auto max-w-sm rounded-card bg-paper p-8 text-center shadow-card">
        <p className="mb-4 text-[14px] text-ink-2">
          Template editor coming in Phase 4.2.0
        </p>
        <Link href="/templates" className="text-[13px] text-sage hover:underline">
          Back to templates
        </Link>
      </div>
    </>
  )
}
