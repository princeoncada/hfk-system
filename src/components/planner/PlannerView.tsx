'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { MonthlyPlan, PlanDay } from '@/lib/planning.types'
import type { Subject } from '@/lib/types'

const SUBJECT_COLORS: Record<string, string> = {
  math: 'bg-blue-50 text-blue-600 border border-blue-100',
  science: 'bg-sage-tint text-sage-deep border border-sage/20',
  reading: 'bg-[#F3F0FF] text-[#5B4FCF] border border-[#C9C3F5]',
  vocabulary: 'bg-[#F3F0FF] text-[#5B4FCF] border border-[#C9C3F5]',
  bible: 'bg-yellow-tint text-[#7A5A11] border border-yellow/40',
  values: 'bg-yellow-tint text-[#7A5A11] border border-yellow/40',
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
  if (confidence >= 0.8) return 'bg-sage'
  if (confidence >= 0.6) return 'bg-yellow'
  return 'bg-rose'
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
        <p className="text-[13px] text-ink-3">
          {plan ? `${plan.days.length} days planned` : 'No plan generated yet.'}
        </p>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-ink text-cream rounded-[10px] px-4 py-2.5 text-sm font-medium font-sans hover:bg-[#1a120e] transition-colors disabled:opacity-40"
        >
          {generating ? 'Generating...' : plan ? 'Regenerate' : 'Generate Plan'}
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAY_HEADERS.map((header) => (
          <div
            key={header}
            className="py-1 text-center font-mono text-[10px] tracking-[0.1em] text-ink-3 uppercase"
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
                'bg-paper border border-[rgba(92,64,51,0.14)] rounded-[10px] p-2 cursor-pointer min-h-[90px] transition-colors hover:bg-cream-deep',
                isSelected ? '!bg-ink !border-ink text-cream hover:!bg-ink' : '',
                isToday && !isSelected ? 'ring-2 ring-sage ring-offset-1' : '',
                day?.duplicateRisk && !isSelected
                  ? 'border-rose/40 hover:bg-rose-tint/30'
                  : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-1">
                {day?.locked ? (
                  <span
                    className={
                      isSelected
                        ? 'bg-cream-deep/20 text-cream/50 rounded-full px-1.5 py-0.5 text-[9px]'
                        : 'bg-cream-deep text-ink-3 rounded-full px-1.5 py-0.5 text-[9px]'
                    }
                  >
                    locked
                  </span>
                ) : (
                  <span />
                )}
                <span
                  className={
                    isSelected
                      ? 'text-[12px] text-cream/60'
                      : 'text-[12px] text-ink-3'
                  }
                >
                  {date.slice(-2).replace(/^0/, '')}
                </span>
              </div>

              {day ? (
                <>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium font-sans inline-flex mt-1 ${
                      isSelected
                        ? 'bg-cream/10 text-cream/80 border border-cream/15'
                        : SUBJECT_COLORS[day.subject] ??
                          'bg-paper text-ink-2 border border-[rgba(92,64,51,0.14)]'
                    }`}
                  >
                    {subjectLabel(day.subject)}
                  </span>
                  <p
                    className={
                      isSelected
                        ? 'text-[11px] font-medium text-cream/90 leading-tight line-clamp-2 mt-0.5'
                        : 'text-[11px] font-medium text-ink leading-tight line-clamp-2 mt-0.5'
                    }
                  >
                    {day.topic}
                  </p>
                  <p
                    className={
                      isSelected
                        ? 'text-[10px] text-cream/50'
                        : 'text-[10px] text-ink-3'
                    }
                  >
                    Grade {day.grade}
                  </p>
                  <div className="h-1 rounded-full bg-[rgba(92,64,51,0.08)] mt-1">
                    <div
                      className={`h-1 rounded-full ${confidenceColor(
                        day.confidence,
                      )}`}
                      style={{ width: `${Math.round(day.confidence * 100)}%` }}
                    />
                  </div>
                </>
              ) : (
                <p
                  className={
                    isSelected
                      ? 'mt-2 text-center text-[11px] text-cream/50'
                      : 'mt-2 text-center text-[11px] text-ink-4'
                  }
                >
                  &mdash;
                </p>
              )}
            </div>
          )
        })}
      </div>

      {selectedDay ? (
        <div className="bg-paper border border-[rgba(92,64,51,0.14)] rounded-[14px] shadow-card px-6 py-5 mt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-ink-3 uppercase mb-0.5">
                {selectedDay.date}
              </p>
              <h2 className="font-display text-[26px] text-ink">
                {selectedDay.topic}
              </h2>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-ink-3 hover:text-ink text-[14px]"
            >
              &times;
            </button>
          </div>

          <dl className="grid grid-cols-1 gap-4 mt-4 text-[14px] sm:grid-cols-2">
            <div>
              <dt className="text-ink-3 text-[12px] font-medium mb-0.5">Grade</dt>
              <dd className="text-ink">Grade {selectedDay.grade}</dd>
            </div>
            <div>
              <dt className="text-ink-3 text-[12px] font-medium mb-0.5">Subject</dt>
              <dd className="text-ink">{subjectLabel(selectedDay.subject)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-ink-3 text-[12px] font-medium mb-0.5">
                Objective
              </dt>
              <dd className="text-ink">{selectedDay.objective ?? '-'}</dd>
            </div>
            <div>
              <dt className="text-ink-3 text-[12px] font-medium mb-0.5">
                Confidence
              </dt>
              <dd className="mt-1 flex items-center gap-2 text-ink">
                <span>{confidenceLabel(selectedDay.confidence)}</span>
                <span
                  className={`h-2 w-10 rounded-full ${confidenceColor(
                    selectedDay.confidence,
                  )}`}
                />
              </dd>
            </div>
            <div>
              <dt className="text-ink-3 text-[12px] font-medium mb-0.5">
                Duplicate Risk
              </dt>
              <dd className={selectedDay.duplicateRisk ? 'text-[#8C3D31]' : 'text-ink'}>
                {selectedDay.duplicateRisk ? 'Yes - topic recently covered' : 'No'}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-ink-3 text-[12px] font-medium mb-0.5">Notes</dt>
              <dd className="text-ink">{selectedDay.notes || '-'}</dd>
            </div>
          </dl>

          <button
            onClick={() => void handleLockToggle(selectedDay.date)}
            disabled={locking === selectedDay.date}
            className="mt-5 flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink transition-colors disabled:opacity-40"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 018 0v3" />
            </svg>
            {selectedDay.locked
              ? 'Locked - click to unlock'
              : 'Unlocked - click to lock'}
          </button>
        </div>
      ) : null}
    </>
  )
}
