import { NextResponse } from 'next/server'
import { z } from 'zod'
import { queryBestTemplate } from '@/lib/template.chroma'

const RequestSchema = z.object({
  grade: z.string().min(1),
  subject: z.string().min(1),
  topic: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { grade, subject, topic } = RequestSchema.parse(body)
    const templateId = await queryBestTemplate(grade, subject, topic)
    return NextResponse.json({ templateId })
  } catch {
    return NextResponse.json({ templateId: null })
  }
}
