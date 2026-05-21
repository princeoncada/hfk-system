import { notFound } from 'next/navigation'
import { getWorksheetById } from '@/lib/content'
import WorksheetEditor from '../WorksheetEditor'

interface EditPageProps {
  params: { id: string }
}

export default function EditWorksheetPage({ params }: EditPageProps) {
  const worksheet = getWorksheetById(params.id)
  if (!worksheet) notFound()

  return <WorksheetEditor initialData={worksheet} />
}
