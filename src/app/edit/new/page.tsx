import { randomUUID } from 'crypto'
import type { WorksheetContent } from '@/lib/types'
import WorksheetEditor from '../WorksheetEditor'

export const dynamic = 'force-dynamic'

export default function NewWorksheetPage() {
  const id = randomUUID()
  const today = new Date().toISOString().split('T')[0]
  const template: WorksheetContent = {
    id,
    title: '',
    subtitle: '',
    grade: 1,
    subject: 'math',
    template: 'cozy_v1',
    vocabulary: [],
    activities: [],
    parentNotes: '',
    footerText: '',
    createdAt: today,
    status: 'draft',
  }

  return <WorksheetEditor initialData={template} />
}
