import { NextRequest, NextResponse } from 'next/server'
import { ingestAsset } from '@/lib/vault.ingest'
import { getAssetById } from '@/lib/vault.query'
import type { VaultLifecycle } from '@/lib/vault.types'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = (await req.json()) as { lifecycle?: VaultLifecycle }
    const { lifecycle } = body

    if (!lifecycle) {
      return NextResponse.json(
        { error: 'lifecycle field required' },
        { status: 400 },
      )
    }

    const asset = await getAssetById(params.id)
    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    const now = new Date().toISOString()
    const updated = {
      ...asset,
      lifecycle,
      updatedAt: now,
      ...(lifecycle === 'approved' ? { approvedAt: now } : {}),
      ...(lifecycle === 'archived' ? { archivedAt: now } : {}),
      ...(lifecycle === 'retired' ? { retiredAt: now } : {}),
    }

    await ingestAsset(updated)
    return NextResponse.json({ asset: updated })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
