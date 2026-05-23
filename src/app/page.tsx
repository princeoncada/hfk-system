import MonthProgress from '@/components/command/MonthProgress'
import TodayStatus from '@/components/command/TodayStatus'
import VaultAlerts from '@/components/command/VaultAlerts'

export default async function DashboardPage() {
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
    </>
  )
}
