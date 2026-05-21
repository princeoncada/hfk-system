'use client'

import Link from 'next/link'
import { useState } from 'react'

export function PreviewControls({ id }: { id: string }) {
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null)

  async function handleExport(format: 'pdf' | 'png') {
    setExporting(format)
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, format }),
      })
      const data = await res.json()
      if (data.success) {
        alert(`Archived to: ${data.archivePath}`)
      } else {
        alert(`Export failed: ${data.error}`)
      }
    } catch (err) {
      alert(`Export failed: ${String(err)}`)
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-warm-brown/20 bg-cream px-6 py-3">
      <Link
        href="/"
        className="text-sm text-warm-brown/60 hover:text-warm-brown"
      >
        &larr; Dashboard
      </Link>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleExport('pdf')}
          disabled={exporting !== null}
          className="no-print rounded bg-soft-yellow px-4 py-1.5 text-sm text-warm-brown transition-colors hover:bg-soft-yellow/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exporting === 'pdf' ? 'Exporting…' : 'Export PDF'}
        </button>
        <button
          onClick={() => handleExport('png')}
          disabled={exporting !== null}
          className="no-print rounded bg-white px-4 py-1.5 text-sm text-warm-brown transition-colors hover:bg-warm-brown/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exporting === 'png' ? 'Exporting…' : 'Export PNG'}
        </button>
        <button
          onClick={() => window.print()}
          className="rounded bg-soft-yellow px-4 py-1.5 text-sm text-warm-brown transition-colors hover:bg-soft-yellow/80"
        >
          Print
        </button>
      </div>
    </div>
  )
}
