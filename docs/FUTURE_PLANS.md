# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-24
Current stable version: 4.5.0-stable
Current working version: 5.0.0-alpha

---

## Completed

- ~~Phase 1.0.0 â€” Bootstrap~~ (stable 2026-05-21)
- ~~Vault restructure (pre-1.1.0 housekeeping)~~ (stable 2026-05-21)
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
- ~~Phase 3.3.0 â€” Worksheet Builder~~ (stable 2026-05-23)
- ~~Patch 3.3.1 â€” Export Overhaul~~ (stable 2026-05-23)
- ~~Phase 3.4.0 â€” UI Animations + Onboarding~~ (stable 2026-05-23)
- ~~Patch 3.5.0 â€” Daily Review Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.1 â€” Generate Worksheet Crash Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.2 â€” Post-Stable Bug Versioning Rule~~ (stable 2026-05-23)
- ~~Patch 3.5.3 â€” 1-by-1 Commit Rule Hardening~~ (stable 2026-05-23)
- ~~Patch 3.5.4 â€” Version Ordering Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.5 â€” Mojibake + Missed Version Label Fix~~ (stable 2026-05-23)
- ~~Patch 3.5.6 â€” Generate Caption Crash Fix~~ (stable 2026-05-23)
- ~~Phase 3.6.0 â€” Instructions Flow~~ (stable 2026-05-24)
- ~~Patch 3.6.1 â€” Daily Review UI Improvements~~ (stable 2026-05-24)
- ~~Patch 3.6.2 â€” Daily Review UI/UX Fixes~~ (stable 2026-05-24)
- ~~Patch 3.6.3 â€” Final Package Lock and Worksheet Link~~ (stable 2026-05-24)
- ~~Patch 3.6.4 â€” Daily Review UX Polish + Print/Export Fixes~~ (stable 2026-05-24)
- ~~Patch 3.6.5 â€” Print/PDF Fix~~ (stable 2026-05-24)
- ~~Phase 3.7.0 â€” playful_v1 Illustrated Template~~ (stable 2026-05-24)
- ~~Patch 3.7.1 â€” Export Crop + Instructions Icon Fix~~ (stable 2026-05-24)
- ~~Phase 3.8.0 â€” Direction Overhaul~~ (stable 2026-05-24)
- ~~Phase 4.0.0 â€” Template Definition Schema + Dynamic Renderer~~ (stable 2026-05-24)
- ~~Phase 4.1.0 — Template Routes + List Page~~ (stable 2026-05-24)
- ~~Phase 4.2.0 — Canvas + Drag-and-Drop Slots~~ (stable 2026-05-24)
- ~~Phase 4.3.0 — Property Panel~~ (stable 2026-05-24)
- ~~Phase 4.4.0 — Live Preview + Publish~~ (stable 2026-05-24)
- ~~Phase 4.5.0 — Vault Ingestion + AI Template Recommendation~~ (stable 2026-05-24)

---

## In Progress

- Phase 5.0.0 — Workflow Core Hardening

Workflow Core Hardening: STATE.json machine-readable project state, scripts/promote.ps1 for automated stable promotion, docs/CODEX_RULES.md standing ruleset, CLAUDE.md session start protocol updated to read STATE.json, pre-4.x doc history archived.

---

## Planned

### Phase 5.1.0 — Automation Scripts

commit-phase.ps1, validate.ps1, compact strategy documentation.

---

## Potential Next Directions

After the 5.x workflow infrastructure series:

- Real analytics pipeline â€” replace mock data in /analytics with
  actual Facebook post performance data once publishing is active
- Export image from builder â€” add Save as Image to /worksheets/[id]
  editor page, not just /preview/[id]
- Mobile-responsive shell â€” current layout is desktop-only
- Multi-month planning â€” plan across months, not just one at a time

---

## Discarded / Won't Do

- Authentication and user management (single-operator tool, unnecessary)
- Database (Prisma, PostgreSQL) â€” filesystem-first is sufficient
- tRPC, TanStack Query â€” no server state management needed at MVP
- Cloud infrastructure â€” local-first is the architecture
- Automatic publishing â€” human review before any post goes live
- AI avatar generation â€” avatars are fixed assets only


