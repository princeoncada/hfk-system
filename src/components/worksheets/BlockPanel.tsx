'use client'

import { DndContext, closestCenter } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type {
  ActivityBlock,
  FooterBlock,
  HeaderBlock,
  ParentNotesBlock,
  VocabularyBlock,
  WorksheetBlock,
} from '@/lib/worksheet.blocks'
import type { Activity, ActivityType, Grade, Subject, VocabularyEntry } from '@/lib/types'

interface BlockPanelProps {
  blocks: WorksheetBlock[]
  selectedBlockId: string | null
  onSelect: (id: string) => void
  onReorder: (newBlocks: WorksheetBlock[]) => void
  onDelete: (id: string) => void
  onAdd: (type: 'vocabulary' | 'activity' | 'parentNotes') => void
  onUpdate: (id: string, data: unknown) => void
}

const inputClass =
  'bg-cream rounded-[8px] border border-[rgba(92,64,51,0.14)] px-3 py-2 text-[13px] text-ink w-full outline-none focus:border-ink-3 transition-colors'
const labelClass = 'text-[11px] font-mono text-ink-3 mb-1 block'

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  )
}

function DragHandle() {
  return (
    <svg viewBox="0 0 8 12" className="h-3 w-2 cursor-grab text-ink-4">
      <circle cx="2" cy="2" r="1" fill="currentColor" />
      <circle cx="6" cy="2" r="1" fill="currentColor" />
      <circle cx="2" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="2" cy="10" r="1" fill="currentColor" />
      <circle cx="6" cy="10" r="1" fill="currentColor" />
    </svg>
  )
}

function blockLabel(block: WorksheetBlock) {
  if (block.type === 'vocabulary') return 'Vocab'
  if (block.type === 'activity') return 'Activity'
  if (block.type === 'parentNotes') return 'Notes'
  return block.type
}

function blockPreview(block: WorksheetBlock) {
  if (block.type === 'vocabulary') return block.data.entries[0]?.word || 'Vocabulary'
  if (block.type === 'activity') return block.data.instruction || 'Activity'
  if (block.type === 'parentNotes') return block.data.text.slice(0, 40) || 'Parent notes'
  if (block.type === 'header') return block.data.title
  return block.data.footerText
}

function LockedBlockRow({
  block,
  selected,
  onSelect,
}: {
  block: HeaderBlock | FooterBlock
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <button
      type="button"
      className={[
        'w-full bg-cream rounded-[8px] px-3 py-2.5 flex items-center gap-2 cursor-pointer text-left',
        selected ? 'ring-1 ring-sage-tint' : '',
      ].join(' ')}
      onClick={() => onSelect(block.id)}
    >
      <LockIcon />
      <span className="text-[11px] font-mono text-ink-4">
        {block.type === 'header' ? 'Header' : 'Footer'}
      </span>
      <span className="text-[12px] text-ink-3 flex-1 truncate">{blockPreview(block)}</span>
    </button>
  )
}

