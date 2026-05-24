'use client'

import { Fragment } from 'react'
import type { WorksheetContent, Activity } from '@/lib/types'
import type { TemplateDefinition, TemplatePalette, TemplateSlot } from '@/lib/template.types'

export interface DynamicWorksheetTemplateProps {
  definition: TemplateDefinition
  worksheet: WorksheetContent
}

const ACTIVITY_LABELS: Record<Activity['type'], string> = {
  'fill-in-the-blank': 'Fill in the Blank',
  matching: 'Matching',
  'multiple-choice': 'Multiple Choice',
  'short-answer': 'Short Answer',
  drawing: 'Drawing',
}

function capitalize(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1)
}

function applySlotStyle(slot: TemplateSlot, palette: TemplatePalette): React.CSSProperties {
  return {
    backgroundColor: slot.style?.background ?? palette.surface,
    ...(slot.style?.borderColor ? { borderColor: slot.style.borderColor } : {}),
    ...(slot.style?.borderWidth ? { borderWidth: slot.style.borderWidth } : {}),
    ...(slot.style?.borderRadius ? { borderRadius: slot.style.borderRadius } : {}),
    ...(slot.style?.padding ? { padding: slot.style.padding } : {}),
    color: slot.style?.color ?? palette.text,
  }
}

function ActivityItems({
  activity,
  palette,
}: {
  activity: Activity
  palette: TemplatePalette
}) {
  switch (activity.type) {
    case 'fill-in-the-blank':
      return (
        <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {activity.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', color: palette.text }}>
              {item}
            </li>
          ))}
        </ol>
      )
    case 'matching':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            {activity.items.map((item, i) => (
              <div key={i} style={{ marginBottom: '0.5rem', color: palette.text }}>
                {i + 1}. {item}
              </div>
            ))}
          </div>
          <div>
            {activity.items.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '1.5rem',
                  borderBottom: `2px dashed ${palette.border}`,
                  marginBottom: '0.5rem',
                }}
              />
            ))}
          </div>
        </div>
      )
    case 'multiple-choice':
      return (
        <div>
          {activity.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: palette.text,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  border: `2px solid ${palette.border}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {item}
            </div>
          ))}
        </div>
      )
    case 'short-answer':
      return (
        <div>
          {activity.items.map((item, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <p style={{ color: palette.text, margin: '0 0 0.25rem' }}>{item}</p>
              <div style={{ borderBottom: `2px dashed ${palette.border}`, height: '1.5rem' }} />
              <div
                style={{
                  borderBottom: `2px dashed ${palette.border}`,
                  height: '1.5rem',
                  marginTop: '0.25rem',
                }}
              />
            </div>
          ))}
        </div>
      )
    case 'drawing':
      return (
        <div
          style={{
            height: 160,
            border: `2px dashed ${palette.border}`,
            borderRadius: 10,
            marginTop: '0.5rem',
            backgroundColor: palette.surface,
          }}
        />
      )
    default:
      return null
  }
}

function renderSlot(
  slot: TemplateSlot,
  definition: TemplateDefinition,
  worksheet: WorksheetContent,
): React.ReactNode {
  const { palette } = definition

  switch (slot.type) {
    case 'header':
      return (
        <header
          style={{
            ...applySlotStyle(slot, palette),
            borderBottom: `2px solid ${palette.border}`,
            paddingBottom: '1rem',
            backgroundColor: 'transparent',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {definition.avatar ? (
              <img
                src={`/${definition.avatar}`}
                alt="avatar"
                style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: palette.highlight,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 18,
                  fontWeight: 700,
                  color: palette.primary,
                }}
              >
                {worksheet.subject[0].toUpperCase()}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: palette.primary,
                  margin: 0,
                }}
              >
                {worksheet.title}
              </h1>
              {worksheet.subtitle ? (
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: palette.textMuted,
                    margin: '0.25rem 0 0',
                  }}
                >
                  {worksheet.subtitle}
                </p>
              ) : null}
            </div>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexDirection: 'column',
                alignItems: 'flex-end',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  borderRadius: 999,
                  padding: '0.25rem 0.75rem',
                  backgroundColor: palette.highlight,
                  color: palette.primary,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                Grade {worksheet.grade}
              </span>
              <span
                style={{
                  borderRadius: 999,
                  padding: '0.25rem 0.75rem',
                  backgroundColor: palette.secondary,
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {capitalize(worksheet.subject)}
              </span>
            </div>
          </div>
        </header>
      )

    case 'vocabulary':
      if (!worksheet.vocabulary?.length) return null
      return (
        <section style={applySlotStyle(slot, palette)}>
          <h2
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: palette.textMuted,
              margin: '0 0 0.75rem',
            }}
          >
            Vocabulary
          </h2>
          <div>
            {worksheet.vocabulary.map((entry) => (
              <div
                key={entry.word}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.5rem 0',
                  borderBottom: `1px solid ${palette.border}`,
                }}
              >
                <span
                  style={{ minWidth: 120, fontWeight: 600, color: palette.primary }}
                >
                  {entry.word}
                </span>
                <span style={{ color: palette.text }}>{entry.definition}</span>
              </div>
            ))}
          </div>
        </section>
      )

    case 'activity':
      if (!worksheet.activities?.length) return null
      return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {worksheet.activities.map((activity, i) => (
            <div
              key={`${activity.type}-${i}`}
              style={{
                ...applySlotStyle(slot, palette),
                border: `1px solid ${palette.border}`,
                borderRadius: slot.style?.borderRadius ?? '10px',
                padding: slot.style?.padding ?? '1rem',
              }}
            >
              <h2
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: palette.primary,
                  margin: '0 0 0.25rem',
                }}
              >
                Activity {i + 1}: {ACTIVITY_LABELS[activity.type]}
              </h2>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                  color: palette.textMuted,
                  margin: '0 0 0.75rem',
                }}
              >
                {activity.instruction}
              </p>
              <ActivityItems activity={activity} palette={palette} />
            </div>
          ))}
        </section>
      )

    case 'parent-notes':
      if (!worksheet.parentNotes) return null
      return (
        <section
          style={{
            ...applySlotStyle(slot, palette),
            border: `1px solid ${palette.border}`,
            borderRadius: slot.style?.borderRadius ?? '10px',
            padding: slot.style?.padding ?? '1rem',
            backgroundColor: slot.style?.background ?? palette.highlight + '30',
          }}
        >
          <h2
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: palette.primary,
              margin: '0 0 0.5rem',
            }}
          >
            Parent Notes
          </h2>
          <p style={{ fontSize: '0.875rem', color: palette.text, margin: 0 }}>
            {worksheet.parentNotes}
          </p>
        </section>
      )

    case 'footer':
      return (
        <footer
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: `1px solid ${palette.border}`,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: palette.textMuted }}>
            {definition.footerText ?? worksheet.footerText ?? 'Homeschooling for Kiddos'}
          </span>
          <span style={{ fontSize: '0.75rem', color: palette.border }}>
            HFK Publishing Engine
          </span>
        </footer>
      )

    default:
      return null
  }
}

export function DynamicWorksheetTemplate({
  definition,
  worksheet,
}: DynamicWorksheetTemplateProps) {
  return (
    <div
      className="worksheet mx-auto flex min-h-[1056px] max-w-[816px] flex-col gap-6 p-8"
      style={{ backgroundColor: definition.palette.background, color: definition.palette.text }}
    >
      {definition.slots.map((slot) => (
        <Fragment key={slot.id}>{renderSlot(slot, definition, worksheet)}</Fragment>
      ))}
    </div>
  )
}
