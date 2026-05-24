'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type {
  SlotType,
  TemplateDefinition,
  TemplatePalette,
  TemplateSlot,
  TemplateSlotStyle,
} from '@/lib/template.types'
import { PropertyPanel } from './PropertyPanel'
import { SortableSlotRow } from './SortableSlotRow'

interface TemplateSlotEditorProps {
  initialDefinition?: TemplateDefinition
  avatarOptions: string[]
}

const SLOT_TYPES: Array<{ type: SlotType; label: string }> = [
  { type: 'header', label: 'Header' },
  { type: 'vocabulary', label: 'Vocabulary' },
  { type: 'activity', label: 'Activity' },
  { type: 'parent-notes', label: 'Parent Notes' },
  { type: 'footer', label: 'Footer' },
]

const DEFAULT_PALETTE: TemplatePalette = {
  background: '#FFFFFF',
  surface: '#F7F2E8',
  primary: '#2A1F18',
  secondary: '#6F8F63',
  text: '#2A1F18',
  textMuted: '#8A7264',
  border: '#E8E0D8',
  highlight: '#E8C75B',
}

function createDefaultSlots(): TemplateSlot[] {
  return [
    { id: crypto.randomUUID(), type: 'header' },
    { id: crypto.randomUUID(), type: 'activity' },
    { id: crypto.randomUUID(), type: 'footer' },
  ]
}

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '') || 'template'
  )
}

export function TemplateSlotEditor({
  initialDefinition,
  avatarOptions,
}: TemplateSlotEditorProps) {
  const router = useRouter()
  const [name, setName] = useState(initialDefinition?.name ?? '')
  const [description, setDescription] = useState(
    initialDefinition?.description ?? '',
  )
  const [palette, setPalette] = useState<TemplatePalette>(
    initialDefinition?.palette ?? DEFAULT_PALETTE,
  )
  const [avatar, setAvatar] = useState<string | undefined>(
    initialDefinition?.avatar,
  )
  const [footerText, setFooterText] = useState(
    initialDefinition?.footerText ?? '',
  )
  const [slots, setSlots] = useState<TemplateSlot[]>(() =>
    initialDefinition?.slots ?? createDefaultSlots(),
  )
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [showTypePicker, setShowTypePicker] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setSlots((current) => {
      const oldIndex = current.findIndex((slot) => slot.id === active.id)
      const newIndex = current.findIndex((slot) => slot.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return current
      return arrayMove(current, oldIndex, newIndex)
    })
  }

  function addSlot(type: SlotType) {
    setSlots((current) => [
      ...current,
      { id: crypto.randomUUID(), type },
    ])
  }

  function removeSlot(id: string) {
    setSlots((current) => current.filter((slot) => slot.id !== id))
    setSelectedSlotId((current) => (current === id ? null : current))
  }

  function updateSlotStyle(id: string, patch: Partial<TemplateSlotStyle>) {
    setSlots((current) =>
      current.map((slot) =>
        slot.id === id ? { ...slot, style: { ...slot.style, ...patch } } : slot,
      ),
    )
  }

  function clearSlotStyle(id: string) {
    setSlots((current) =>
      current.map((slot) =>
        slot.id === id ? { ...slot, style: undefined } : slot,
      ),
    )
  }

  async function handleSave() {
    if (!name.trim()) {
      setError('Template name is required')
      return
    }

    setSaving(true)
    setError(null)

    const id = initialDefinition
      ? initialDefinition.id
      : `${slugify(name)}_${Date.now()}`
    const definition: TemplateDefinition = {
      id,
      name: name.trim(),
      description: description.trim(),
      version: '1.0.0',
      palette,
      avatar: avatar || undefined,
      slots,
      footerText: footerText || undefined,
    }

    try {
      const response = await fetch('/api/templates/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(definition),
      })
      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? 'Template save failed')
      }

      router.push('/templates')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Template save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-6">
        <div className="min-w-0 flex-1">
          <input
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Template name"
            className="w-full border-b border-[rgba(92,64,51,0.2)] bg-transparent pb-1 font-display text-[24px] outline-none focus:border-ink"
          />
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Short description"
            className="mt-2 w-full border-b border-[rgba(92,64,51,0.1)] bg-transparent pb-0.5 text-[13px] text-ink-3 outline-none focus:border-ink-3"
          />
        </div>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving || name.trim() === ''}
          className="rounded bg-ink px-5 py-2 text-[13px] text-cream disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Template'}
        </button>
      </div>

      {error ? <p className="mb-4 text-[13px] text-rose">{error}</p> : null}

      <div className="flex items-start gap-8">
        <div className="min-w-0 flex-1">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
            Slots
          </p>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={slots.map((slot) => slot.id)}
              strategy={verticalListSortingStrategy}
            >
              {slots.map((slot) => (
                <SortableSlotRow
                  key={slot.id}
                  slot={slot}
                  onRemove={() => removeSlot(slot.id)}
                  canRemove={slots.length > 1}
                  onSelect={() => setSelectedSlotId(slot.id)}
                  isSelected={selectedSlotId === slot.id}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowTypePicker((current) => !current)}
              className="flex items-center gap-1.5 rounded border border-[rgba(92,64,51,0.2)] px-3 py-1.5 text-[13px] text-ink-3 hover:text-ink"
            >
              Add Slot
            </button>
            {showTypePicker ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {SLOT_TYPES.map((slotType) => (
                  <button
                    key={slotType.type}
                    type="button"
                    onClick={() => {
                      addSlot(slotType.type)
                      setShowTypePicker(false)
                    }}
                    className="rounded-full border border-[rgba(92,64,51,0.15)] bg-paper px-3 py-1 text-[12px] text-ink-2 hover:bg-cream-deep"
                  >
                    {slotType.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="w-72 shrink-0">
          <PropertyPanel
            palette={palette}
            onPaletteChange={(key, value) =>
              setPalette((current) => ({ ...current, [key]: value }))
            }
            footerText={footerText}
            onFooterTextChange={setFooterText}
            avatar={avatar}
            onAvatarChange={setAvatar}
            avatarOptions={avatarOptions}
            selectedSlot={
              selectedSlotId
                ? slots.find((slot) => slot.id === selectedSlotId) ?? null
                : null
            }
            onSlotStyleChange={(patch) => {
              if (selectedSlotId) updateSlotStyle(selectedSlotId, patch)
            }}
            onSlotStyleClear={() => {
              if (selectedSlotId) clearSlotStyle(selectedSlotId)
            }}
          />
        </div>
      </div>
    </div>
  )
}
