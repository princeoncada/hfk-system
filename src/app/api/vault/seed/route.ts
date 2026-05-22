import { NextResponse } from 'next/server'
import { seedAll } from '@/lib/vault.seed'

// Development-only endpoint for populating local ChromaDB from project files.
export async function POST() {
  try {
    const summary = await seedAll()
    return NextResponse.json({ summary })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
