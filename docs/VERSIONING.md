# HFK Publishing Engine - Versioning Reference

## Purpose

Authoritative versioning reference for all AI agents and contributors.
Read this file before touching any version-related documentation.

## Version Format

X.Y.Z semantic versioning.

Z — Patch: targeted fix, doc correction, single-file change.
Y — Minor: new feature or capability an operator would notice.
X — Major: architectural shift or production milestone.

## State Definitions

alpha   — Implemented, not yet validated.
beta    — Partially validated, known issues remain.
stable  — Fully validated, committed to master.

## Promotion Rules

alpha → stable (or beta → stable):
  All validation checks pass AND user commits to master.

stable → patch (regression):
  Any bug found after a stable release. ALWAYS open a new Z+1 patch.
  Never modify a stable release in place.
  The implementation prompt must bump all four versioning files to
  X.Y.(Z+1)-alpha as part of its implementation requirements.

## Four Versioning Locations

Every version change must be applied to all four simultaneously:
1. docs/VERSIONING.md (this file)
2. docs/AI_HANDOFF.md
3. docs/PHASE_LOG.md
4. README.md

## Current Version

| Field | Value |
| --- | --- |
| Version | 3.5.6-alpha |
| Phase | Patch 3.5.6 |
| State | alpha |
| Date | 2026-05-23 |
| Summary | Bug fix — Generate Caption crash: replace worksheetContent with worksheetTitle in caption fetch body. |

