import Link from 'next/link'
import MonthProgress from '@/components/command/MonthProgress'
import TodayStatus from '@/components/command/TodayStatus'
import VaultAlerts from '@/components/command/VaultAlerts'
import { getWorksheets } from '@/lib/content'

export default async function DashboardPage() {
  const worksheets = getWorksheets()

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TodayStatus />
        <MonthProgress />
      </div>

      <VaultAlerts />

      <section>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Worksheets</h2>
          <Link
            href="/edit/new"
            className="rounded bg-sage-green/80 px-4 py-1.5 text-sm text-white hover:bg-sage-green"
          >
            + New Worksheet
          </Link>
        </div>
        <p className="mb-4 text-sm text-warm-brown/60">
          {worksheets.length} worksheet{worksheets.length !== 1 ? 's' : ''} in
          content library
        </p>
        {worksheets.length === 0 ? (
          <div className="rounded-lg border border-warm-brown/20 p-8 text-center">
            <p className="text-sm text-warm-brown/50">
              No worksheets yet. Add JSON files to content/worksheets/ to get
              started.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {worksheets.map((ws) => (
              <div
                key={ws.id}
                className="flex items-center justify-between rounded-lg border border-warm-brown/20 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{ws.title}</p>
                  <p className="text-sm text-warm-brown/60">
                    Grade {ws.grade} · {ws.subject} · {ws.template}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-soft-yellow px-2 py-0.5 text-xs text-warm-brown">
                    {ws.status}
                  </span>
                  <Link
                    href={`/edit/${ws.id}`}
                    className="text-sm text-warm-brown/60 hover:text-warm-brown"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/preview/${ws.id}`}
                    className="text-sm text-sage-green hover:underline"
                  >
                    Preview →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
