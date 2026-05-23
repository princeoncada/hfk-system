# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-23
Current stable version: 3.4.0-stable
Current working version: none

---

## Completed

- ~~Phase 1.0.0 — Bootstrap~~ (stable 2026-05-21)
- ~~Vault restructure (pre-1.1.0 housekeeping)~~ (committed 2026-05-21)
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

- ~~Phase 3.4.0 — Worksheet Builder~~ (stable 2026-05-23)

---

## In Progress

(none)

---

## Planned

### Phase 3.4.1 — Export Overhaul

Remove PDF export button (use browser print instead). Fix PNG image export -
clip to the worksheet element instead of full page to eliminate padding/border
artifact. Add Save As dialog using the File System Access API
(showSaveFilePicker) with a download-attribute fallback for unsupported
browsers.

### Phase 3.3.0 — UI Animations + Onboarding

Motion design pass and first-run onboarding flow. Deferred from design system phase.
Add micro-interactions, page transitions, and an onboarding overlay that orients
new operators to the 5-gate workflow and Vault on first visit.

---

## Discarded / Won't Do

- Authentication and user management (single-operator tool, unnecessary)
- Database (Prisma, PostgreSQL) — filesystem-first is sufficient
- tRPC, TanStack Query — no server state management needed at MVP
- Cloud infrastructure — local-first is the architecture
- Automatic publishing — human review before any post goes live
- AI avatar generation — avatars are fixed assets only
- Relational database (Prisma, PostgreSQL) — filesystem-first for content JSON; ChromaDB is the local vector search layer and is not a relational DB replacement
