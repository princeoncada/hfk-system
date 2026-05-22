import { NextResponse } from 'next/server'
import { z, ZodError } from 'zod'
import type {
  WorksheetDraft,
  WorksheetDraftRequest,
  WorksheetDraftResponse,
} from '@/lib/ai.types'
import { generate } from '@/lib/deepseek'
import {
  ActivitySchema,
  GradeSchema,
  SubjectSchema,
  VocabularyEntrySchema,
  WorksheetSchema,
} from '@/lib/schema'
import { retrieveWorksheetContext } from '@/lib/vault.rag'

const WorksheetDraftRequestSchema = z.object({
  topic: z.string().min(1),
  grade: GradeSchema,
  subject: SubjectSchema,
  template: z.string().min(1),
  objective: z.string().optional(),
})

const WorksheetDraftSchema = WorksheetSchema.pick({
  subtitle: true,
  vocabulary: true,
  activities: true,
  parentNotes: true,
}).extend({
  vocabulary: z.array(VocabularyEntrySchema),
  activities: z.array(ActivitySchema),
  parentNotes: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = WorksheetDraftRequestSchema.parse(body) as WorksheetDraftRequest
    const { contextBlock, provenance } = await retrieveWorksheetContext(
      input.topic,
      input.grade,
      input.subject,
    )

    const systemPrompt = `You are an expert educational content writer for Homeschooling for Kiddos (HFK).
HFK creates warm, playful, parent-friendly worksheets for homeschool families
teaching Grades 1-6.

${contextBlock}

TASK: Generate a complete worksheet draft as a JSON object.
The JSON must have exactly these fields:
  subtitle    (string, optional - a short descriptive subtitle)
  vocabulary  (array of {word, definition} - 4 to 6 entries appropriate for
               Grade ${input.grade} ${input.subject})
  activities  (array of 2 activities, each with:
                 type: one of fill-in-the-blank | matching | multiple-choice |
                       short-answer | drawing
                 instruction: clear instruction string
                 items: array of strings (the activity items/questions)
                 answers: array of answer strings (optional))
  parentNotes (string - a short note to parents about this worksheet,
               1-2 sentences)

Keep vocabulary definitions simple and appropriate for Grade ${input.grade}.
Keep activities hands-on and engaging.
Return ONLY valid JSON with no extra text.`

    const userMessage = `Generate a worksheet for the following:
Topic: ${input.topic}
Grade: ${input.grade}
Subject: ${input.subject}
Template: ${input.template}
${input.objective ? `Objective: ${input.objective}` : ''}`

    const rawDraft = await generate({
      systemPrompt,
      userMessage,
      temperature: 0.7,
      maxTokens: 1500,
    })
    const draft = WorksheetDraftSchema.parse(JSON.parse(rawDraft)) as WorksheetDraft
    const response: WorksheetDraftResponse = { draft, provenance }

    return NextResponse.json(response)
  } catch (error) {
    if (error instanceof ZodError || error instanceof SyntaxError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
