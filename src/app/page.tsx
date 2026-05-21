import { getWorksheets } from '@/lib/content'
import Link from 'next/link'

export default function DashboardPage() {
  const worksheets = getWorksheets()

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h2 className="text-2xl font-display font-semibold mb-1">
          Worksheets
        </h2>
        <p className="text-sm text-warm-brown/60 mb-4">
          {worksheets.length} worksheet{worksheets.length !== 1 ? 's' : ''} in content library
        </p>

        {worksheets.length === 0 ? (
          <div className="border border-warm-brown/20 rounded-lg p-8 text-center">
            <p className="text-warm-brown/50 text-sm">
              No worksheets yet. Add JSON files to content/worksheets/ to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {worksheets.map((ws) => (
              <div
                key={ws.id}
                className="border border-warm-brown/20 rounded-lg px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{ws.title}</p>
                  <p className="text-sm text-warm-brown/60">
                    Grade {ws.grade} · {ws.subject} · {ws.template}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-soft-yellow text-warm-brown">
                    {ws.status}
                  </span>
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
