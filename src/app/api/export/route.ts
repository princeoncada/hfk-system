import { NextResponse } from 'next/server'
import { archiveExport } from '@/lib/archive'
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
    const archivePath = await archiveExport(id, format, outputPath)

    return NextResponse.json({ success: true, archivePath })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
