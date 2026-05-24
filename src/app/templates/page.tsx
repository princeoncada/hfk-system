import Link from 'next/link'
import { listTemplates } from '@/lib/template.store'

const BUILTIN_TEMPLATES = [
  {
    id: 'cozy_v1',
    name: 'Cozy',
    description: 'Warm serif layout with sage accents.',
  },
  {
    id: 'playful_v1',
    name: 'Playful',
    description: 'Illustrated layout with Fredoka/Nunito and rotating activity colors.',
  },
]

export default async function TemplatesPage() {
  const customTemplates = listTemplates()

  return (
    <>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Templates
          </p>
          <h1 className="font-display text-[38px] leading-[1.1]">
            Your templates.
          </h1>
        </div>
        <Link
          href="/templates/new"
          className="rounded bg-ink px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-[#1a120e]"
        >
          New Template
        </Link>
      </div>

      <section>
        <h2 className="mb-3 font-display text-[24px] leading-tight text-ink">
          Built-in
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {BUILTIN_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="rounded-card border border-[rgba(92,64,51,0.1)] bg-paper p-5 shadow-card"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-medium text-ink">{template.name}</h3>
                <span className="rounded-full bg-sage-tint px-2 py-0.5 text-xs text-sage-deep">
                  Built-in
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-3">
                {template.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-[24px] leading-tight text-ink">
          Custom
        </h2>
        {customTemplates.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {customTemplates.map((def) => (
              <div
                key={def.id}
                className="rounded-card border border-[rgba(92,64,51,0.1)] bg-paper p-5 shadow-card"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-ink">{def.name}</h3>
                    <p className="mt-0.5 font-mono text-[11px] text-ink-4">
                      v{def.version}
                    </p>
                  </div>
                  <Link
                    href={`/templates/${def.id}/edit`}
                    className="rounded-[8px] border border-[rgba(92,64,51,0.14)] px-3 py-1.5 text-[12px] font-medium text-ink-2 transition-colors hover:bg-cream"
                  >
                    Edit
                  </Link>
                </div>
                <p className="text-[13px] leading-relaxed text-ink-3">
                  {def.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-[rgba(92,64,51,0.1)] bg-paper p-8 text-center shadow-card">
            <p className="text-[13px] text-ink-3">
              No custom templates yet. Create one to get started.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
