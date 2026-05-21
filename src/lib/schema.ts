import { z } from 'zod'
import type { WorksheetContent } from './types'

export const SubjectSchema = z.enum([
  'math',
  'science',
  'reading',
  'vocabulary',
  'bible',
  'values',
])

export const GradeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
])

export const ContentStatusSchema = z.enum([
  'draft',
  'ready',
  'exported',
  'archived',
])

export const VocabularyEntrySchema = z.object({
  word: z.string().min(1),
  definition: z.string().min(1),
})

export const ActivityTypeSchema = z.enum([
  'fill-in-the-blank',
  'matching',
  'multiple-choice',
  'short-answer',
  'drawing',
])

export const ActivitySchema = z.object({
  type: ActivityTypeSchema,
  instruction: z.string().min(1),
  items: z.array(z.string()),
  answers: z.array(z.string()).optional(),
})

export const WorksheetSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  grade: GradeSchema,
  subject: SubjectSchema,
  template: z.string().min(1),
  vocabulary: z.array(VocabularyEntrySchema).optional(),
  activities: z.array(ActivitySchema).optional(),
  parentNotes: z.string().optional(),
  footerText: z.string().optional(),
  references: z.array(z.string()).optional(),
  createdAt: z.string().min(1),
  status: ContentStatusSchema,
})

export function validateWorksheet(data: unknown): WorksheetContent {
  return WorksheetSchema.parse(data) as WorksheetContent
}

export function isValidWorksheet(data: unknown): boolean {
  return WorksheetSchema.safeParse(data).success
}
