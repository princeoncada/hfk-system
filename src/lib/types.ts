export type Subject =
  | 'math'
  | 'science'
  | 'reading'
  | 'vocabulary'
  | 'bible'
  | 'values'

export type Grade = 1 | 2 | 3 | 4 | 5 | 6

export type ContentStatus = 'draft' | 'ready' | 'exported' | 'archived'

export interface VocabularyEntry {
  word: string
  definition: string
}

export type ActivityType =
  | 'fill-in-the-blank'
  | 'matching'
  | 'multiple-choice'
  | 'short-answer'
  | 'drawing'

export interface Activity {
  type: ActivityType
  instruction: string
  items: string[]
  answers?: string[]
}

export interface WorksheetContent {
  id: string
  title: string
  subtitle?: string
  grade: Grade
  subject: Subject
  template: string
  sectionOrder?: Array<'vocabulary' | 'activities' | 'parentNotes'>
  vocabulary?: VocabularyEntry[]
  activities?: Activity[]
  parentNotes?: string
  footerText?: string
  references?: string[]
  createdAt: string
  status: ContentStatus
}

export interface FacebookPostContent {
  id: string
  title: string
  caption: string
  subject: Subject
  grade?: Grade
  template: string
  imageText?: string[]
  hashtags?: string[]
  createdAt: string
  status: 'draft' | 'ready' | 'posted' | 'archived'
}

export type ContentItem = WorksheetContent | FacebookPostContent
