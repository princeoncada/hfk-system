'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Command Center', href: '/', icon: 'home' },
  { label: 'Daily Review', href: '/review', icon: 'review' },
  { label: 'Planner', href: '/planner', icon: 'calendar' },
  { label: 'Worksheets', href: '/#worksheets', icon: 'doc' },
]

function NavIcon({ icon }: { icon: string }) {
  if (icon === 'home') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="10" width="18" height="11" rx="2" />
        <path d="M3 10l9-7 9 7" />
      </svg>
    )
  }

  if (icon === 'review') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7H3V5h11" />
      </svg>
    )
  }

  if (icon === 'calendar') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M10 12h5M10 16h5" />
    </svg>
  )
}

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === '/'
            ? pathname === '/'
            : item.href !== '/#worksheets' && pathname.startsWith(item.href)
        const className = [
          'flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-[13px]',
          active
            ? 'bg-cream-deep text-ink font-medium'
            : 'text-ink-3 hover:text-ink hover:bg-cream-deep transition-colors',
        ].join(' ')
        const content = (
          <>
            <NavIcon icon={item.icon} />
            <span>{item.label}</span>
          </>
        )

        if (item.href === '/#worksheets') {
          return (
            <a key={item.href} href={item.href} className={className}>
              {content}
            </a>
          )
        }

        return (
          <Link key={item.href} href={item.href} className={className}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}
