'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Grade, Subject, WorksheetContent } from '@/lib/types'
import type { HeaderBlock, WorksheetBlock } from '@/lib/worksheet.blocks'
import { blocksToWorksheet, worksheetToBlocks } from '@/lib/worksheet.blocks'
import { WorksheetTemplate as CozyV1 } from '@/components/templates/cozy_v1/WorksheetTemplate'
import { WorksheetTemplate as PlayfulV1 } from '@/components/templates/playful_v1/WorksheetTemplate'
import { DynamicWorksheetTemplate } from '@/components/templates/dynamic'
import type { TemplateDefinition } from '@/lib/template.types'
import BlockPanel from './BlockPanel'

interface WorksheetBuilderProps {
  initialWorksheet: Partial<WorksheetContent>
  customTemplateDefs?: TemplateDefinition[]
}

function normalizeForDirty(worksheet: WorksheetContent) {
  const { updatedAt: _updatedAt, ...rest } = worksheet as WorksheetContent & {
    updatedAt?: string
  }
  return rest
}

export default function WorksheetBuilder({
  initialWorksheet,
  customTemplateDefs = [],
}: WorksheetBuilderProps) {
  const router = useRouter()
  const initialBlocks = useMemo(
    () => worksheetToBlocks(initialWorksheet),
    [initialWorksheet],
  )
  const [blocks, setBlocks] = useState<WorksheetBlock[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const initialSerializedRef = useRef(
    JSON.stringify(normalizeForDirty(blocksToWorksheet(initialBlocks, initialWorksheet))),
  )

  const headerBlock = blocks.find(
    (block): block is HeaderBlock => block.type === 'header',
  )
  const preview = blocksToWorksheet(blocks, initialWorksheet)
  const templateId = headerBlock?.data.template ?? 'cozy_v1'
  const ActiveTemplate = templateId === 'playful_v1' ? PlayfulV1 : CozyV1
  const customDef = customTemplateDefs.find((d) => d.id === templateId) ?? null

  useEffect(() => {
    const serialized = JSON.stringify(
      normalizeForDirty(blocksToWorksheet(blocks, initialWorksheet)),
    )
    setIsDirty(serialized !== initialSerializedRef.current)
  }, [blocks, initialWorksheet])

  function handleUpdate(id: string, data: unknown) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === id ? ({ ...block, data } as WorksheetBlock) : block,
      ),
    )
  }

  function handleDelete(id: string) {
    setBlocks((current) => current.filter((block) => block.id !== id))
    if (selectedBlockId === id) setSelectedBlockId(null)
  }

  function handleAdd(type: 'vocabulary' | 'activity' | 'parentNotes') {
    setBlocks((current) => {
      const footerIndex = current.findIndex((block) => block.id === 'footer')
      const next = [...current]
      const insertAt = footerIndex === -1 ? next.length : footerIndex

      if (type === 'vocabulary') {
        next.splice(insertAt, 0, {
          id: 'vocabulary',
          type: 'vocabulary',
          data: { entries: [{ word: '', definition: '' }] },
        })
      }

      if (type === 'activity') {
        const activityCount = current.filter((block) => block.type === 'activity').length
        next.splice(insertAt, 0, {
          id: `activity-${Date.now()}-${activityCount}`,
          type: 'activity',
          data: {
            type: 'short-answer',
            instruction: 'New activity',
            items: [''],
          },
        })
      }

      if (type === 'parentNotes') {
        next.splice(insertAt, 0, {
          id: 'parentNotes',
          type: 'parentNotes',
          data: { text: '' },
        })
      }

      return next
    })
  }

  function handleCancel() {
    const resetBlocks = worksheetToBlocks(initialWorksheet)
    setBlocks(resetBlocks)
    setIsDirty(false)
    setSelectedBlockId(null)
  }

  async function handleSave() {
    setSaving(true)
    const worksheet = blocksToWorksheet(blocks, initialWorksheet)
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(worksheet),
    })
    const data = await response.json()

    if (response.ok) {
      if (!initialWorksheet.id) {
        router.push('/worksheets/' + data.id)
      } else {
        initialSerializedRef.current = JSON.stringify(normalizeForDirty(worksheet))
        setIsDirty(false)
        router.refresh()
      }
    }

    setSaving(false)
  }

  async function handleAiRegenerate() {
    setAiLoading(true)
    setAiError(null)

    try {
      const response = await fetch('/api/ai/draft/worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiPrompt,
          grade: headerBlock?.data.grade ?? 1,
          subject: headerBlock?.data.subject ?? 'math',
          template: headerBlock?.data.template ?? 'cozy_v1',
          objective: aiPrompt,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'AI regeneration failed')
      }

      const payload = data.draft ?? data
      const generated: Partial<WorksheetContent> = {
        ...initialWorksheet,
        ...payload,
        id: initialWorksheet.id ?? '',
        title: payload.title ?? headerBlock?.data.title ?? initialWorksheet.title,
        grade: (payload.grade ?? headerBlock?.data.grade ?? 1) as Grade,
        subject: (payload.subject ?? headerBlock?.data.subject ?? 'math') as Subject,
        template: payload.template ?? headerBlock?.data.template ?? 'cozy_v1',
        createdAt: initialWorksheet.createdAt ?? new Date().toISOString(),
        status: initialWorksheet.status ?? 'draft',
      }
      setBlocks(worksheetToBlocks(generated))
      setIsDirty(true)
      setAiModalOpen(false)
      setAiPrompt('')
    } catch (err) {
      setAiError(err instanceof Error ? err.message : String(err))
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="-mx-8 -mb-8 w-[calc(100vw-220px)] max-w-none overflow-hidden">
      <div className="sticky top-0 z-20 bg-paper border-b border-[rgba(92,64,51,0.14)] px-6 py-3 flex items-center justify-between">
        <Link href="/worksheets" className="text-[13px] text-ink-3 hover:text-ink">
          ← Worksheets
        </Link>
        <div className="font-display text-[17px] text-ink">
          {headerBlock?.data.title ?? 'Untitled Worksheet'}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="border border-[rgba(92,64,51,0.14)] rounded-[8px] px-3 py-1.5 text-[13px] text-ink-2 hover:bg-cream-deep transition-colors"
            onClick={() => setAiModalOpen(true)}
          >
            Regenerate with AI
          </button>
          {isDirty ? (
            <>
              <button
                type="button"
                className="border border-[rgba(92,64,51,0.14)] rounded-[8px] px-3 py-1.5 text-[13px] text-ink-2 hover:bg-cream-deep transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-sage text-cream rounded-[8px] px-4 py-1.5 text-[13px] font-medium hover:bg-sage-deep transition-colors disabled:opacity-50"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : initialWorksheet.id ? (
            <span className="text-[12px] text-ink-4 font-mono">Saved</span>
          ) : null}
        </div>
      </div>

      <div className="flex h-[calc(100vh-57px)]">
        <div className="w-[320px] shrink-0 border-r border-[rgba(92,64,51,0.14)] overflow-hidden">
          <BlockPanel
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelect={setSelectedBlockId}
            onReorder={setBlocks}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
          />
        </div>
        <div className="flex-1 bg-cream-deep overflow-auto p-8 flex justify-center">
          <div className="w-[589px] h-auto overflow-visible">
            <div
              className="w-[816px]"
              style={{ transform: 'scale(0.722)', transformOrigin: 'top left' }}
            >
              {customDef ? (
                <DynamicWorksheetTemplate definition={customDef} worksheet={preview} />
              ) : (
                <ActiveTemplate worksheet={preview} />
              )}
            </div>
          </div>
        </div>
      </div>

      {aiModalOpen ? (
        <div className="fixed inset-0 z-50 bg-[rgba(42,31,24,0.3)] backdrop-blur-sm flex items-center justify-center">
          <div className="bg-paper rounded-[18px] shadow-lift p-6 w-[480px] max-w-[90vw]">
            <h2 className="font-display text-[22px] text-ink">Regenerate with AI</h2>
            <p className="text-[13px] text-ink-3 mt-1 mb-4">
              Describe what you want. The entire worksheet will be rewritten.
            </p>
            <div className="flex gap-2 mb-4">
              <span className="bg-yellow-tint text-ink-2 rounded-full px-2.5 py-0.5 text-[12px]">
                Grade {headerBlock?.data.grade ?? 1}
              </span>
              <span className="bg-sage-tint text-sage-deep rounded-full px-2.5 py-0.5 text-[12px]">
                {headerBlock?.data.subject ?? 'math'}
              </span>
            </div>
            <textarea
              value={aiPrompt}
              onChange={(event) => setAiPrompt(event.target.value)}
              placeholder="e.g. Make it harder, focus on word problems, add a drawing activity..."
              rows={4}
              className="w-full bg-cream rounded-[10px] border border-[rgba(92,64,51,0.14)] px-3 py-2.5 text-[13px] text-ink outline-none focus:border-ink-3 resize-none"
            />
            {aiError ? <p className="text-[12px] text-rose mt-2">{aiError}</p> : null}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="border border-[rgba(92,64,51,0.14)] rounded-[8px] px-3 py-2 text-[13px] text-ink-2 hover:bg-cream-deep transition-colors"
                onClick={() => {
                  setAiModalOpen(false)
                  setAiError(null)
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-ink text-cream rounded-[8px] px-4 py-2 text-[13px] disabled:opacity-50"
                disabled={aiLoading}
                onClick={handleAiRegenerate}
              >
                {aiLoading ? 'Generating...' : 'Regenerate'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
