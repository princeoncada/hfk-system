import type { Metadata } from 'next'
import './globals.css'
import '@/styles/print.css'

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
    <html lang="en">
      <body className="min-h-screen bg-cream text-warm-brown">
        <header className="app-shell-header border-b border-warm-brown/20 px-6 py-4">
          <h1 className="text-xl font-display font-semibold">
            HFK Publishing Engine
          </h1>
          <p className="text-sm text-warm-brown/60 mt-0.5">
            Homeschooling for Kiddos — Internal Studio
          </p>
        </header>
        <main className="px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
