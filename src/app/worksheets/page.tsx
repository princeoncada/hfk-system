import { getWorksheets } from '@/lib/content'
import WorksheetList from '@/components/worksheets/WorksheetList'

export default function WorksheetsPage() {
  const worksheets = getWorksheets()

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Worksheets
        </p>
        <h1 className="font-display text-[38px] leading-[1.1]">
          Your worksheets.
        </h1>
      </div>

      <WorksheetList worksheets={worksheets} />
    </>
  )
}
