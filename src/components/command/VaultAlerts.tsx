import { getAssetsByType } from '@/lib/vault.query'
import type { VaultTopic } from '@/lib/vault.types'

function isTopic(asset: unknown): asset is VaultTopic {
  return (
    asset !== null &&
    typeof asset === 'object' &&
    (asset as VaultTopic).assetType === 'topic'
  )
}

export default async function VaultAlerts() {
  try {
    const allTopics = await getAssetsByType('topic')
    const dupRiskTopics = allTopics.filter(
      (asset): asset is VaultTopic =>
        isTopic(asset) && asset.duplicateRisk === true,
    )
    const totalVaultCount =
      (
        await Promise.all([
          getAssetsByType('worksheet'),
          getAssetsByType('template'),
          getAssetsByType('prompt'),
          getAssetsByType('brand-rule'),
          getAssetsByType('avatar'),
        ])
      ).reduce((sum, assets) => sum + assets.length, 0) + allTopics.length

    return (
      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold">Vault</h2>
          <span className="text-sm text-warm-brown/60">
            {totalVaultCount} assets
          </span>
        </div>

        {dupRiskTopics.length > 0 ? (
          <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-sm font-medium text-amber-700">
              {dupRiskTopics.length} topic
              {dupRiskTopics.length > 1 ? 's' : ''} flagged as duplicate risk
            </p>
            <ul className="mt-1 space-y-0.5">
              {dupRiskTopics.map((topic) => (
                <li key={topic.id} className="text-xs text-amber-600">
                  {topic.topicName} — Grade {topic.grade} {topic.subject}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-2 text-sm text-warm-brown/50">
            No duplicate risk topics flagged.
          </p>
        )}
      </section>
    )
  } catch {
    return (
      <section>
        <h2 className="font-display text-2xl font-semibold">Vault</h2>
        <div className="mt-2 rounded-lg border border-warm-brown/20 px-4 py-3">
          <p className="text-sm text-warm-brown/40">
            Vault offline — start ChromaDB to see alerts.
          </p>
        </div>
      </section>
    )
  }
}
