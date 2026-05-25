# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-25
Current stable version: 5.2.7-stable
Current working version: 5.2.8-alpha

---

## Completed

- ~~Phase 1.0.0 — Bootstrap~~ (stable 2026-05-21)
- ~~Vault restructure (pre-1.1.0 housekeeping)~~ (stable 2026-05-21)
- ~~Phase 1.1.0 — JSON Content Schema~~ (stable 2026-05-21)
- ~~Phase 1.2.0 — cozy_v1 Worksheet Template~~ (stable 2026-05-21)
- ~~Phase 1.3.0 — Preview System~~ (stable 2026-05-21)
- ~~Phase 1.4.0 — Export System~~ (stable 2026-05-21)
- ~~Phase 1.5.0 — Save + Archive~~ (stable 2026-05-21)
- ~~Phase 2.0.0 — Vault Schema~~ (stable 2026-05-22)
- ~~Phase 2.1.0 — ChromaDB Layer~~ (stable 2026-05-22)
- ~~Phase 2.2.0 — DeepSeek Integration~~ (stable 2026-05-22)
- ~~Phase 2.3.0 — Approval Gate API~~ (stable 2026-05-22)
- ~~Phase 2.4.0 — Planning Engine~~ (stable 2026-05-22)
- ~~Phase 2.5.0 — Prompt Library API~~ (stable 2026-05-22)
- ~~Phase 2.6.0 — AI Command Center~~ (stable 2026-05-22)
- ~~Phase 2.7.0 — Daily Package Review~~ (stable 2026-05-22)
- ~~Phase 2.8.0 — Monthly Planner~~ (stable 2026-05-22)
- ~~Phase 2.9.0 — UI Design System~~ (stable 2026-05-22)
- ~~Phase 3.0.0 — Calendar Intelligence~~ (stable 2026-05-22)
- ~~Phase 3.1.0 — Vault Browser~~ (stable 2026-05-22)
- ~~Phase 3.2.0 — Analytics + Recommendations~~ (stable 2026-05-22)
- ~~Phase 3.3.0 — Worksheet Builder~~ (stable 2026-05-23)
- ~~Patch 3.3.1 — Export Overhaul~~ (stable 2026-05-23)
- ~~Phase 3.4.0 — UI Animations + Onboarding~~ (stable 2026-05-23)
- ~~Patch 3.5.0 — Daily Review Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.1 — Generate Worksheet Crash Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.2 — Post-Stable Bug Versioning Rule~~ (stable 2026-05-23)
- ~~Patch 3.5.3 — 1-by-1 Commit Rule Hardening~~ (stable 2026-05-23)
- ~~Patch 3.5.4 — Version Ordering Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.5 — Mojibake + Missed Version Label Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.6 — Generate Caption Crash Fix~~ (stable 2026-05-23)
- ~~Phase 3.6.0 — Instructions Flow~~ (stable 2026-05-24)
- ~~Patch 3.6.1 — Daily Review UI Improvements~~ (stable 2026-05-24)
- ~~Patch 3.6.2 — Daily Review UI/UX Fixes~~ (stable 2026-05-24)
- ~~Patch 3.6.3 — Final Package Lock and Worksheet Link~~ (stable 2026-05-24)
- ~~Patch 3.6.4 — Daily Review UX Polish + Print/Export Fixes~~ (stable 2026-05-24)
- ~~Patch 3.6.5 — Print/PDF Fix~~ (stable 2026-05-24)
- ~~Phase 3.7.0 — playful_v1 Illustrated Template~~ (stable 2026-05-24)
- ~~Patch 3.7.1 — Export Crop + Instructions Icon Fix~~ (stable 2026-05-24)
- ~~Phase 3.8.0 — Direction Overhaul~~ (stable 2026-05-24)
- ~~Phase 4.0.0 — Template Definition Schema + Dynamic Renderer~~ (stable 2026-05-24)
- ~~Phase 4.1.0 — Template Routes + List Page~~ (stable 2026-05-24)
- ~~Phase 4.2.0 — Canvas + Drag-and-Drop Slots~~ (stable 2026-05-24)
- ~~Phase 4.3.0 — Property Panel~~ (stable 2026-05-24)
- ~~Phase 4.4.0 — Live Preview + Publish~~ (stable 2026-05-24)
- ~~Phase 4.5.0 — Vault Ingestion + AI Template Recommendation~~ (stable 2026-05-24)
- ~~Phase 5.0.0 — Workflow Core Hardening~~ (stable 2026-05-24)
- ~~Patch 5.0.1 — Mojibake + State Column Fix~~ (stable 2026-05-24)
- ~~Patch 5.0.2 — Mojibake Repair Completion~~ (stable 2026-05-24)
- ~~Phase 5.1.0 — Automation Scripts~~ (stable 2026-05-24)
- ~~Phase 5.2.0 — Graphify-Ready Codebase Graph~~ (stable 2026-05-24)
- ~~Patch 5.2.1 — Real Graphify Output~~ (stable 2026-05-24)
- ~~Patch 5.2.2 — Graphify Workflow Clarification~~ (stable 2026-05-25)
- ~~Patch 5.2.3 — Graphify Server/Tool Mode~~ (stable 2026-05-25)
- ~~Patch 5.2.4 — Graphify Install Integration + CLI Syntax Fix~~ (stable 2026-05-25)
- ~~Patch 5.2.5 — Graphify CLI Syntax Re-correction + Query Behavior Docs~~ (stable 2026-05-25)
- ~~Patch 5.2.6 — Graph Refresh Automation + generate_codebase_graph.py Fix~~ (stable 2026-05-25)
- ~~Patch 5.2.7 — read_version() Encoding Fix~~ (stable 2026-05-25)

