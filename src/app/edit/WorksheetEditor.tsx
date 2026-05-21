'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { WorksheetContent } from '@/lib/types'

interface WorksheetEditorProps {
  initialData: Partial<WorksheetContent>
}

export default function WorksheetEditor({ initialData }: WorksheetEditorProps) {
  const router = useRouter()
  const [value, setValue] = useState(JSON.stringify(initialData, null, 2))
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const isNew = !initialData.title

  async function handleSave() {
    setError(null)
    setSaving(true)

    let parsed: unknown
    try {
      parsed = JSON.parse(value)
    } catch {
      setError('Invalid JSON')
      setSaving(false)
      return
    }

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/preview/' + data.id)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError(String(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-warm-brown/20 bg-cream px-6 py-3">
        <Link
          href="/"
          className="text-sm text-warm-brown/60 hover:text-warm-brown"
        >
          &larr; Dashboard
        </Link>
        <h1 className="font-display text-lg font-semibold text-warm-brown">
          {isNew ? 'New Worksheet' : 'Edit Worksheet'}
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-sage-green/80 px-4 py-1.5 text-sm text-white transition-colors hover:bg-sage-green disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
      <main className="mx-auto max-w-5xl px-6 py-6">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="min-h-[600px] w-full resize-y rounded border border-warm-brown/20 bg-white p-4 font-mono text-sm text-warm-brown outline-none focus:border-sage-green"
          placeholder="Paste or edit worksheet JSON here"
        />
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      </main>
    </div>
  )
}
