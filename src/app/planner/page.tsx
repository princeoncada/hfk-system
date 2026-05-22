import { redirect } from 'next/navigation'

export default function PlannerPage() {
  const month = new Date().toISOString().slice(0, 7)
  redirect(`/planner/${month}`)
}
