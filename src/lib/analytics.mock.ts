import type { AnalyticsSnapshot, HeatmapCell } from './analytics.types'
import type { Grade, Subject } from './types'

const SUBJECTS: Subject[] = [
  'math',
  'science',
  'reading',
  'vocabulary',
  'bible',
  'values',
]

const GRADES: Grade[] = [1, 2, 3, 4, 5, 6]

const HEATMAP_VALUES: Record<Subject, Array<[number, number]>> = {
  math: [
    [2180, 3],
    [3120, 4],
    [2860, 3],
    [1740, 2],
    [0, 0],
    [1460, 1],
  ],
  science: [
    [980, 2],
    [1240, 2],
    [1160, 1],
    [0, 0],
    [890, 1],
    [1320, 2],
  ],
  reading: [
    [1680, 3],
    [1960, 3],
    [1420, 2],
    [1180, 2],
    [0, 0],
    [1040, 1],
  ],
  vocabulary: [
    [760, 1],
    [1120, 2],
    [1340, 2],
    [980, 1],
    [0, 0],
    [820, 1],
  ],
  bible: [
    [2060, 3],
    [2480, 3],
    [3010, 4],
    [2240, 2],
    [1860, 2],
    [1540, 1],
  ],
  values: [
    [940, 1],
    [1260, 2],
    [1080, 1],
    [860, 1],
    [1140, 2],
    [0, 0],
  ],
}

function buildHeatmap(): HeatmapCell[] {
  return SUBJECTS.flatMap((subject) =>
    GRADES.map((grade, index) => {
      const [avgReach, postCount] = HEATMAP_VALUES[subject][index]
      return { subject, grade, avgReach, postCount }
    }),
  )
}

export function getMockSnapshot(): AnalyticsSnapshot {
  return {
    generatedAt: '2026-05-22T09:00:00.000Z',
    isDemo: true,
    aiSummary:
      'Your Math and Bible content consistently leads the page in reach and saves, with Grade 2 and Grade 3 posts outperforming other grade bands by roughly 40%. Reading and Vocabulary posts are generating strong save rates despite lower initial reach, suggesting high offline utility for homeschool families. Science Grade 4, Vocabulary Grade 5, Values Grade 6, and Math Grade 5 have had no approved content in the past 30 days and are strong candidates for your next planning session.',
    topPosts: [
      {
        date: '2026-05-18',
        topic: 'Multiplication arrays with skip-counting practice',
        subject: 'math',
        grade: 2,
        reach: 3380,
        saves: 236,
        comments: 42,
      },
      {
        date: '2026-05-14',
        topic: 'Bible character lesson on courage and obedience',
        subject: 'bible',
        grade: 3,
        reach: 3090,
        saves: 221,
        comments: 38,
      },
      {
        date: '2026-05-09',
        topic: 'Reading comprehension: finding the main idea',
        subject: 'reading',
        grade: 2,
        reach: 2640,
        saves: 188,
        comments: 27,
      },
      {
        date: '2026-05-06',
        topic: 'Fractions on a number line mini-lesson',
        subject: 'math',
        grade: 3,
        reach: 2470,
        saves: 171,
        comments: 23,
      },
      {
        date: '2026-05-03',
        topic: 'Kindness at home values reflection worksheet',
        subject: 'values',
        grade: 4,
        reach: 1890,
        saves: 96,
        comments: 15,
      },
    ],
    worstPosts: [
      {
        date: '2026-05-20',
        topic: 'Weather instruments vocabulary review',
        subject: 'science',
        grade: 5,
        reach: 610,
        saves: 28,
        comments: 4,
      },
      {
        date: '2026-05-16',
        topic: 'Synonym sorting for older elementary learners',
        subject: 'vocabulary',
        grade: 6,
        reach: 540,
        saves: 22,
        comments: 3,
      },
      {
        date: '2026-05-11',
        topic: 'Simple machines matching activity',
        subject: 'science',
        grade: 4,
        reach: 470,
        saves: 18,
        comments: 2,
      },
      {
        date: '2026-05-07',
        topic: 'Responsibility journal prompt',
        subject: 'values',
        grade: 6,
        reach: 390,
        saves: 13,
        comments: 1,
      },
      {
        date: '2026-05-01',
        topic: 'Context clues quick check',
        subject: 'vocabulary',
        grade: 5,
        reach: 310,
        saves: 9,
        comments: 1,
      },
    ],
    heatmap: buildHeatmap(),
    recommendations: [
      {
        id: 'math-grade-2-refresh',
        type: 'opportunity',
        headline: 'Return to Grade 2 multiplication this week',
        rationale:
          'Grade 2 Math is the highest-performing subject-grade band, but it has not had a fresh post in more than 14 days.',
        action: 'Plan one multiplication extension activity for the next open calendar slot.',
      },
      {
        id: 'science-grade-4-gap',
        type: 'warning',
        headline: 'Science Grade 4 has no recent coverage',
        rationale:
          'The heatmap shows zero posts for Science Grade 4 in the last 30 days, leaving a visible content gap.',
        action: 'Add a simple experiment or observation worksheet to the next planning pass.',
      },
      {
        id: 'multiplication-save-demand',
        type: 'opportunity',
        headline: 'Multiplication topics are being saved heavily',
        rationale:
          'Recent multiplication posts have strong save rates, which usually signals families want repeatable practice materials.',
        action: 'Create a short sequence of multiplication worksheets instead of a single standalone post.',
      },
      {
        id: 'demo-data-active',
        type: 'info',
        headline: 'Demo data is active',
        rationale:
          'These analytics are mocked until real performance data is connected to the publishing workflow.',
        action: 'Replace getMockSnapshot() with the production analytics source when metrics are available.',
      },
    ],
  }
}
