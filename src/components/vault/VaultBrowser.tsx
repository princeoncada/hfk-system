'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type {
  VaultAsset,
  VaultAssetType,
  VaultLifecycle,
} from '@/lib/vault.types'

type TabId = 'all' | VaultAssetType

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'template', label: 'Templates' },
  { id: 'worksheet', label: 'Worksheets' },
  { id: 'caption', label: 'Captions' },
  { id: 'prompt', label: 'Prompts' },
  { id: 'topic', label: 'Topics' },
  { id: 'avatar', label: 'Avatars' },
  { id: 'brand-rule', label: 'Brand Rules' },
]

const LIFECYCLE_PILLS: Record<VaultLifecycle, string> = {
  draft: 'bg-yellow-tint text-[#7A5A11] border border-yellow/40',
  approved: 'bg-sage-tint text-sage-deep border border-sage/20',
  archived: 'bg-cream-deep text-ink-3 border border-[rgba(92,64,51,0.14)]',
  retired: 'bg-rose-tint text-rose border border-rose/25',
}

const FRESHNESS_DOT: Record<string, string> = {
  fresh: 'bg-sage',
  healthy: 'bg-sage-deep',
  stale_ish: 'bg-yellow',
  stale: 'bg-rose',
  retired: 'bg-ink-4',
}

const TYPE_LABELS: Record<VaultAssetType, string> = {
  template: 'Template',
  worksheet: 'Worksheet',
  caption: 'Caption',
  prompt: 'Prompt',
  topic: 'Topic',
  avatar: 'Avatar',
  'brand-rule': 'Brand Rule',
}

function getAssetDisplayName(asset: VaultAsset): string {
  if (asset.assetType === 'worksheet') return asset.title
  if (asset.assetType === 'topic') return asset.topicName
  if (asset.assetType === 'avatar') return asset.character
  return asset.name
}

function getAssetSubtitle(asset: VaultAsset): string {
  switch (asset.assetType) {
    case 'template':
      return `${asset.subjects.join(', ')} - ${asset.grades.join(', ')}`
    case 'worksheet':
      return `Grade ${asset.grade} - ${asset.subject}`
    case 'caption':
      return `${asset.subjects.join(', ')} - ${asset.grades.join(', ')}`
    case 'prompt':
      return `${asset.purpose} - ${asset.targetTool}`
    case 'topic':
      return `Grade ${asset.grade} - ${asset.subject}`
    case 'avatar':
      return asset.variant ?? 'default variant'
    case 'brand-rule':
      return asset.category
    default:
      return ''
  }
}

function getAvailableActions(
  lifecycle: VaultLifecycle,
): Array<{ label: string; target: VaultLifecycle; style: 'sage' | 'ghost' | 'rose' }> {
  switch (lifecycle) {
    case 'draft':
      return [{ label: 'Approve', target: 'approved', style: 'sage' }]
    case 'approved':
      return [
        { label: 'Archive', target: 'archived', style: 'ghost' },
        { label: 'Retire', target: 'retired', style: 'rose' },
      ]
    case 'archived':
      return [
        { label: 'Resurrect', target: 'approved', style: 'sage' },
        { label: 'Retire', target: 'retired', style: 'rose' },
      ]
    case 'retired':
      return [{ label: 'Resurrect', target: 'approved', style: 'sage' }]
    default:
      return []
  }
}

