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

      const img = new Image()
      await new Promise<void>((resolve) => {
        img.onload = () => resolve()
        img.src = dataUrl
      })

      const pageWidth = img.width
      const pageHeight = Math.round(pageWidth * (11 / 8.5))
      const totalHeight = img.height
      const pageCount = Math.ceil(totalHeight / pageHeight)

      const baseName = (el.querySelector('h1')?.textContent ?? 'worksheet')
        .trim()
        .replace(/[^a-z0-9]+/gi, '-')
        .toLowerCase()

      for (let i = 0; i < pageCount; i++) {
        const sliceHeight = Math.min(pageHeight, totalHeight - i * pageHeight)
        const canvas = document.createElement('canvas')
        canvas.width = pageWidth
        canvas.height = sliceHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Canvas context unavailable')
        ctx.drawImage(img, 0, -i * pageHeight)

        const pageBlob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png'),
        )

        const filename =
          pageCount > 1 ? `${baseName}-page-${i + 1}.png` : `${baseName}.png`

        if (pageCount === 1 && typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
          try {
            const handle = await (
              window as Window &
                typeof globalThis & {
                  showSaveFilePicker: (opts: unknown) => Promise<FileSystemFileHandle>
                }
            ).showSaveFilePicker({
              suggestedName: filename,
              types: [{ description: 'PNG Image', accept: { 'image/png': ['.png'] } }],
            })
            const writable = await handle.createWritable()
            await writable.write(pageBlob)
            await writable.close()
          } catch (err: unknown) {
            if (err instanceof Error && err.name === 'AbortError') return
            throw err
          }
        } else {
          const url = URL.createObjectURL(pageBlob)
          const a = document.createElement('a')
          a.href = url
          a.download = filename
          a.click()
          URL.revokeObjectURL(url)
        }
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
