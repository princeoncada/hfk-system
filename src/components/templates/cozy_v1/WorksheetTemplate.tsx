'use client'

import type { WorksheetContent, Activity } from '@/lib/types'

export interface WorksheetTemplateProps {
  worksheet: WorksheetContent
}

const activityLabels: Record<Activity['type'], string> = {
  'fill-in-the-blank': 'Fill in the Blank',
  matching: 'Matching',
  'multiple-choice': 'Multiple Choice',
  'short-answer': 'Short Answer',
  drawing: 'Drawing',
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function renderActivityItems(activity: Activity) {
  switch (activity.type) {
    case 'fill-in-the-blank':
      return (
        <ol className="list-decimal space-y-3 pl-6 leading-9 text-warm-brown/90">
          {activity.items.map((item, index) => (
            <li key={`${activity.type}-${index}`}>{item}</li>
          ))}
        </ol>
      )

    case 'matching':
      return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <div className="space-y-3">
            {activity.items.map((item, index) => (
              <div key={`${activity.type}-item-${index}`} className="text-warm-brown/90">
                {index + 1}. {item}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {activity.items.map((_, index) => (
              <div
                key={`${activity.type}-blank-${index}`}
                className="h-6 w-full border-b border-warm-brown/30"
              />
            ))}
          </div>
        </div>
      )

    case 'multiple-choice':
      return (
        <div className="space-y-2">
          {activity.items.map((item, index) => (
            <div key={`${activity.type}-${index}`} className="text-warm-brown/90">
              <span className="mr-2 inline-block h-4 w-4 rounded-full border border-warm-brown/40 align-[-2px]" />
              {item}
            </div>
          ))}
        </div>
      )

    case 'short-answer':
      return (
        <div>
          {activity.items.map((item, index) => (
            <div key={`${activity.type}-${index}`} className="mb-4 text-warm-brown/90">
              <p>{item}</p>
              <span className="mt-1 block h-7 w-full border-b border-warm-brown/25" />
              <span className="mt-1 block h-7 w-full border-b border-warm-brown/25" />
              <span className="mt-1 block h-7 w-full border-b border-warm-brown/25" />
            </div>
          ))}
        </div>
      )

    case 'drawing':
      return (
        <div className="mt-2 h-48 w-full rounded border-2 border-warm-brown/20 bg-warm-brown/5" />
      )

    default:
      return null
  }
}

export function WorksheetTemplate({ worksheet }: WorksheetTemplateProps) {
  return (
    <div className="worksheet mx-auto flex min-h-[1056px] max-w-[816px] flex-col gap-6 bg-cream p-8 font-body text-warm-brown">
      <header className="grid grid-cols-[48px_1fr_auto] items-start gap-4 border-b border-warm-brown pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded border border-warm-brown/30 text-xs text-warm-brown/50">
          [HFK]
        </div>
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold text-warm-brown">
            {worksheet.title}
          </h1>
          {worksheet.subtitle ? (
            <p className="mt-1 text-sm text-warm-brown/60">{worksheet.subtitle}</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-soft-yellow px-2 py-0.5 text-xs text-warm-brown">
            Grade {worksheet.grade}
          </span>
          <span className="rounded-full bg-sage-green/20 px-2 py-0.5 text-xs text-warm-brown">
            {capitalize(worksheet.subject)}
          </span>
        </div>
      </header>

      {worksheet.vocabulary && worksheet.vocabulary.length > 0 ? (
        <section>
          <h2 className="mb-3 border-b border-warm-brown/20 pb-1 font-display text-lg font-semibold text-warm-brown">
            Vocabulary
          </h2>
          <div>
            {worksheet.vocabulary.map((entry) => (
              <div
                key={entry.word}
                className="vocab-row flex gap-4 border-b border-warm-brown/10 py-2"
              >
                <div className="min-w-[120px] font-semibold text-warm-brown">
                  {entry.word}
                </div>
                <div className="text-warm-brown/80">{entry.definition}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {worksheet.activities && worksheet.activities.length > 0 ? (
        <section className="space-y-5">
          {worksheet.activities.map((activity, index) => (
            <div key={`${activity.type}-${index}`} className="activity-block">
              <h2 className="font-display text-lg font-semibold text-warm-brown">
                Activity {index + 1}: {activityLabels[activity.type]}
              </h2>
              <p className="mb-2 italic text-warm-brown/80">{activity.instruction}</p>
              {renderActivityItems(activity)}
            </div>
          ))}
        </section>
      ) : null}

      {worksheet.parentNotes ? (
        <section className="rounded-lg border border-soft-yellow bg-soft-yellow/30 p-4">
          <h2 className="mb-1 font-display text-sm font-semibold text-warm-brown">
            Parent Notes
          </h2>
          <p className="text-sm text-warm-brown/80">{worksheet.parentNotes}</p>
        </section>
      ) : null}

      <footer className="mt-auto flex justify-between border-t border-warm-brown/20 pt-3">
        <div className="text-xs text-warm-brown/50">
          {worksheet.footerText || 'Homeschooling for Kiddos'}
        </div>
        <div className="text-xs text-warm-brown/30">HFK Publishing Engine</div>
      </footer>
    </div>
  )
}
