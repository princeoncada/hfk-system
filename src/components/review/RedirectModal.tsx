'use client'

import { useState } from 'react'

interface RedirectModalProps {
  gate: string
  onConfirm: (note: string) => void
  onCancel: () => void
}

export default function RedirectModal({
  gate,
  onConfirm,
  onCancel,
}: RedirectModalProps) {
  const [note, setNote] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-1 font-display text-lg font-semibold">
          Redirect: {gate}
        </h3>
        <p className="mb-4 text-sm text-warm-brown/60">
          Describe what should be different in the next attempt.
        </p>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
          placeholder="e.g. Simplify vocabulary to Grade 1 level. Use shorter sentences."
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
            Send Redirect
          </button>
        </div>
      </div>
    </div>
  )
}
