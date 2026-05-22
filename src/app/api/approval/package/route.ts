import { NextResponse } from 'next/server'
import { getPackage } from '@/lib/approval.store'

export async function GET() {
  try {
    const pkg = getPackage()
    return NextResponse.json(pkg)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