## Complete Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 3.5.6-alpha | Patch 3.5.6 — Generate Caption Crash Fix | alpha | 2026-05-23 | Bug fix — Generate Caption crash: replace worksheetContent with worksheetTitle in caption fetch body. |
| 3.5.5-stable | Patch 3.5.5 — Mojibake + Missed Version Label Fix | stable | 2026-05-23 | Docs hardening — fix UTF-8 mojibake for em dash, right arrow, and multiplication sign across PHASE_LOG.md, VERSIONING.md, AI_HANDOFF.md, README.md. Fix missed 3.4.0/3.4.1 version labels in AI_HANDOFF.md. |
| 3.5.4-stable | Patch 3.5.4 — Version Ordering Fix | stable | 2026-05-23 | Docs hardening — fix out-of-order version numbers (3.4→3.3.0, 3.4.1→3.3.1, 3.3→3.4.0) and add Version Ordering Rule to CLAUDE.md and WORKFLOW.md. |
| 3.5.3-stable | Patch 3.5.3 — 1-by-1 Commit Rule Hardening | stable | 2026-05-23 | Docs hardening — make implementation and stable-promotion commit blocks require one git add + one git commit per file, no exceptions and no grouping. |
| 3.5.2-stable | Patch 3.5.2 — Post-Stable Bug Versioning Rule | stable | 2026-05-23 | Docs hardening — encode post-stable bug = Z+1 rule in CLAUDE.md, WORKFLOW.md, and VERSIONING.md. |
| 3.5.1-stable | Patch 3.5.1 — Generate Worksheet Crash Fix | stable | 2026-05-23 | Fix Generate Worksheet crash: add missing template field to worksheet generation POST body and res.ok guards for worksheet/caption generation errors. |
| 3.5.0-stable | Patch 3.5.0 — Daily Review Fix | stable | 2026-05-23 | Direction pre-populated from today's Planner data. Generate Worksheet and Generate Caption buttons added. Template gate replaced with visual card selector. |
| 3.4.0-stable | Phase 3.4.0 — UI Animations + Onboarding | stable | 2026-05-23 | 4-step onboarding overlay (first-run + re-openable via Help button in sidebar). Framer Motion page transitions and sidebar nav micro-interactions. |
| 3.3.1-stable | Patch 3.3.1 — Export Overhaul | stable | 2026-05-23 | Removed PDF export. PNG export now client-side via html-to-image targeting the .worksheet element at 2x. Save As dialog via showSaveFilePicker with download fallback. No more server-side archiving on export. |
| 3.3.0-stable | Phase 3.3.0 — Worksheet Builder | stable | 2026-05-23 | Block-based worksheet builder. /worksheets route, drag-to-reorder sections, live preview, form editor, delete, AI regeneration modal. |
| 3.2.0-stable | Phase 3.2.0 — Analytics + Recommendations | stable | 2026-05-22 | Analytics + Recommendations — /analytics screen with AI-narrated demo summary, top/worst post lists, subject-grade heatmap, dismissible recommendation cards, and Analytics nav link added to sidebar. |
| 3.1.0-stable | Phase 3.1.0 — Vault Browser | stable | 2026-05-22 | Vault Browser — /vault standing asset library. 7 asset types, type filter tabs, name search, asset cards with freshness/lifecycle/usage data, lifecycle mutation actions (approve, archive, retire, resurrect). Vault nav link added to sidebar. |
| 3.0.0-stable | Phase 3.0.0 — Calendar Intelligence | stable | 2026-05-22 | Calendar Intelligence — bi-directional planner. Past cells show shipped/in-review status from package data. Future cells show plan + in-review state. Day detail panel includes gate-by-gate package summary. |
| 2.9.0-stable | Phase 2.9.0 — UI Design System | stable | 2026-05-22 | UI Design System — sidebar nav shell, full design token system (Inter + Instrument Serif + JetBrains Mono), card-based component redesign across all screens: Command Center, Daily Review, Monthly Planner. |
| 2.8.0-stable | Phase 2.8.0 — Monthly Planner | stable | 2026-05-22 | Monthly Planner — calendar grid UI, day detail panel, lock toggle, generate/regenerate, planner navigation links from command dashboard |
| 2.7.0-stable | Phase 2.7.0 — Daily Package Review | stable | 2026-05-22 | Daily Package Review screen at /review. 5-gate interactive approval flow with inline direction form, worksheet/caption display, provenance panel, reject form, redirect modal. Review link added to Command Center. |
| 2.6.0-stable | Phase 2.6.0 — AI Command Center | stable | 2026-05-22 | AI Command Center home screen. TodayStatus, MonthProgress, and VaultAlerts wired as async Server Components above the worksheet list. Direct filesystem reads — no API hops. |
| 2.5.0-stable | Phase 2.5.0 — Prompt Library API | stable | 2026-05-22 | Prompt Library API. GET /api/prompts lists Vault prompts via collection.get(). POST /api/prompts/assemble returns brand-voice-enriched ready-to-run prompts with placeholder interpolation. getAssetsByType() added to vault.query.ts for reliable flat asset listing. |
| 2.4.0-stable | Phase 2.4.0 — Planning Engine | stable | 2026-05-22 | Monthly planning engine. DeepSeek + Vault RAG generates full-month content proposals with subject/grade rotation, duplicate-topic detection, and per-day confidence scoring. Plans persisted to data/plans/. |
| 2.3.0-stable | Phase 2.3.0 — Approval Gate API | stable | 2026-05-22 | 5-gate approval state machine. Direction → Worksheet → Template → Caption → Final Package. Vault write-back on worksheet and caption gate approval. Package state persisted to data/packages/. |
| 2.2.0-stable | Phase 2.2.0 — DeepSeek Integration | stable | 2026-05-22 | DeepSeek integration with RAG pipeline — worksheet draft, caption draft, and daily summary endpoints |
| 2.1.0-stable | Phase 2.1.0 — ChromaDB Layer | stable | 2026-05-22 | Local ChromaDB vector database integration. Ingestion, query, and seed pipelines. Three API routes: /api/vault/ingest, /api/vault/query, /api/vault/seed. Seeds from existing worksheets, templates, avatars, and vault/ contents. |
| 2.0.0-stable | Phase 2.0.0 — Vault Schema | stable | 2026-05-22 | Vault asset type system. Defines TypeScript interfaces and Zod schemas for all Vault asset types (template, worksheet, caption, prompt, topic, avatar, brand-rule), lifecycle states, freshness model, reuse score, provenance tracking, and rejection records. |
| 1.5.2-stable | Patch 1.5.2 | stable | 2026-05-22 | Documentation patch — v2 phase queue defined. New backend-first phase sequence (2.0.0â€“3.1.0) replaces old planned phases (2.0.0â€“2.3.0). ChromaDB and DeepSeek architecture constraints documented. |
| 1.5.1-stable | Patch 1.5.1 | stable | 2026-05-21 | Validation hardening — require -LiteralPath for bracket paths in PowerShell |
| 1.5.0-stable | Phase 1.5.0 | stable | 2026-05-21 | Save + Archive — JSON editor UI, save API, archive-on-export |
| 1.4.1-stable | Patch 1.4.1 | stable | 2026-05-21 | Workflow hardening — Section 2 ownership, npm command rule, push block rule |
| 1.4.0-stable | Phase 1.4.0 | stable | 2026-05-21 | Export system — Puppeteer PDF + PNG export to exports/ |
| 1.3.0-stable | Phase 1.3.0 | stable | 2026-05-21 | Preview system — /preview/[id] route + print controls + getWorksheetById fix |
| 1.2.0-stable | Phase 1.2.0 | stable | 2026-05-21 | cozy_v1 worksheet template + print CSS |
| 1.1.0-stable | Phase 1.1.0 | stable | 2026-05-21 | JSON Content Schema — Zod validation + 3 sample worksheets |
| 1.0.5-stable | Patch 1.0.5 | stable | 2026-05-21 | Workflow hardening — remove Section 2, add upfront clarification step |
| 1.0.4-stable | Patch 1.0.4 | stable | 2026-05-21 | Vault restructure — consolidate numbered root folders into vault/ |
| 1.0.3-stable | Patch 1.0.3 | stable | 2026-05-21 | Workflow hardening — require stable-promotion prompt and commit block together |
| 1.0.2-stable | Patch 1.0.2 | stable | 2026-05-21 | Next.js config compatibility — replace next.config.ts with next.config.mjs |
| 1.0.1-stable | Patch 1.0.1 | stable | 2026-05-21 | Docs hardening — chathead opener + session checkpoint workflow |
| 1.0.0-stable | Phase 1.0.0 | stable | 2026-05-21 | Bootstrap — docs foundation + Next.js project scaffold |

