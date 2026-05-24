import fs from 'fs'
import path from 'path'
import { TemplateSlotEditor } from '@/components/templates/editor'

export default async function NewTemplatePage() {
  const AVATARS_DIR = path.join(process.cwd(), 'assets', 'avatars')
  const avatarOptions = fs.existsSync(AVATARS_DIR)
    ? fs.readdirSync(AVATARS_DIR).filter((f) => /\.(png|svg|jpe?g|webp)$/i.test(f))
    : []

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

      <TemplateSlotEditor avatarOptions={avatarOptions} />
    </>
  )
}