---

## In Progress

(none)

---

## Planned

### ~~Phase 5.3.0 — ChromaDB Docs Extension~~
Superseded — use existing ChromaDB infrastructure.

Ingest all docs files (PHASE_LOG.md, AI_HANDOFF.md, FUTURE_PLANS.md, DECISIONS.md,
BRAND_GUIDE.md, etc.) into a new hfk_docs ChromaDB collection. Add a query helper
so Claude Code can answer "what was the decision for X?" with a semantic query
instead of reading entire files. Estimated Claude Code token reduction: ~15–20%
on session starts and planning turns.

### Phase 5.4.0 — Portfolio Case Studies
Two documents under docs/case-studies/:
- Case Study A — Docs-Led AI Workflow: How structured documentation replaced
  ad-hoc prompting and created a reproducible AI-assisted build process.
- Case Study B — Token Optimization Journey: Specific optimizations made in the
  5.x series and measurable token reduction at each step.
Serves as portfolio material and a compact onboarding reference for future
AI sessions. Indirect token reduction: ~10%.

### Phase 5.5.0 — Advanced Memory Layer
Integrate Zep or Mem0 as a persistent memory server. Replace the file-based
memory/ system with query-based memory retrieval. Session start reads STATE.json
and queries memory instead of opening multiple large docs. Estimated Claude Code
token reduction: ~30–40% on session start overhead.

## Potential Next Directions

After the 5.x workflow infrastructure series:

- Real analytics pipeline — replace mock data in /analytics with
  actual Facebook post performance data once publishing is active
- Export image from builder — add Save as Image to /worksheets/[id]
  editor page, not just /preview/[id]
- Mobile-responsive shell — current layout is desktop-only
- Multi-month planning — plan across months, not just one at a time

---

## Discarded / Won't Do

- Authentication and user management (single-operator tool, unnecessary)
- Database (Prisma, PostgreSQL) — filesystem-first is sufficient
- tRPC, TanStack Query — no server state management needed at MVP
- Cloud infrastructure — local-first is the architecture
- Automatic publishing — human review before any post goes live
- AI avatar generation — avatars are fixed assets only


