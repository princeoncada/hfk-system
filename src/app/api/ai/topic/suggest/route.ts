import { NextResponse } from 'next/server'
import { z } from 'zod'
import { generate } from '@/lib/deepseek'
import { GradeSchema, SubjectSchema } from '@/lib/schema'

const RequestSchema = z.object({
  grade: GradeSchema,
  subject: SubjectSchema,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { grade, subject } = RequestSchema.parse(body)
    const raw = await generate({
      systemPrompt: `You are an educational content planner for Homeschooling for Kiddos (HFK), creating content for homeschool families teaching Grades 1–6. Return ONLY valid JSON with no extra text.`,
      userMessage: `Suggest a fresh, specific educational topic for Grade ${grade} ${subject}.
Return a JSON object with exactly two fields:
- topic: a specific, engaging lesson topic (3–8 words, age-appropriate for Grade ${grade})
- objective: a one-sentence learning objective starting with "Students will…"

Return ONLY the JSON object.`,
      temperature: 0.85,
      maxTokens: 150,
    })
    const parsed = JSON.parse(raw) as { topic: string; objective?: string }
    return NextResponse.json({
      topic: parsed.topic ?? '',
      objective: parsed.objective ?? '',
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
