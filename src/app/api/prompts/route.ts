import { NextResponse } from 'next/server'
import { listPrompts } from '@/lib/prompt.assemble'

export async function GET() {
  try {
    const prompts = await listPrompts()
    return NextResponse.json({ prompts })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
