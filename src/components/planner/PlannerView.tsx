'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { MonthlyPlan, PlanDay } from '@/lib/planning.types'
import type { Subject } from '@/lib/types'

const SUBJECT_COLORS: Record<string, string> = {
  math: 'bg-blue-100 text-blue-700',
  science: 'bg-green-100 text-green-700',
  reading: 'bg-purple-100 text-purple-700',
  vocabulary: 'bg-purple-100 text-purple-700',
  bible: 'bg-amber-100 text-amber-700',
  values: 'bg-amber-100 text-amber-700',
}

const SUBJECT_LABELS: Record<Subject, string> = {
  math: 'Math',
  science: 'Science',
  reading: 'Reading',
  vocabulary: 'Vocab',
  bible: 'Bible',
  values: 'Values',
}

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getCalendarWeeks(month: string): Array<Array<string | null>> {
  const [year, monthNumber] = month.split('-').map(Number)
  const firstDay = new Date(year, monthNumber - 1, 1)
  const daysInMonth = new Date(year, monthNumber, 0).getDate()
  const firstDow = firstDay.getDay()
  const days: Array<string | null> = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = String(index + 1).padStart(2, '0')
      return `${month}-${day}`
    }),
  ]

  while (days.length % 7 !== 0) {
    days.push(null)
  }

  const weeks: Array<Array<string | null>> = []
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7))
  }
  return weeks
}

function confidenceColor(confidence: number): string {
  if (confidence >= 0.8) return 'bg-sage-green'
  if (confidence >= 0.6) return 'bg-soft-yellow'
  return 'bg-red-200'
}

function confidenceLabel(confidence: number): string {
  return `${Math.round(confidence * 100)}%`
}

function subjectLabel(subject: PlanDay['subject']): string {
  return SUBJECT_LABELS[subject] ?? subject
}

interface PlannerViewProps {
  month: string
  plan: MonthlyPlan | null
  monthLabel: string
}

export default function PlannerView({
  month,
  plan,
  monthLabel,
}: PlannerViewProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [locking, setLocking] = useState<string | null>(null)

  const today = new Date().toISOString().slice(0, 10)
  const weeks = getCalendarWeeks(month)
  const dayMap = new Map(plan?.days.map((day) => [day.date, day]) ?? [])
  const selectedDay = selectedDate ? (dayMap.get(selectedDate) ?? null) : null

  async function handleGenerate() {
    if (generating) return
    if (plan) {
      const confirmed = window.confirm(
        `Regenerate plan for ${monthLabel}? Locked days will be preserved in display but the API will overwrite all days. Continue?`,
      )
      if (!confirmed) return
    }

    setGenerating(true)
    try {
      await fetch('/api/planning/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month }),
      })
      router.refresh()
    } finally {
      setGenerating(false)
    }
  }

  async function handleLockToggle(date: string) {
    setLocking(date)
    try {
      await fetch(`/api/planning/${month}/lock/${date}`, { method: 'POST' })
      router.refresh()
    } finally {
      setLocking(null)
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-warm-brown/60">
          {plan ? `${plan.days.length} days planned` : 'No plan generated yet.'}
        </p>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="rounded bg-sage-green/80 px-4 py-1.5 text-sm text-white hover:bg-sage-green disabled:opacity-50"
        >
          {generating ? 'Generating...' : plan ? 'Regenerate' : 'Generate Plan'}
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAY_HEADERS.map((header) => (
          <div
            key={header}
            className="py-1 text-center text-xs font-medium text-warm-brown/40"
          >
            {header}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((date, index) => {
          if (!date) return <div key={index} className="min-h-[90px]" />

          const day = dayMap.get(date)
          const isToday = date === today
          const isSelected = date === selectedDate

          return (
            <div
              key={date}
              onClick={() => setSelectedDate(date === selectedDate ? null : date)}
              className={[
                'min-h-[90px] cursor-pointer rounded-lg border p-2 transition-colors',
                isSelected
                  ? 'border-sage-green bg-sage-green/5'
                  : day?.duplicateRisk
                    ? 'border-amber-300 hover:bg-amber-50/50'
                    : 'border-warm-brown/20 hover:bg-warm-brown/5',
                isToday ? 'ring-2 ring-sage-green ring-offset-1' : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-1">
                {day?.locked ? (
                  <span className="rounded-full bg-warm-brown/10 px-1.5 py-0.5 text-[10px] text-warm-brown/50">
                    locked
                  </span>
                ) : (
                  <span />
                )}
                <span className="text-xs text-warm-brown/40">
                  {date.slice(-2).replace(/^0/, '')}
                </span>
              </div>

              {day ? (
                <>
                  <span
                    className={`mt-1 inline-flex rounded-full px-1.5 py-0.5 text-xs ${
                      SUBJECT_COLORS[day.subject] ?? 'bg-warm-brown/10 text-warm-brown/60'
                    }`}
                  >
                    {subjectLabel(day.subject)}
                  </span>
                  <p className="mt-1 line-clamp-2 text-xs font-medium leading-tight text-warm-brown">
                    {day.topic}
                  </p>
                  <p className="text-xs text-warm-brown/40">Grade {day.grade}</p>
                  <div className="mt-1 h-1 w-full rounded-full bg-warm-brown/10">
                    <div
                      className={`h-1 rounded-full ${confidenceColor(
                        day.confidence,
                      )}`}
                      style={{ width: `${Math.round(day.confidence * 100)}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="mt-2 text-center text-xs text-warm-brown/20">—</p>
              )}
            </div>
          )
        })}
      </div>

      {selectedDay ? (
        <div className="mt-6 rounded-lg border border-warm-brown/20 p-5">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="mb-0.5 text-xs text-warm-brown/40">
                {selectedDay.date}
              </p>
              <h2 className="font-display text-xl font-semibold">
                {selectedDay.topic}
              </h2>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-sm text-warm-brown/40 hover:text-warm-brown"
            >
              ✕
            </button>
          </div>

          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-warm-brown/50">Grade</dt>
              <dd>Grade {selectedDay.grade}</dd>
            </div>
            <div>
              <dt className="text-warm-brown/50">Subject</dt>
              <dd>{subjectLabel(selectedDay.subject)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-warm-brown/50">Objective</dt>
              <dd>{selectedDay.objective ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-warm-brown/50">Confidence</dt>
              <dd className="mt-1 flex items-center gap-2">
                <span>{confidenceLabel(selectedDay.confidence)}</span>
                <span
                  className={`h-2 w-10 rounded-full ${confidenceColor(
                    selectedDay.confidence,
                  )}`}
                />
              </dd>
            </div>
            <div>
              <dt className="text-warm-brown/50">Duplicate Risk</dt>
              <dd
                className={
                  selectedDay.duplicateRisk ? 'text-amber-600' : undefined
                }
              >
                {selectedDay.duplicateRisk
                  ? 'Yes — topic recently covered'
                  : 'No'}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-warm-brown/50">Notes</dt>
              <dd>{selectedDay.notes || '—'}</dd>
            </div>
          </dl>

          <button
            onClick={() => void handleLockToggle(selectedDay.date)}
            disabled={locking === selectedDay.date}
            className="mt-4 flex items-center gap-1.5 text-sm text-warm-brown/60 hover:text-warm-brown disabled:opacity-40"
          >
            {selectedDay.locked
              ? 'Locked — click to unlock'
              : 'Unlocked — click to lock'}
          </button>
        </div>
      ) : null}
    </>
  )
}
