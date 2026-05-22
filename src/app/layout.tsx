import type { Metadata } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import SidebarNav from '@/components/shell/SidebarNav'
import './globals.css'
import '@/styles/print.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HFK Publishing Engine',
  description: 'Internal content publishing studio for Homeschooling for Kiddos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-cream text-ink font-sans antialiased">
        <div className="flex min-h-screen">
          <aside className="no-print w-[220px] shrink-0 border-r border-[rgba(92,64,51,0.14)] bg-paper flex flex-col">
            <div className="px-5 py-5 border-b border-[rgba(92,64,51,0.08)]">
              <div className="flex items-center gap-2.5">
                <span className="w-[22px] h-[22px] rounded-[6px] bg-ink text-cream grid place-items-center font-display text-[14px] leading-none shrink-0">
                  H
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-ink leading-none">
                    HFK
                  </div>
                  <div className="text-[11px] text-ink-3 mt-0.5 leading-none">
                    Publishing Engine
                  </div>
                </div>
              </div>
            </div>
            <nav className="flex-1 px-3 py-4">
              <SidebarNav />
            </nav>
            <div className="px-4 py-4 border-t border-[rgba(92,64,51,0.08)]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-sage-tint text-sage-deep border border-sage/20">
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                Vault online
              </span>
            </div>
          </aside>

          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="px-8 py-8 max-w-5xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