## Validation Record — 3.5.5-stable

Date: 2026-05-23

- Version label fixes in AI_HANDOFF.md confirmed
- Version bump confirmed in all four versioning files
- Mojibake fix confirmed indirectly via clean em-dash display in grep output

## Validation Record — 3.5.0-stable

Date: 2026-05-23

- Build clean
- TypeScript zero errors
- Direction pre-population verified
- Generate Worksheet and Generate Caption buttons present
- Worksheet and caption draft state confirmed

## Validation Record — 3.5.1-stable

Date: 2026-05-23

- Build clean
- TypeScript zero errors
- Generate Worksheet no longer crashes
- Error display confirmed

## Validation Record — 3.5.2-stable

Date: 2026-05-23

- All 6 grep checks passed
- Rule present in CLAUDE.md, WORKFLOW.md, and VERSIONING.md
- Version bump confirmed in all four versioning files

## Validation Record — 3.5.3-stable

Date: 2026-05-23

- All 5 grep checks passed
- Rule present in CLAUDE.md and WORKFLOW.md in three locations
- Version bump confirmed in all four versioning files

## Validation Record — 3.5.4-stable

Date: 2026-05-23

- All 10 grep checks passed
- Version history ordering corrected in PHASE_LOG.md and VERSIONING.md
- Ordering rule confirmed in CLAUDE.md and WORKFLOW.md


## Next Phase

Current stable version: 3.5.5-stable
Current working version: 3.5.6-alpha
Next recommended phase: (none — full planned roadmap complete as of 3.3.0-stable)




