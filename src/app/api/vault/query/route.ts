import { NextResponse } from 'next/server'
import { queryVault } from '@/lib/vault.query'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (typeof body.query !== 'string' || body.query.trim().length === 0) {
      return NextResponse.json(
        { error: 'query must be a non-empty string' },
        { status: 400 },
      )
    }

    const results = await queryVault({
      query: body.query,
      filters: body.filters,
      limit: body.limit,
    })

    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
