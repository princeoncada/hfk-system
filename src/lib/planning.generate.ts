import { generate } from './deepseek'
import { retrievePlanningContext } from './planning.rag'
import { savePlan } from './planning.store'
import type {
  MonthlyPlan,
  PlanDay,
  PlanRequest,
  PlanResponse,
} from './planning.types'
import type { Grade, Subject } from './types'

const DEFAULT_SUBJECT_ROTATION: Subject[] = [
  'math',
  'science',
  'reading',
  'bible',
  'values',
]
const DEFAULT_GRADE_ROTATION: Grade[] = [1, 2, 3, 4, 5, 6]

const SUBJECT_LABELS: Record<Subject, string> = {
  math: 'Math',
  science: 'Science',
  reading: 'Reading',
  vocabulary: 'Reading/Vocabulary',
  bible: 'Bible/Values',
  values: 'Bible/Values',
}

function getDaysInMonth(month: string): string[] {
  const [yearText, monthText] = month.split('-')
  const year = Number(yearText)
  const monthNumber = Number(monthText)
  const daysInMonth = new Date(year, monthNumber, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = String(index + 1).padStart(2, '0')
    return `${month}-${day}`
  })
}

function hasRequiredDayFields(value: unknown): value is PlanDay {
  if (!value || typeof value !== 'object') return false

  const day = value as Partial<PlanDay>
  return Boolean(day.date && day.topic && day.grade && day.subject)
}

export async function generateMonthlyPlan(
  request: PlanRequest,
): Promise<PlanResponse> {
  const { month, subjectRotation, gradeRotation } = request
  const subjects = subjectRotation ?? DEFAULT_SUBJECT_ROTATION
  const grades = gradeRotation ?? DEFAULT_GRADE_ROTATION
  const dates = getDaysInMonth(month)
  const { contextBlock, provenance } = await retrievePlanningContext(month)
  const subjectLabels = subjects.map((subject) => SUBJECT_LABELS[subject])

  const systemPrompt = `You are a content planning assistant for HFK (Homeschooling for Kiddos),
a Facebook educational page for homeschool families teaching Grades 1-6 in
Math, Science, Reading/Vocabulary, and Bible/Values.

Generate a full monthly content plan. Return a JSON object with a single
key "days" containing an array of day objects.

Each day object must have:
- date: string (YYYY-MM-DD)
- topic: string (specific, age-appropriate topic name)
- grade: number (one of: 1, 2, 3, 4, 5, 6)
- subject: string (one of: "math", "science", "reading", "vocabulary", "bible", "values")
- objective: string (one sentence learning objective)
- confidence: number (0.0-1.0, lower if near a duplicate, higher if fresh)
- duplicateRisk: boolean (true if this topic was recently covered)
- notes: string (optional - add if the day has special context)

Requirements:
- Rotate through subjects evenly in this preferred order: ${subjectLabels.join(', ')}
- Rotate through grades evenly in this preferred order: ${grades.join(', ')}
- Never repeat a topic that appears in the RECENTLY COVERED TOPICS section
- Flag duplicateRisk: true for any topic similar to HIGH DUPLICATE RISK TOPICS
- Plan all ${dates.length} days of the month

${contextBlock}`

  const userMessage = `Generate the complete content plan for ${month}. Plan these exact dates:
${dates.join(', ')}`

  const raw = await generate({
    systemPrompt,
    userMessage,
    temperature: 0.8,
    maxTokens: 4000,
  })
  const parsed = JSON.parse(raw) as { days: unknown[] }
  if (!Array.isArray(parsed.days)) {
    throw new Error('Planning response missing days array')
  }

  const validatedDays = parsed.days.filter(hasRequiredDayFields) as PlanDay[]
  const plan: MonthlyPlan = {
    id: month,
    month,
    days: validatedDays,
    generatedAt: new Date().toISOString(),
    provenance,
  }

  savePlan(plan)
  return { plan, provenance }
}
