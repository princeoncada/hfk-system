import { NextResponse } from 'next/server'
import { getPlan, savePlan } from '@/lib/planning.store'

export async function POST(
  _request: Request,
  { params }: { params: { month: string; date: string } },
) {
  try {
    const { month, date } = params
    const plan = getPlan(month)
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    const day = plan.days.find((planDay) => planDay.date === date)
    if (!day) {
      return NextResponse.json(
        { error: 'Day not found in plan' },
        { status: 404 },
      )
    }

    day.locked = !day.locked
    savePlan(plan)
    return NextResponse.json(day)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
