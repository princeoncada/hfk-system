import type { Grade, Subject } from './types'

export interface PerformanceStat {
  date: string
  topic: string
  subject: Subject
  grade: Grade
  reach: number
  saves: number
  comments: number
}

export type RecommendationType = 'opportunity' | 'warning' | 'info'

export interface RecommendationCard {
  id: string
  type: RecommendationType
  headline: string
  rationale: string
  action: string
}

export interface HeatmapCell {
  subject: Subject
  grade: Grade
  avgReach: number
  postCount: number
}

export interface AnalyticsSnapshot {
  generatedAt: string
  isDemo: boolean
  aiSummary: string
  topPosts: PerformanceStat[]
  worstPosts: PerformanceStat[]
  heatmap: HeatmapCell[]
  recommendations: RecommendationCard[]
}
