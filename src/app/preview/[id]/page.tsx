import { notFound } from 'next/navigation'
import { getWorksheetById } from '@/lib/content'
import { WorksheetTemplate } from '@/components/templates/cozy_v1'
import { PreviewControls } from './PreviewControls'

interface PreviewPageProps {
  params: { id: string }
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const worksheet = getWorksheetById(params.id)
  if (!worksheet) notFound()

  return (
    <div>
      <PreviewControls />
      <main className="min-h-screen bg-warm-brown/5 px-4 py-8">
        <WorksheetTemplate worksheet={worksheet} />
      </main>
    </div>
  )
}
