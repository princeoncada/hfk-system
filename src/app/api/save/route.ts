import { NextResponse } from 'next/server'
import { saveWorksheet } from '@/lib/save'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const id = saveWorksheet(body)
    return NextResponse.json({ success: true, id })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
