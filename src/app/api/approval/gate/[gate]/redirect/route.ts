import { NextResponse } from 'next/server'
import { redirectGate } from '@/lib/approval.actions'
import type { GateName, RedirectGateRequest } from '@/lib/approval.types'

const GATE_NAMES: GateName[] = [
  'direction',
  'worksheet',
  'template',
  'caption',
  'final',
]

function todayId(): string {
  return new Date().toISOString().slice(0, 10)
}

function isGateName(value: string): value is GateName {
  return GATE_NAMES.includes(value as GateName)
}

export async function POST(
  request: Request,
  { params }: { params: { gate: string } },
) {
  try {
    if (!isGateName(params.gate)) {
      return NextResponse.json({ error: 'Invalid gate' }, { status: 400 })
    }

    const body = (await request.json()) as RedirectGateRequest
    if (!body.note) {
      return NextResponse.json({ error: 'note is required' }, { status: 400 })
    }

    const url = new URL(request.url)
    const packageId = url.searchParams.get('date') ?? todayId()
    const result = await redirectGate(params.gate, packageId, body.note)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
