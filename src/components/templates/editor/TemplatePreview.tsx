import { DynamicWorksheetTemplate } from '@/components/templates/dynamic'
import type { TemplateDefinition } from '@/lib/template.types'
import type { WorksheetContent } from '@/lib/types'

interface TemplatePreviewProps {
  definition: TemplateDefinition
}

const PREVIEW_WORKSHEET: WorksheetContent = {
  id: 'template-preview-sample',
  title: 'Sample Worksheet',
  subtitle: 'Preview — Grade 3 Math',
  grade: 3,
  subject: 'math',
  template: 'preview',
  sectionOrder: ['vocabulary', 'activities', 'parentNotes'],
  vocabulary: [
    { word: 'sum', definition: 'The result of adding two or more numbers.' },
    {
      word: 'difference',
      definition: 'The result of subtracting one number from another.',
    },
  ],
  activities: [
    {
      type: 'fill-in-the-blank',
      instruction: 'Fill in the blank with the correct answer.',
      items: ['3 + 4 = ___', '9 − 5 = ___', '2 + 7 = ___'],
    },
    {
      type: 'multiple-choice',
      instruction: 'Circle the correct answer.',
      items: ['What is 6 + 3?', 'A) 8', 'B) 9', 'C) 10'],
    },
  ],
  parentNotes:
    'Encourage your child to count on their fingers if needed. Celebrate effort!',
  footerText: 'Homeschooling for Kiddos',
  references: [],
  createdAt: '2026-05-24',
  status: 'draft',
}

const WORKSHEET_WIDTH = 816
const PREVIEW_WIDTH = 288
const SCALE = PREVIEW_WIDTH / WORKSHEET_WIDTH
const PREVIEW_HEIGHT = Math.round(1056 * SCALE)

export function TemplatePreview({ definition }: TemplatePreviewProps) {
  return (
    <div
      style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
      className="overflow-hidden rounded-lg border border-[rgba(92,64,51,0.15)] bg-paper"
    >
      <div
        style={{
          width: WORKSHEET_WIDTH,
          transform: `scale(${SCALE})`,
          transformOrigin: 'top left',
        }}
      >
        <DynamicWorksheetTemplate
          definition={definition}
          worksheet={PREVIEW_WORKSHEET}
        />
      </div>
    </div>
  )
}
