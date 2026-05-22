import { NextResponse } from 'next/server'
import { assemblePrompt } from '@/lib/prompt.assemble'
import type { PromptAssemblyRequest } from '@/lib/prompt.types'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PromptAssemblyRequest

    if (!body.topic || typeof body.topic !== 'string') {
      return NextResponse.json({ error: 'topic is required' }, { status: 400 })
    }

    if (!body.grade) {
      return NextResponse.json({ error: 'grade is required' }, { status: 400 })
    }

    if (!body.subject) {
      return NextResponse.json({ error: 'subject is required' }, { status: 400 })
    }

    const result = await assemblePrompt(body)
    return NextResponse.json(result)
  } catch (error) {
    const message = String(error)
    if (message.includes('No prompt found')) {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
