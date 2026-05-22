import { NextResponse } from 'next/server'
import { getPlan } from '@/lib/planning.store'

const MONTH_PATTERN = /^\d{4}-\d{2}$/

export async function GET(
  _request: Request,
  { params }: { params: { month: string } },
) {
  try {
    if (!MONTH_PATTERN.test(params.month)) {
      return NextResponse.json(
        { error: 'month must use YYYY-MM format' },
        { status: 400 },
      )
    }

    const plan = getPlan(params.month)
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    return NextResponse.json(plan)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
