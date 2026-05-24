import { NextResponse } from 'next/server'
import { saveTemplate } from '@/lib/template.store'
import { validateTemplateDefinition } from '@/lib/template.types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const definition = validateTemplateDefinition(body)
    saveTemplate(definition)
    return NextResponse.json({ ok: true, id: definition.id })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    )
  }
}
