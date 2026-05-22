import { NextResponse } from 'next/server'
import { generateMonthlyPlan } from '@/lib/planning.generate'
import type { PlanRequest } from '@/lib/planning.types'

const MONTH_PATTERN = /^\d{4}-\d{2}$/

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PlanRequest

    if (!body.month || !MONTH_PATTERN.test(body.month)) {
      return NextResponse.json(
        { error: 'month must use YYYY-MM format' },
        { status: 400 },
      )
    }

    const result = await generateMonthlyPlan(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
