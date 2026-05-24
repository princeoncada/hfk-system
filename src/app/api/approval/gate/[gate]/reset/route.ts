import { NextResponse } from 'next/server'
import { getPackage, savePackage } from '@/lib/approval.store'
import type { GateName } from '@/lib/approval.types'

export async function POST(
  _request: Request,
  { params }: { params: { gate: string } },
) {
  try {
    const pkg = getPackage()
    const gate = params.gate as GateName
    pkg.gates[gate] = { name: gate, status: 'pending', payload: null }
    pkg.updatedAt = new Date().toISOString()
    savePackage(pkg)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
