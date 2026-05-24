import { NextResponse } from 'next/server'
import { z } from 'zod'
import { incrementTemplateReuseScore } from '@/lib/template.chroma'

const RequestSchema = z.object({
  templateId: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { templateId } = RequestSchema.parse(body)
    await incrementTemplateReuseScore(templateId)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
