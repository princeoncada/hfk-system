import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getPlan, savePlan } from '@/lib/planning.store'

const RequestSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  topic: z.string().min(1),
  objective: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { date, topic, objective } = RequestSchema.parse(body)
    const month = date.slice(0, 7)
    const plan = getPlan(month)
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found for this month' }, { status: 404 })
    }
    const dayIndex = plan.days.findIndex((d) => d.date === date)
    if (dayIndex === -1) {
      return NextResponse.json({ error: 'Day not found in plan' }, { status: 404 })
    }
    plan.days[dayIndex] = {
      ...plan.days[dayIndex],
      topic,
      ...(objective !== undefined ? { objective } : {}),
    }
    savePlan(plan)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
