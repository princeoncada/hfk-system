'use client'

import { useState } from 'react'

interface RedirectModalProps {
  gate: string
  initialValue?: string
  onConfirm: (note: string) => void
  onCancel: () => void
}

export default function RedirectModal({
  gate,
  initialValue = '',
  onConfirm,
  onCancel,
}: RedirectModalProps) {
  const [note, setNote] = useState(initialValue)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-1 font-display text-lg font-semibold">
          Instructions
        </h3>
        <p className="mb-4 text-sm text-warm-brown/60">
          Add instructions for {gate}.
        </p>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
          placeholder="Add instructions for the AI (e.g. make it more playful, focus on Grade 3 vocabulary)..."
          className="w-full resize-none rounded-lg border border-warm-brown/20 px-3 py-2 text-sm focus:outline-none"
        />
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-warm-brown/60 hover:text-warm-brown"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (note.trim()) onConfirm(note.trim())
            }}
            disabled={!note.trim()}
            className="rounded bg-soft-yellow px-4 py-2 text-sm font-medium text-warm-brown disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
