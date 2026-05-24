'use client'

import { Fragment } from 'react'
import type { WorksheetContent, Activity } from '@/lib/types'

export interface WorksheetTemplateProps {
  worksheet: WorksheetContent
}

const ACTIVITY_EMOJI: Record<Activity['type'], string> = {
  'fill-in-the-blank': '✏️',
  matching: '🔗',
  'multiple-choice': '🎯',
  'short-answer': '💬',
  drawing: '🎨',
}

const ACTIVITY_LABELS: Record<Activity['type'], string> = {
  'fill-in-the-blank': 'Fill in the Blank',
  matching: 'Matching',
  'multiple-choice': 'Multiple Choice',
  'short-answer': 'Short Answer',
  drawing: 'Drawing',
}

const SUBJECT_EMOJI: Record<string, string> = {
  math: '🔢',
  science: '🔬',
  reading: '📖',
  vocabulary: '📚',
  bible: '✝️',
  values: '⭐',
}

const ACTIVITY_COLORS = [
  { bg: 'bg-yellow-tint', border: 'border-yellow', badge: 'bg-yellow text-ink' },
  { bg: 'bg-rose-tint', border: 'border-rose', badge: 'bg-rose text-cream' },
  { bg: 'bg-sage-tint', border: 'border-sage', badge: 'bg-sage text-cream' },
  { bg: 'bg-play-sky-light', border: 'border-play-sky', badge: 'bg-play-sky text-cream' },
]

function capitalize(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1)
}

function renderActivityItems(activity: Activity) {
  switch (activity.type) {
    case 'fill-in-the-blank':
      return (
        <ol className="list-decimal space-y-3 pl-6 font-playful-body text-ink">
          {activity.items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ol>
      )
    case 'matching':
      return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="space-y-2">
            {activity.items.map((item, i) => (
              <div key={i} className="font-playful-body text-ink">{i + 1}. {item}</div>
            ))}
          </div>
          <div className="space-y-2">
            {activity.items.map((_, i) => (
              <div key={i} className="h-7 border-b-2 border-dashed border-ink-4" />
            ))}
          </div>
        </div>
      )
    case 'multiple-choice':
      return (
        <div className="space-y-2">
          {activity.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 font-playful-body text-ink">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink-3 text-xs font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              {item}
            </div>
          ))}
        </div>
      )
    case 'short-answer':
      return (
        <div className="space-y-4">
          {activity.items.map((item, i) => (
            <div key={i}>
              <p className="mb-1 font-playful-body text-ink">{item}</p>
              <div className="h-8 border-b-2 border-dashed border-ink-4" />
              <div className="h-8 border-b-2 border-dashed border-ink-4" />
            </div>
          ))}
        </div>
      )
    case 'drawing':
      return (
        <div className="mt-2 h-44 w-full rounded-xl border-2 border-dashed border-ink-4 bg-white" />
      )
    default:
      return null
  }
}

export function WorksheetTemplate({ worksheet }: WorksheetTemplateProps) {
  const isVocabSubject = worksheet.subject === 'reading' || worksheet.subject === 'vocabulary'
  const subjectEmoji = SUBJECT_EMOJI[worksheet.subject] ?? '📄'

  const sections = {
    vocabulary:
      worksheet.vocabulary && worksheet.vocabulary.length > 0 ? (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-rose px-3 py-1 text-sm font-bold text-cream font-playful-heading">
              📝 Vocabulary
            </span>
          </div>
          <div className="space-y-2">
            {worksheet.vocabulary.map((entry) => (
              <div
                key={entry.word}
                className="rounded-xl border-2 border-rose/20 bg-white px-4 py-3"
              >
                <div className="flex items-start gap-4">
                  <span className="min-w-[120px] font-bold text-rose font-playful-heading text-base">
                    {entry.word}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-ink-2 font-playful-body leading-relaxed">
                      {entry.definition}
                    </p>
                    {isVocabSubject ? (
                      <div className="mt-2 h-7 border-b-2 border-dashed border-rose/25" />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    activities:
      worksheet.activities && worksheet.activities.length > 0 ? (
        <section className="space-y-4">
          {worksheet.activities.map((activity, index) => {
            const colors = ACTIVITY_COLORS[index % ACTIVITY_COLORS.length]
            return (
              <div
                key={`${activity.type}-${index}`}
                className={`rounded-2xl border-2 p-5 ${colors.bg} ${colors.border}`}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold font-playful-heading ${colors.badge}`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-ink font-playful-heading">
                        {ACTIVITY_LABELS[activity.type]}
                      </p>
                      <p className="text-sm italic text-ink-2 font-playful-body">
                        {activity.instruction}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-2xl">{ACTIVITY_EMOJI[activity.type]}</span>
                </div>
                {renderActivityItems(activity)}
              </div>
            )
          })}
        </section>
      ) : null,
    parentNotes: worksheet.parentNotes ? (
      <section className="rounded-2xl border-2 border-yellow bg-yellow-tint p-4">
        <p className="mb-1 flex items-center gap-2 font-bold text-ink font-playful-heading">
          <span>📋</span> Parent Notes
        </p>
        <p className="text-sm text-ink-2 font-playful-body">{worksheet.parentNotes}</p>
      </section>
    ) : null,
  }

  const order = worksheet.sectionOrder ?? ['vocabulary', 'activities', 'parentNotes']

  return (
    <div className="worksheet mx-auto flex min-h-[1056px] max-w-[816px] flex-col gap-6 bg-white p-8 font-playful-body text-ink">
      <header className="rounded-2xl border-2 border-ink/10 bg-cream-deep p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-ink/10 bg-white text-4xl">
            {subjectEmoji}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-playful-heading text-2xl font-bold leading-tight text-ink">
              {worksheet.title}
            </h1>
            {worksheet.subtitle ? (
              <p className="mt-0.5 font-playful-body text-sm text-ink-3">{worksheet.subtitle}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="rounded-full bg-yellow px-3 py-1 text-xs font-bold text-ink font-playful-heading">
              Grade {worksheet.grade}
            </span>
            <span className="rounded-full bg-sage px-3 py-1 text-xs font-bold text-cream font-playful-heading">
              {capitalize(worksheet.subject)}
            </span>
          </div>
        </div>
      </header>

      {order.map((section) => (
        <Fragment key={section}>{sections[section]}</Fragment>
      ))}

      <footer className="mt-auto flex justify-between border-t-2 border-dashed border-ink/10 pt-3">
        <div className="font-playful-body text-xs text-ink-3">
          {worksheet.footerText || '🏠 Homeschooling for Kiddos'}
        </div>
        <div className="font-playful-body text-xs text-ink-4">HFK Publishing Engine</div>
      </footer>
    </div>
  )
}
