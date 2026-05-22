import Link from 'next/link'
import MonthProgress from '@/components/command/MonthProgress'
import TodayStatus from '@/components/command/TodayStatus'
import VaultAlerts from '@/components/command/VaultAlerts'
import { getWorksheets } from '@/lib/content'

export default async function DashboardPage() {
  const worksheets = getWorksheets()

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Command Center
        </p>
        <h1 className="font-display text-[38px] leading-[1.1]">
          What needs you today.
        </h1>
      </div>

      <TodayStatus />

      <div className="mt-5 grid grid-cols-[1.4fr_1fr] gap-5">
        <MonthProgress />
        <VaultAlerts />
      </div>

      <section id="worksheets" className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
              Content Library
            </p>
            <h2 className="font-display text-[26px] leading-none">Worksheets</h2>
          </div>
          <Link
            href="/edit/new"
            className="bg-ink text-cream rounded-[10px] px-4 py-2.5 text-sm font-medium font-sans hover:bg-[#1a120e] transition-colors disabled:opacity-40"
          >
            + New
          </Link>
        </div>
        <p className="text-[13px] text-ink-3 mb-4">
          {worksheets.length} worksheet{worksheets.length !== 1 ? 's' : ''} in library
        </p>
        {worksheets.length === 0 ? (
          <div className="rounded-[14px] bg-paper border border-[rgba(92,64,51,0.14)] shadow-card p-8 text-center">
            <p className="text-[13px] text-ink-3">
              No worksheets yet. Add JSON files to content/worksheets/ to get
              started.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {worksheets.map((ws) => (
              <div
                key={ws.id}
                className="flex items-center justify-between rounded-[14px] bg-paper border border-[rgba(92,64,51,0.14)] px-5 py-4 shadow-card"
              >
                <div>
                  <p className="font-medium text-ink">{ws.title}</p>
                  <p className="text-[13px] text-ink-3">
                    Grade {ws.grade} &middot; {ws.subject} &middot; {ws.template}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium font-sans border bg-paper text-ink-2 border-[rgba(92,64,51,0.14)]">
                    {ws.status}
                  </span>
                  <Link
                    href={`/edit/${ws.id}`}
                    className="text-[13px] text-ink-3 hover:text-ink"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/preview/${ws.id}`}
                    className="text-[13px] text-sage hover:underline"
                  >
                    Preview &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
