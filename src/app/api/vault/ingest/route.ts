import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { ingestAsset } from '@/lib/vault.ingest'
import { validateVaultAsset } from '@/lib/vault.schema'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const asset = validateVaultAsset(body.asset)

    await ingestAsset(asset)

    return NextResponse.json({ success: true, id: asset.id })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