function AssetCard({
  asset,
  loadingId,
  onAction,
}: {
  asset: VaultAsset
  loadingId: string | null
  onAction: (id: string, target: VaultLifecycle) => void
}) {
  const actions = getAvailableActions(asset.lifecycle)
  const isLoading = loadingId === asset.id

  return (
    <div className="flex flex-col rounded-[14px] border border-[rgba(92,64,51,0.14)] bg-paper p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.12em] text-ink-3 uppercase">
          {TYPE_LABELS[asset.assetType]}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${LIFECYCLE_PILLS[asset.lifecycle]}`}
        >
          {asset.lifecycle}
        </span>
      </div>

      <p className="font-display text-[18px] leading-[1.2] text-ink mb-0.5 line-clamp-2">
        {getAssetDisplayName(asset)}
      </p>

      <p className="text-[12px] text-ink-3 mb-3">{getAssetSubtitle(asset)}</p>

      <div className="mb-3 flex flex-wrap items-center gap-3 text-[12px] text-ink-3">
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${FRESHNESS_DOT[asset.freshness] ?? 'bg-ink-4'}`}
          />
          {asset.freshness.replace('_', ' ')}
        </span>
        <span>
          <span className="font-mono text-ink">{asset.uses_30d}</span> uses/30d
        </span>
        <span>
          Score{' '}
          <span className="font-mono text-ink">{asset.reuseScore.toFixed(1)}</span>
        </span>
        {asset.lastUsed ? (
          <span>Last used {new Date(asset.lastUsed).toLocaleDateString('en-US')}</span>
        ) : null}
      </div>

      <div className="mb-3 h-1 w-full rounded-full bg-[rgba(92,64,51,0.08)]">
        <div
          className="h-1 rounded-full bg-sage transition-all"
          style={{ width: `${Math.min(asset.reuseScore * 100, 100)}%` }}
        />
      </div>

      {asset.tags && asset.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {asset.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream border border-[rgba(92,64,51,0.1)] px-2 py-0.5 text-[10px] text-ink-3"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {asset.assetType === 'topic' && asset.duplicateRisk && (
        <p className="mb-3 text-[11px] text-rose font-medium">
          Duplicate risk
        </p>
      )}

      {asset.rejection && (
        <p className="mb-3 text-[11px] text-rose bg-rose-tint/50 border border-rose/20 rounded-[6px] px-2.5 py-1.5">
          Rejected: {asset.rejection.reason}
          {asset.rejection.notes ? ` - ${asset.rejection.notes}` : ''}
        </p>
      )}

      {actions.length > 0 && (
        <div className="mt-auto pt-3 border-t border-[rgba(92,64,51,0.08)] flex flex-wrap gap-2">
          {actions.map((action) => {
            const baseClass =
              'rounded-[8px] px-3 py-1.5 text-[12px] font-medium transition-colors disabled:opacity-40'
            const styleMap = {
              sage: 'bg-sage text-white hover:bg-sage-deep',
              ghost:
                'border border-[rgba(92,64,51,0.14)] text-ink-2 hover:bg-cream-deep',
              rose: 'bg-rose-tint text-rose border border-rose/25 hover:bg-rose/10',
            }
            return (
              <button
                key={action.target}
                onClick={() => onAction(asset.id, action.target)}
                disabled={isLoading}
                className={`${baseClass} ${styleMap[action.style]}`}
              >
                {isLoading ? '...' : action.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function VaultBrowser({
  assets,
  isOffline,
}: {
  assets: VaultAsset[]
  isOffline: boolean
}) {
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [search, setSearch] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [localAssets, setLocalAssets] = useState(assets)
  const router = useRouter()

  const filtered = localAssets.filter((asset) => {
    const matchesTab = activeTab === 'all' || asset.assetType === activeTab
    const q = search.trim().toLowerCase()
    const matchesSearch =
      q === '' ||
      getAssetDisplayName(asset).toLowerCase().includes(q) ||
      (asset.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
    return matchesTab && matchesSearch
  })

  async function handleLifecycle(assetId: string, target: VaultLifecycle) {
    setLoadingId(assetId)
    const previousAssets = localAssets
    setLocalAssets((current) =>
      current.map((asset) =>
        asset.id === assetId
          ? { ...asset, lifecycle: target, updatedAt: new Date().toISOString() }
          : asset,
      ),
    )
    try {
      const response = await fetch(`/api/vault/asset/${assetId}/lifecycle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lifecycle: target }),
      })
      if (!response.ok) throw new Error('Lifecycle update failed')
      router.refresh()
    } catch {
      setLocalAssets(previousAssets)
    } finally {
      setLoadingId(null)
    }
  }

  if (isOffline) {
    return (
      <div className="rounded-[14px] border border-[rgba(92,64,51,0.14)] bg-paper px-6 py-8 text-center shadow-card">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase mb-2">
          Vault Offline
        </p>
        <p className="font-display text-[22px] text-ink mb-2">
          ChromaDB is not running.
        </p>
        <p className="text-[13px] text-ink-3">
          Start it with:{' '}
          <code className="font-mono text-[12px] bg-cream-deep px-1.5 py-0.5 rounded-[5px]">
            chroma run --path ./chroma-data
          </code>
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-[10px] border border-[rgba(92,64,51,0.14)] bg-paper px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage/50"
        />
      </div>

      <div className="mb-5 flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const active = activeTab === tab.id
          const count =
            tab.id === 'all'
              ? localAssets.length
              : localAssets.filter((asset) => asset.assetType === tab.id).length

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                active
                  ? 'bg-ink text-cream rounded-[8px] px-3 py-1.5 text-[13px] font-medium'
                  : 'bg-transparent text-ink-3 hover:text-ink hover:bg-cream-deep rounded-[8px] px-3 py-1.5 text-[13px] transition-colors'
              }
            >
              {tab.label}
              <span
                className={
                  active
                    ? 'bg-[rgba(247,242,232,0.2)] text-cream/70 rounded-full px-1.5 text-[11px] ml-1.5'
                    : 'bg-cream-deep text-ink-3 rounded-full px-1.5 text-[11px] ml-1.5'
                }
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[14px] border border-[rgba(92,64,51,0.14)] bg-paper px-6 py-10 text-center">
          <p className="text-[14px] text-ink-3">No assets match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              loadingId={loadingId}
              onAction={(id, target) => void handleLifecycle(id, target)}
            />
          ))}
        </div>
      )}
    </>
  )
}
