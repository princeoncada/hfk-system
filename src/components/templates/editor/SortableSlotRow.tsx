'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { TemplateSlot } from '@/lib/template.types'

interface SortableSlotRowProps {
  slot: TemplateSlot
  onRemove: () => void
  canRemove: boolean
}

const SLOT_COLOR: Record<TemplateSlot['type'], string> = {
  header: 'bg-sage-tint text-sage-deep',
  vocabulary: 'bg-yellow-tint text-ink-2',
  activity: 'bg-cream-deep text-ink-2',
  'parent-notes': 'bg-rose-tint text-rose',
  footer: 'bg-ink text-cream',
}

function slotLabel(type: TemplateSlot['type']) {
  if (type === 'parent-notes') return 'Parent Notes'
  return type
}

export function SortableSlotRow({
  slot,
  onRemove,
  canRemove,
}: SortableSlotRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slot.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="mb-2 flex items-center gap-3 rounded-lg border border-[rgba(92,64,51,0.1)] bg-paper p-3"
    >
      <button
        type="button"
        className="cursor-grab p-0.5 text-ink-4 hover:text-ink-2"
        {...attributes}
        {...listeners}
      >
        <svg viewBox="0 0 12 18" className="h-4 w-3" fill="currentColor">
          <circle cx="3" cy="3" r="1.2" />
          <circle cx="9" cy="3" r="1.2" />
          <circle cx="3" cy="9" r="1.2" />
          <circle cx="9" cy="9" r="1.2" />
          <circle cx="3" cy="15" r="1.2" />
          <circle cx="9" cy="15" r="1.2" />
        </svg>
      </button>
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${SLOT_COLOR[slot.type]}`}
      >
        {slotLabel(slot.type)}
      </span>
      <div className="flex-1" />
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="px-1 text-[16px] leading-none text-ink-4 hover:text-rose disabled:cursor-not-allowed disabled:opacity-30"
      >
        ×
      </button>
    </div>
  )
}
