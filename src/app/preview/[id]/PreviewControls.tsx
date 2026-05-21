'use client'

import Link from 'next/link'

export function PreviewControls() {
  return (
    <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-warm-brown/20 bg-cream px-6 py-3">
      <Link
        href="/"
        className="text-sm text-warm-brown/60 hover:text-warm-brown"
      >
        ← Dashboard
      </Link>
      <button
        onClick={() => window.print()}
        className="rounded bg-soft-yellow px-4 py-1.5 text-sm text-warm-brown transition-colors hover:bg-soft-yellow/80"
      >
        Print
      </button>
    </div>
  )
}
