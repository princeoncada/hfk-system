'use client'

import { Fragment, useEffect, useState } from 'react'
import type {
  AnalyticsSnapshot,
  PerformanceStat,
  RecommendationCard,
  RecommendationType,
} from '@/lib/analytics.types'
import type { Grade, Subject } from '@/lib/types'

const DISMISSED_KEY = 'hfk-dismissed-recommendations'
const SUBJECTS: Subject[] = [
  'math',
  'science',
  'reading',
  'vocabulary',
  'bible',
  'values',
]
const GRADES: Grade[] = [1, 2, 3, 4, 5, 6]

const RECOMMENDATION_PILLS: Record<RecommendationType, string> = {
  opportunity: 'bg-sage-tint text-sage-deep',
  warning: 'bg-rose-tint text-rose',
  info: 'bg-yellow-tint text-ink-2',
}

function subjectLabel(subject: Subject): string {
  return subject.charAt(0).toUpperCase() + subject.slice(1)
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatCompactReach(value: number): string {
  if (value === 0) return '-'
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return value.toString()
}

function heatmapCellClass(avgReach: number): string {
  if (avgReach === 0) return 'bg-cream text-ink-4'
  if (avgReach >= 3000) return 'bg-sage-deep text-cream'
  if (avgReach >= 2000) return 'bg-sage text-cream'
  if (avgReach >= 1000) return 'bg-sage-tint text-sage-deep'
  return 'bg-sage-tint/60 text-sage-deep'
}

function PostListCard({
  title,
  titleClass,
  headerClass,
  posts,
}: {
  title: string
  titleClass: string
  headerClass: string
  posts: PerformanceStat[]
}) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[rgba(92,64,51,0.14)] bg-paper shadow-card">
      <div className={`${headerClass} px-5 py-3`}>
        <p
          className={`font-mono text-[11px] tracking-[0.14em] uppercase ${titleClass}`}
        >
          {title}
        </p>
      </div>
      <div>
        {posts.map((post) => (
          <div
            key={`${post.date}-${post.topic}`}
            className="flex items-start justify-between gap-4 border-b border-[rgba(92,64,51,0.08)] px-5 py-3 last:border-0"
          >
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-ink">{post.topic}</p>
              <p className="mt-0.5 text-[11px] text-ink-4">{post.date}</p>
              <p className="mt-1 text-[11px] text-ink-3">
                {subjectLabel(post.subject)} &middot; Grade {post.grade}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-[15px] font-medium text-ink">
                {formatNumber(post.reach)}
              </p>
              <p className="text-[11px] text-ink-3">{post.saves} saves</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecommendationItem({
  card,
  onDismiss,
}: {
  card: RecommendationCard
  onDismiss: (id: string) => void
}) {
  return (
    <div className="relative rounded-[14px] border border-[rgba(92,64,51,0.14)] bg-paper p-5 shadow-card">
      <span
        className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-medium uppercase ${RECOMMENDATION_PILLS[card.type]}`}
      >
        {card.type}
      </span>
      <button
        type="button"
        onClick={() => onDismiss(card.id)}
        className="absolute right-4 top-4 text-[16px] leading-none text-ink-4 transition-colors hover:text-ink"
        aria-label={`Dismiss ${card.headline}`}
      >
        &times;
      </button>
      <p className="mt-3 font-display text-[17px] leading-snug text-ink">
        {card.headline}
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-3">
        {card.rationale}
      </p>
      <p className="mt-3 text-[12px] font-medium text-sage">
        &rarr; {card.action}
      </p>
    </div>
  )
}

export default function AnalyticsDashboard({
  snapshot,
}: {
  snapshot: AnalyticsSnapshot
}) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([])

  useEffect(() => {
    const raw = window.localStorage.getItem(DISMISSED_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setDismissedIds(parsed.filter((id) => typeof id === 'string'))
      }
    } catch {
      setDismissedIds([])
    }
  }, [])

  function persistDismissed(next: string[]) {
    setDismissedIds(next)
    window.localStorage.setItem(DISMISSED_KEY, JSON.stringify(next))
  }

  function dismissRecommendation(id: string) {
    persistDismissed(Array.from(new Set([...dismissedIds, id])))
  }

  function resetRecommendations() {
    window.localStorage.removeItem(DISMISSED_KEY)
    setDismissedIds([])
  }

  const visibleRecommendations = snapshot.recommendations.filter(
    (card) => !dismissedIds.includes(card.id),
  )

  return (
    <div>
      <section className="rounded-[14px] bg-ink p-6 text-cream shadow-lift">
        <div className="mb-4 flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.14em] text-cream/50 uppercase">
            AI Summary
          </p>
          {snapshot.isDemo && (
            <span className="rounded-full bg-yellow px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink">
              Demo Data
            </span>
          )}
        </div>
        <p className="font-display text-[18px] leading-relaxed text-cream">
          {snapshot.aiSummary}
        </p>
        <p className="mt-5 font-mono text-[11px] text-cream/40">
          Generated {new Date(snapshot.generatedAt).toISOString()}
        </p>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PostListCard
          title="Top Posts"
          titleClass="text-sage-deep"
          headerClass="bg-sage-tint"
          posts={snapshot.topPosts}
        />
        <PostListCard
          title="Needs Attention"
          titleClass="text-rose"
          headerClass="bg-rose-tint"
          posts={snapshot.worstPosts}
        />
      </div>

      <section className="mt-5 rounded-[14px] border border-[rgba(92,64,51,0.14)] bg-paper p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
            Subject &times; Grade Performance
          </p>
          <p className="text-[11px] text-ink-4">avg reach per post</p>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div />
          {GRADES.map((grade) => (
            <div
              key={grade}
              className="text-center font-mono text-[11px] text-ink-3"
            >
              Gr.{grade}
            </div>
          ))}
          {SUBJECTS.map((subject) => (
            <Fragment key={subject}>
              <div
                key={`${subject}-label`}
                className="flex items-center font-mono text-[12px] text-ink-2"
              >
                {subjectLabel(subject)}
              </div>
              {GRADES.map((grade) => {
                const cell = snapshot.heatmap.find(
                  (item) => item.subject === subject && item.grade === grade,
                )
                const avgReach = cell?.avgReach ?? 0
                const postCount = cell?.postCount ?? 0

                return (
                  <div
                    key={`${subject}-${grade}`}
                    className={`flex aspect-square w-full flex-col items-center justify-center rounded-[6px] ${heatmapCellClass(avgReach)}`}
                    title={`${subjectLabel(subject)} Grade ${grade}: ${postCount} posts`}
                  >
                    {postCount === 0 ? (
                      <span className="font-mono text-[11px]">&mdash;</span>
                    ) : (
                      <>
                        <span className="font-mono text-[11px]">
                          {formatCompactReach(avgReach)}
                        </span>
                        <span className="mt-0.5 text-[9px] opacity-70">
                          {postCount} post{postCount !== 1 ? 's' : ''}
                        </span>
                      </>
                    )}
                  </div>
                )
              })}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">
          Recommendations
        </p>
        {visibleRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {visibleRecommendations.map((card) => (
              <RecommendationItem
                key={card.id}
                card={card}
                onDismiss={dismissRecommendation}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[14px] border border-[rgba(92,64,51,0.14)] bg-cream px-6 py-8 text-center">
            <p className="text-[14px] text-ink-3">
              All recommendations dismissed. Refresh to reset.
            </p>
            <button
              type="button"
              onClick={resetRecommendations}
              className="mt-4 rounded-[10px] bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-[#1a120e]"
            >
              Reset
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
