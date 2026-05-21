import { NextResponse } from 'next/server'
import { exportToPDF, exportToPNG } from '@/lib/export'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { id, format } = await request.json()

  if (
    typeof id !== 'string' ||
    id.trim() === '' ||
    (format !== 'pdf' && format !== 'png')
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const outputPath =
      format === 'pdf' ? await exportToPDF(id) : await exportToPNG(id)

    return NextResponse.json({ success: true, path: outputPath })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
