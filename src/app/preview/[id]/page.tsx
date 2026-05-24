import { redirect } from 'next/navigation'
import { getWorksheetById } from '@/lib/content'
import { WorksheetTemplate as CozyV1 } from '@/components/templates/cozy_v1'
import { WorksheetTemplate as PlayfulV1 } from '@/components/templates/playful_v1'
import type { WorksheetContent } from '@/lib/types'
import { getTemplateById } from '@/lib/template.store'
import { DynamicWorksheetTemplate } from '@/components/templates/dynamic'
import { PreviewControls } from './PreviewControls'

function resolveTemplate(worksheet: WorksheetContent) {
  if (worksheet.template === 'playful_v1') return PlayfulV1
  return CozyV1
}

interface PreviewPageProps {
  params: { id: string }
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const worksheet = getWorksheetById(params.id)
  if (!worksheet) redirect('/worksheets')
  const Template = resolveTemplate(worksheet)
  const customDef = getTemplateById(worksheet.template)

  if (customDef) {
    return (
      <div>
        <PreviewControls id={params.id} />
        <main className="min-h-screen bg-warm-brown/5 px-4 py-8">
          <DynamicWorksheetTemplate definition={customDef} worksheet={worksheet} />
        </main>
      </div>
    )
  }

  return (
    <div>
      <PreviewControls id={params.id} />
      <main className="min-h-screen bg-warm-brown/5 px-4 py-8">
        <Template worksheet={worksheet} />
      </main>
    </div>
  )
}
