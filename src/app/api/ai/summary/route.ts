import { NextResponse } from 'next/server'
import { z, ZodError } from 'zod'
import type {
  DailySummaryRequest,
  DailySummaryResponse,
} from '@/lib/ai.types'
import { generate } from '@/lib/deepseek'

const DailySummaryRequestSchema = z.object({
  date: z.string().min(1),
  pendingApprovals: z.number().int().min(0),
  recentWorksheets: z.array(z.string()),
})

const DailySummaryResponseSchema = z.object({
  headline: z.string().min(1),
  summary: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = DailySummaryRequestSchema.parse(body) as DailySummaryRequest

    const systemPrompt = `You are an AI assistant for the HFK Publishing Engine, a content
operations system for Homeschooling for Kiddos. You write concise,
direct operational summaries for the operator's daily dashboard.

TASK: Write a daily status summary as a JSON object with:
  headline  (string - one sentence, max 100 characters, plain English,
             no jargon. Example: "3 packages waiting - Vault healthy.")
  summary   (string - 1-2 sentences expanding on the headline.
             Factual and direct.)

Return ONLY valid JSON with no extra text.`

    const userMessage = `Date: ${input.date}
Pending approvals: ${input.pendingApprovals}
Recent worksheets: ${input.recentWorksheets.join(', ') || 'none'}
Generate the daily summary.`

    const rawSummary = await generate({
      systemPrompt,
      userMessage,
      temperature: 0.3,
      maxTokens: 300,
    })
    const response = DailySummaryResponseSchema.parse(
      JSON.parse(rawSummary),
    ) as DailySummaryResponse

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
