import { NextResponse } from 'next/server'
import { deleteWorksheet } from '@/lib/save'

export const dynamic = 'force-dynamic'

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    deleteWorksheet(params.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
