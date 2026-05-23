import { NextResponse } from 'next/server'
import { z, ZodError } from 'zod'
import type {
  CaptionDraftRequest,
  CaptionDraftResponse,
} from '@/lib/ai.types'
import { generate } from '@/lib/deepseek'
import { GradeSchema, SubjectSchema } from '@/lib/schema'
import { retrieveCaptionContext } from '@/lib/vault.rag'

const CaptionDraftRequestSchema = z.object({
  worksheetTitle: z.string().min(1),
  grade: GradeSchema,
  subject: SubjectSchema,
  topic: z.string().min(1),
  instruction: z.string().optional(),
})

const CaptionDraftSchema = z.object({
  caption: z.string().min(1),
  hashtags: z.array(z.string().min(1)),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = CaptionDraftRequestSchema.parse(body) as CaptionDraftRequest
    const { contextBlock, provenance } = await retrieveCaptionContext(
      input.subject,
      input.grade,
    )

    const systemPrompt = `You are a Facebook content writer for Homeschooling for Kiddos (HFK),
a warm and playful educational page for homeschool families.

${contextBlock}

TASK: Write a Facebook caption and hashtag list as a JSON object.
The JSON must have exactly these fields:
  caption   (string - engaging Facebook caption, 2-4 sentences,
             warm and parent-friendly tone, may include 1-2 emojis,
             ends with a call to action like "Save this for your lesson!")
  hashtags  (array of 5-8 hashtag strings without the # symbol)

Return ONLY valid JSON with no extra text.`

    const userMessage = `Write a Facebook caption for this worksheet:
Title: ${input.worksheetTitle}
Grade: ${input.grade}
Subject: ${input.subject}
Topic: ${input.topic}${input.instruction ? `\n\nAdditional instructions: ${input.instruction}` : ''}`

    const rawDraft = await generate({
      systemPrompt,
      userMessage,
      temperature: 0.7,
      maxTokens: 500,
    })
    const draft = CaptionDraftSchema.parse(JSON.parse(rawDraft))
    const response: CaptionDraftResponse = {
      caption: draft.caption,
      hashtags: draft.hashtags,
      provenance,
    }

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
