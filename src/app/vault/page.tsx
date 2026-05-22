import VaultBrowser from '@/components/vault/VaultBrowser'
import { getAssetsByType } from '@/lib/vault.query'
import type { VaultAsset, VaultAssetType } from '@/lib/vault.types'

const ASSET_TYPES: VaultAssetType[] = [
  'template',
  'worksheet',
  'caption',
  'prompt',
  'topic',
  'avatar',
  'brand-rule',
]

export default async function VaultPage() {
  let assets: VaultAsset[] = []
  let isOffline = false

  try {
    const results = await Promise.all(ASSET_TYPES.map((t) => getAssetsByType(t)))
    assets = results.flat()
  } catch {
    isOffline = true
  }

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-1">
          Memory
        </p>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-[38px] leading-[1.1]">Vault</h1>
          {!isOffline && (
            <p className="text-[13px] text-ink-3 mb-1">
              {assets.length} asset{assets.length !== 1 ? 's' : ''} indexed
            </p>
          )}
        </div>
      </div>
      <VaultBrowser assets={assets} isOffline={isOffline} />
    </div>
  )
}
