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
      <section
        className={
          dupRiskTopics.length > 0
            ? 'bg-rose-tint border border-rose/20 rounded-[14px] px-6 py-5 shadow-card'
            : 'bg-sage-tint border border-sage/20 rounded-[14px] px-6 py-5 shadow-card'
        }
      >
        <p
          className={
            dupRiskTopics.length > 0
              ? 'font-mono text-[11px] tracking-[0.14em] uppercase mb-1 text-rose/70'
              : 'font-mono text-[11px] tracking-[0.14em] uppercase mb-1 text-sage-deep/70'
          }
        >
          Vault
        </p>
        {dupRiskTopics.length > 0 ? (
          <>
            <h2 className="font-display text-[20px] text-[#8C3D31]">
              {dupRiskTopics.length} duplicate risk
            </h2>
            <p className="text-[13px] text-ink-3 mt-1">{totalVaultCount} assets</p>
            <ul className="mt-2 space-y-0.5">
              {dupRiskTopics.map((topic) => (
                <li key={topic.id} className="text-[12px] text-[#8C3D31]">
                  {topic.topicName} - Grade {topic.grade} {topic.subject}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2 className="font-display text-[20px] text-sage-deep">
              Vault clear
            </h2>
            <p className="text-[13px] text-ink-3 mt-1">{totalVaultCount} assets</p>
            <p className="text-[13px] text-sage-deep mt-1">
              No duplicate risk topics flagged.
            </p>
          </>
        )}
      </section>
    )
  } catch {
    return (
      <section className="bg-paper border border-[rgba(92,64,51,0.14)] rounded-[14px] px-6 py-5 shadow-card">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase mb-1 text-ink-3">
          Vault
        </p>
        <h2 className="font-display text-[20px] text-ink">Vault offline</h2>
        <p className="text-[13px] text-ink-3 mt-1">
          Start ChromaDB to see alerts.
        </p>
      </section>
    )
  }
}
