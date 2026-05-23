import type {
  Activity,
  Grade,
  Subject,
  VocabularyEntry,
  WorksheetContent,
} from '@/lib/types'

export type BlockType = 'header' | 'vocabulary' | 'activity' | 'parentNotes' | 'footer'

export interface HeaderBlock {
  id: 'header'
  type: 'header'
  locked: true
  data: {
    title: string
    subtitle?: string
    grade: Grade
    subject: Subject
    template: string
  }
}

export interface VocabularyBlock {
  id: 'vocabulary'
  type: 'vocabulary'
  data: {
    entries: VocabularyEntry[]
  }
}

export interface ActivityBlock {
  id: string
  type: 'activity'
  data: Activity
}

export interface ParentNotesBlock {
  id: 'parentNotes'
  type: 'parentNotes'
  data: {
    text: string
  }
}

export interface FooterBlock {
  id: 'footer'
  type: 'footer'
  locked: true
  data: {
    footerText: string
  }
}

export type WorksheetBlock =
  | HeaderBlock
  | VocabularyBlock
  | ActivityBlock
  | ParentNotesBlock
  | FooterBlock

type SectionName = NonNullable<WorksheetContent['sectionOrder']>[number]

const defaultOrder: SectionName[] = ['vocabulary', 'activities', 'parentNotes']

function getSectionOrder(ws: Partial<WorksheetContent>): SectionName[] {
  const source = ws.sectionOrder?.length ? ws.sectionOrder : defaultOrder
  return source.filter((section, index, all) => all.indexOf(section) === index)
}

export function worksheetToBlocks(ws: Partial<WorksheetContent>): WorksheetBlock[] {
  const blocks: WorksheetBlock[] = [
    {
      id: 'header',
      type: 'header',
      locked: true,
      data: {
        title: ws.title ?? 'Untitled Worksheet',
        subtitle: ws.subtitle ?? '',
        grade: ws.grade ?? 1,
        subject: ws.subject ?? 'math',
        template: ws.template ?? 'cozy_v1',
      },
    },
  ]

  for (const section of getSectionOrder(ws)) {
    if (section === 'vocabulary') {
      blocks.push({
        id: 'vocabulary',
        type: 'vocabulary',
        data: { entries: ws.vocabulary ?? [] },
      })
    }

    if (section === 'activities') {
      ;(ws.activities ?? []).forEach((activity, index) => {
        blocks.push({
          id: `activity-${index}`,
          type: 'activity',
          data: activity,
        })
      })
    }

    if (section === 'parentNotes') {
      blocks.push({
        id: 'parentNotes',
        type: 'parentNotes',
        data: { text: ws.parentNotes ?? '' },
      })
    }
  }

  blocks.push({
    id: 'footer',
    type: 'footer',
    locked: true,
    data: {
      footerText: ws.footerText ?? '',
    },
  })

  return blocks
}

export function blocksToWorksheet(
  blocks: WorksheetBlock[],
  original: Partial<WorksheetContent>,
): WorksheetContent {
  const header = blocks.find((block): block is HeaderBlock => block.type === 'header')
  const footer = blocks.find((block): block is FooterBlock => block.type === 'footer')
  const middleBlocks = blocks.filter((block) => block.type !== 'header' && block.type !== 'footer')
  const vocabularyBlock = middleBlocks.find(
    (block): block is VocabularyBlock => block.type === 'vocabulary',
  )
  const parentNotesBlock = middleBlocks.find(
    (block): block is ParentNotesBlock => block.type === 'parentNotes',
  )
  const sectionOrder = middleBlocks.reduce<SectionName[]>((order, block) => {
    const section: SectionName =
      block.type === 'activity' ? 'activities' : block.type
    return order.includes(section) ? order : [...order, section]
  }, [])

  return {
    ...(original as WorksheetContent),
    id: original.id ?? '',
    title: header?.data.title ?? original.title ?? 'Untitled Worksheet',
    subtitle: header?.data.subtitle ?? original.subtitle,
    grade: header?.data.grade ?? original.grade ?? 1,
    subject: header?.data.subject ?? original.subject ?? 'math',
    template: header?.data.template ?? original.template ?? 'cozy_v1',
    sectionOrder,
    vocabulary: vocabularyBlock?.data.entries ?? [],
    activities: middleBlocks
      .filter((block): block is ActivityBlock => block.type === 'activity')
      .map((block) => block.data),
    parentNotes: parentNotesBlock?.data.text ?? '',
    footerText: footer?.data.footerText ?? original.footerText ?? '',
    createdAt: original.createdAt ?? new Date().toISOString(),
    status: original.status ?? 'draft',
    updatedAt: new Date().toISOString(),
  } as WorksheetContent & { updatedAt: string }
}
