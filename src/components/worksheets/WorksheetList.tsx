'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { WorksheetContent } from '@/lib/types'

interface WorksheetListProps {
  worksheets: WorksheetContent[]
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function WorksheetList({ worksheets }: WorksheetListProps) {
  const router = useRouter()
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    const response = await fetch(`/api/worksheets/${id}`, { method: 'DELETE' })
    setDeletingId(null)

    if (response.ok) {
      setConfirmingId(null)
      router.refresh()
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[13px] text-ink-3">
          {worksheets.length} worksheet{worksheets.length !== 1 ? 's' : ''}
        </p>
        <Link
          href="/worksheets/new"
          className="bg-ink text-cream rounded-[10px] px-4 py-2.5 text-sm font-medium hover:bg-[#1a120e] transition-colors"
        >
          + New Worksheet
        </Link>
      </div>

      {worksheets.length === 0 ? (
        <div className="bg-paper rounded-[14px] border border-[rgba(92,64,51,0.14)] p-8 text-center text-[13px] text-ink-3">
          No worksheets yet.{' '}
          <Link href="/worksheets/new" className="text-sage hover:underline">
            Create one.
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {worksheets.map((worksheet) => (
            <div
              key={worksheet.id}
              className="bg-paper rounded-[14px] border border-[rgba(92,64,51,0.14)] px-5 py-4 shadow-card flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-ink text-[15px]">{worksheet.title}</p>
                <p className="text-[13px] text-ink-3 mt-0.5">
                  Grade {worksheet.grade} · {capitalize(worksheet.subject)} ·{' '}
                  {worksheet.template}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-mono border bg-paper text-ink-2 border-[rgba(92,64,51,0.14)]">
                  {worksheet.status}
                </span>
                <Link
                  href={`/worksheets/${worksheet.id}`}
                  className="text-[13px] text-ink-3 hover:text-ink"
                >
                  Edit
                </Link>
                {confirmingId === worksheet.id ? (
                  <span className="inline-flex items-center gap-2 text-[13px]">
                    <span className="text-ink-3">Delete?</span>
                    <button
                      type="button"
                      className="text-rose hover:underline disabled:opacity-50"
                      disabled={deletingId === worksheet.id}
                      onClick={() => handleDelete(worksheet.id)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="text-ink-3 hover:text-ink"
                      onClick={() => setConfirmingId(null)}
                    >
                      No
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="text-[13px] text-rose hover:text-rose"
                    onClick={() => setConfirmingId(worksheet.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
