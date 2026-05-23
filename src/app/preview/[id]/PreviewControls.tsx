'use client'

import { toPng } from 'html-to-image'
import Link from 'next/link'
import { useState } from 'react'

export function PreviewControls(_props: { id: string }) {
  const [exporting, setExporting] = useState(false)

  async function handleSaveImage() {
    setExporting(true)
    try {
      const el = document.querySelector('.worksheet') as HTMLElement | null
      if (!el) throw new Error('Worksheet element not found')

      const dataUrl = await toPng(el, { pixelRatio: 2 })
      const res = await fetch(dataUrl)
      const blob = await res.blob()

      const filename = (el.querySelector('h1')?.textContent ?? 'worksheet')
        .trim()
        .replace(/[^a-z0-9]+/gi, '-')
        .toLowerCase() + '.png'

      if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
        try {
          const handle = await (window as Window & typeof globalThis & {
            showSaveFilePicker: (opts: unknown) => Promise<FileSystemFileHandle>
          }).showSaveFilePicker({
            suggestedName: filename,
            types: [{ description: 'PNG Image', accept: { 'image/png': ['.png'] } }],
          })
          const writable = await handle.createWritable()
          await writable.write(blob)
          await writable.close()
        } catch (err: unknown) {
          // User cancelled the Save As dialog — not an error
          if (err instanceof Error && err.name === 'AbortError') return
          throw err
        }
      } else {
        // Fallback: trigger browser download to default Downloads folder
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      alert('Image export failed: ' + String(err))
    } finally {
      setExporting(false)
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
          onClick={handleSaveImage}
          disabled={exporting}
          className="no-print rounded bg-white px-4 py-1.5 text-sm text-warm-brown transition-colors hover:bg-warm-brown/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exporting ? 'Saving…' : 'Save as Image'}
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
