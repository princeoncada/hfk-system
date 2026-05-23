# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-23
Current stable version: 3.3.0-stable
Current working version: none

---

## Completed

- ~~Phase 1.0.0 â€” Bootstrap~~ (stable 2026-05-21)
- ~~Vault restructure (pre-1.1.0 housekeeping)~~ (committed 2026-05-21)
- ~~Phase 1.1.0 â€” JSON Content Schema~~ (stable 2026-05-21)
- ~~Phase 1.2.0 â€” cozy_v1 Worksheet Template~~ (stable 2026-05-21)
- ~~Phase 1.3.0 â€” Preview System~~ (stable 2026-05-21)
- ~~Phase 1.4.0 â€” Export System~~ (stable 2026-05-21)
- ~~Phase 1.5.0 â€” Save + Archive~~ (stable 2026-05-21)
- ~~Phase 2.0.0 â€” Vault Schema~~ (stable 2026-05-22)
- ~~Phase 2.1.0 â€” ChromaDB Layer~~ (stable 2026-05-22)
- ~~Phase 2.2.0 â€” DeepSeek Integration~~ (stable 2026-05-22)
- ~~Phase 2.3.0 â€” Approval Gate API~~ (stable 2026-05-22)
- ~~Phase 2.4.0 â€” Planning Engine~~ (stable 2026-05-22)
- ~~Phase 2.5.0 â€” Prompt Library API~~ (stable 2026-05-22)
- ~~Phase 2.6.0 â€” AI Command Center~~ (stable 2026-05-22)
- ~~Phase 2.7.0 â€” Daily Package Review~~ (stable 2026-05-22)
- ~~Phase 2.8.0 â€” Monthly Planner~~ (stable 2026-05-22)
- ~~Phase 2.9.0 â€” UI Design System~~ (stable 2026-05-22)
- ~~Phase 3.0.0 â€” Calendar Intelligence~~ (stable 2026-05-22)
- ~~Phase 3.1.0 â€” Vault Browser~~ (stable 2026-05-22)
- ~~Phase 3.2.0 â€” Analytics + Recommendations~~ (stable 2026-05-22)

- ~~Phase 3.4.0 â€” Worksheet Builder~~ (stable 2026-05-23)
- ~~Patch 3.4.1 â€” Export Overhaul~~ (stable 2026-05-23)
- ~~Phase 3.3.0 — UI Animations + Onboarding~~ (stable 2026-05-23)

---

## In Progress

(none)

---

## Planned

(none — full planned roadmap complete)

---

## Potential Next Directions

The core publishing workflow is complete. Possible future work:

- Real analytics pipeline — replace mock data in /analytics with
  actual Facebook post performance data once publishing is active
- Export image from builder — add Save as Image to /worksheets/[id]
  builder page, not just /preview/[id]
- Additional worksheet templates — new visual layouts beyond cozy_v1
- Mobile-responsive shell — current layout is desktop-only
- Multi-month planning — plan across months, not just one at a time

---

## Discarded / Won't Do

- Authentication and user management (single-operator tool, unnecessary)
- Database (Prisma, PostgreSQL) â€” filesystem-first is sufficient
- tRPC, TanStack Query â€” no server state management needed at MVP
- Cloud infrastructure â€” local-first is the architecture
- Automatic publishing â€” human review before any post goes live
- AI avatar generation â€” avatars are fixed assets only
- Relational database (Prisma, PostgreSQL) â€” filesystem-first for content JSON; ChromaDB is the local vector search layer and is not a relational DB replacement


