import { z } from 'zod'

export interface TemplatePalette {
  background: string
  surface: string
  primary: string
  secondary: string
  text: string
  textMuted: string
  border: string
  highlight: string
}

export type SlotType = 'header' | 'vocabulary' | 'activity' | 'parent-notes' | 'footer'

export interface TemplateSlotStyle {
  background?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: string
  padding?: string
  color?: string
}

export interface TemplateSlot {
  id: string
  type: SlotType
  style?: TemplateSlotStyle
}

export interface TemplateDefinition {
  id: string
  name: string
  description: string
  version: string
  palette: TemplatePalette
  avatar?: string
  slots: TemplateSlot[]
  footerText?: string
  subjectAffinity?: string[]
  gradeAffinity?: string[]
  reuseScore?: number
}

const TemplatePaletteSchema = z.object({
  background: z.string(),
  surface: z.string(),
  primary: z.string(),
  secondary: z.string(),
  text: z.string(),
  textMuted: z.string(),
  border: z.string(),
  highlight: z.string(),
})

const TemplateSlotStyleSchema = z.object({
  background: z.string().optional(),
  borderColor: z.string().optional(),
  borderWidth: z.string().optional(),
  borderRadius: z.string().optional(),
  padding: z.string().optional(),
  color: z.string().optional(),
}).optional()

const TemplateSlotSchema = z.object({
  id: z.string(),
  type: z.enum(['header', 'vocabulary', 'activity', 'parent-notes', 'footer']),
  style: TemplateSlotStyleSchema,
})

export const TemplateDefinitionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  version: z.string(),
  palette: TemplatePaletteSchema,
  avatar: z.string().optional(),
  slots: z.array(TemplateSlotSchema).min(1),
  footerText: z.string().optional(),
  subjectAffinity: z.array(z.string()).optional(),
  gradeAffinity: z.array(z.string()).optional(),
  reuseScore: z.number().int().min(0).optional(),
})

export function validateTemplateDefinition(data: unknown): TemplateDefinition {
  return TemplateDefinitionSchema.parse(data) as TemplateDefinition
}