function SortableBlockRow({
  block,
  selected,
  onSelect,
  onDelete,
}: {
  block: WorksheetBlock
  selected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={[
        selected
          ? 'bg-sage-tint border border-sage'
          : 'bg-paper border border-[rgba(92,64,51,0.14)] hover:bg-cream transition-colors',
        'rounded-[8px] px-3 py-2.5',
      ].join(' ')}
      onClick={() => onSelect(block.id)}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="shrink-0"
          aria-label="Drag block"
          {...attributes}
          {...listeners}
        >
          <DragHandle />
        </button>
        <span className="text-[11px] font-mono uppercase text-ink-3">
          {blockLabel(block)}
        </span>
        <span className="text-[12px] text-ink truncate flex-1">{blockPreview(block)}</span>
        <button
          type="button"
          className="text-[14px] text-ink-4 hover:text-rose transition-colors ml-auto"
          onClick={(event) => {
            event.stopPropagation()
            onDelete(block.id)
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

function HeaderForm({
  block,
  onUpdate,
}: {
  block: HeaderBlock
  onUpdate: (id: string, data: unknown) => void
}) {
  const update = (field: keyof HeaderBlock['data'], value: string | number) =>
    onUpdate('header', { ...block.data, [field]: value })

  return (
    <>
      <div className="mb-3">
        <label className={labelClass}>Title</label>
        <input
          className={inputClass}
          value={block.data.title}
          onChange={(event) => update('title', event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className={labelClass}>Subtitle</label>
        <input
          className={inputClass}
          value={block.data.subtitle ?? ''}
          placeholder="Optional"
          onChange={(event) => update('subtitle', event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className={labelClass}>Grade</label>
        <select
          className={inputClass}
          value={block.data.grade}
          onChange={(event) => update('grade', Number(event.target.value) as Grade)}
        >
          {[1, 2, 3, 4, 5, 6].map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className={labelClass}>Subject</label>
        <select
          className={inputClass}
          value={block.data.subject}
          onChange={(event) => update('subject', event.target.value as Subject)}
        >
          {['math', 'science', 'reading', 'vocabulary', 'bible', 'values'].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function VocabularyForm({
  block,
  onUpdate,
}: {
  block: VocabularyBlock
  onUpdate: (id: string, data: unknown) => void
}) {
  const updateEntries = (entries: VocabularyEntry[]) =>
    onUpdate('vocabulary', { entries })

  return (
    <>
      {block.data.entries.map((entry, index) => (
        <div key={index} className="mb-3 grid grid-cols-[1fr_1fr_auto] gap-2">
          <input
            className={inputClass}
            value={entry.word}
            placeholder="Word"
            onChange={(event) => {
              const entries = [...block.data.entries]
              entries[index] = { ...entry, word: event.target.value }
              updateEntries(entries)
            }}
          />
          <input
            className={inputClass}
            value={entry.definition}
            placeholder="Definition"
            onChange={(event) => {
              const entries = [...block.data.entries]
              entries[index] = { ...entry, definition: event.target.value }
              updateEntries(entries)
            }}
          />
          <button
            type="button"
            className="text-rose text-[12px]"
            onClick={() =>
              updateEntries(block.data.entries.filter((_, entryIndex) => entryIndex !== index))
            }
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-[12px] text-sage hover:underline"
        onClick={() =>
          updateEntries([...block.data.entries, { word: '', definition: '' }])
        }
      >
        Add word
      </button>
    </>
  )
}

function ActivityForm({
  block,
  onUpdate,
}: {
  block: ActivityBlock
  onUpdate: (id: string, data: unknown) => void
}) {
  const update = (data: Activity) => onUpdate(block.id, data)

  return (
    <>
      <div className="mb-3">
        <label className={labelClass}>Type</label>
        <select
          className={inputClass}
          value={block.data.type}
          onChange={(event) =>
            update({ ...block.data, type: event.target.value as ActivityType })
          }
        >
          {[
            'fill-in-the-blank',
            'matching',
            'multiple-choice',
            'short-answer',
            'drawing',
          ].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className={labelClass}>Instruction</label>
        <input
          className={inputClass}
          value={block.data.instruction}
          onChange={(event) => update({ ...block.data, instruction: event.target.value })}
        />
      </div>
      <div className="mb-3">
        <label className={labelClass}>Items</label>
        <div className="space-y-2">
          {block.data.items.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_auto] gap-2">
              <input
                className={inputClass}
                value={item}
                onChange={(event) => {
                  const items = [...block.data.items]
                  items[index] = event.target.value
                  update({ ...block.data, items })
                }}
              />
              <button
                type="button"
                className="text-rose text-[12px]"
                onClick={() =>
                  update({
                    ...block.data,
                    items: block.data.items.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="text-[12px] text-sage hover:underline"
        onClick={() => update({ ...block.data, items: [...block.data.items, ''] })}
      >
        Add item
      </button>
    </>
  )
}

function ParentNotesForm({
  block,
  onUpdate,
}: {
  block: ParentNotesBlock
  onUpdate: (id: string, data: unknown) => void
}) {
  return (
    <div className="mb-3">
      <label className={labelClass}>Notes</label>
      <textarea
        rows={4}
        className={inputClass}
        value={block.data.text}
        onChange={(event) => onUpdate('parentNotes', { text: event.target.value })}
      />
    </div>
  )
}

function FooterForm({
  block,
  onUpdate,
}: {
  block: FooterBlock
  onUpdate: (id: string, data: unknown) => void
}) {
  return (
    <div className="mb-3">
      <label className={labelClass}>Footer Text</label>
      <input
        className={inputClass}
        value={block.data.footerText}
        onChange={(event) => onUpdate('footer', { footerText: event.target.value })}
      />
    </div>
  )
}

function EditForm({
  block,
  onUpdate,
}: {
  block: WorksheetBlock
  onUpdate: (id: string, data: unknown) => void
}) {
  return (
    <div className="border-t border-[rgba(92,64,51,0.14)] p-4 overflow-y-auto max-h-[360px]">
      <p className="text-[11px] font-mono text-ink-3 uppercase mb-3">{block.type}</p>
      {block.type === 'header' ? <HeaderForm block={block} onUpdate={onUpdate} /> : null}
      {block.type === 'vocabulary' ? (
        <VocabularyForm block={block} onUpdate={onUpdate} />
      ) : null}
      {block.type === 'activity' ? <ActivityForm block={block} onUpdate={onUpdate} /> : null}
      {block.type === 'parentNotes' ? (
        <ParentNotesForm block={block} onUpdate={onUpdate} />
      ) : null}
      {block.type === 'footer' ? <FooterForm block={block} onUpdate={onUpdate} /> : null}
    </div>
  )
}

export default function BlockPanel({
  blocks,
  selectedBlockId,
  onSelect,
  onReorder,
  onDelete,
  onAdd,
  onUpdate,
}: BlockPanelProps) {
  const header = blocks.find((block): block is HeaderBlock => block.type === 'header')
  const footer = blocks.find((block): block is FooterBlock => block.type === 'footer')
  const draggableBlocks = blocks.filter(
    (block) => block.type !== 'header' && block.type !== 'footer',
  )
  const selectedBlock = blocks.find((block) => block.id === selectedBlockId)
  const hasVocabulary = blocks.some((block) => block.type === 'vocabulary')
  const hasParentNotes = blocks.some((block) => block.type === 'parentNotes')

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = draggableBlocks.findIndex((block) => block.id === active.id)
    const newIndex = draggableBlocks.findIndex((block) => block.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reorderedMiddle = arrayMove(draggableBlocks, oldIndex, newIndex)
    onReorder([
      ...(header ? [header] : []),
      ...reorderedMiddle,
      ...(footer ? [footer] : []),
    ])
  }

  return (
    <div className="flex h-full flex-col bg-cream">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {header ? (
          <LockedBlockRow
            block={header}
            selected={selectedBlockId === header.id}
            onSelect={onSelect}
          />
        ) : null}

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={draggableBlocks.map((block) => block.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {draggableBlocks.map((block) => (
                <SortableBlockRow
                  key={block.id}
                  block={block}
                  selected={selectedBlockId === block.id}
                  onSelect={onSelect}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {footer ? (
          <LockedBlockRow
            block={footer}
            selected={selectedBlockId === footer.id}
            onSelect={onSelect}
          />
        ) : null}
      </div>

      <div className="border-t border-[rgba(92,64,51,0.14)] p-3">
        <p className="text-[11px] font-mono text-ink-3 mb-2">Add Block</p>
        <div className="flex flex-wrap gap-1.5">
          {!hasVocabulary ? (
            <button
              type="button"
              className="text-[12px] bg-cream hover:bg-cream-deep rounded-[6px] px-2.5 py-1 border border-[rgba(92,64,51,0.14)] transition-colors cursor-pointer"
              onClick={() => onAdd('vocabulary')}
            >
              + Vocabulary
            </button>
          ) : null}
          <button
            type="button"
            className="text-[12px] bg-cream hover:bg-cream-deep rounded-[6px] px-2.5 py-1 border border-[rgba(92,64,51,0.14)] transition-colors cursor-pointer"
            onClick={() => onAdd('activity')}
          >
            + Activity
          </button>
          {!hasParentNotes ? (
            <button
              type="button"
              className="text-[12px] bg-cream hover:bg-cream-deep rounded-[6px] px-2.5 py-1 border border-[rgba(92,64,51,0.14)] transition-colors cursor-pointer"
              onClick={() => onAdd('parentNotes')}
            >
              + Parent Notes
            </button>
          ) : null}
        </div>
      </div>

      {selectedBlock ? <EditForm block={selectedBlock} onUpdate={onUpdate} /> : null}
    </div>
  )
}
