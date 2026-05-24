# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-24
Current stable version: 3.8.0-stable
Current working version: none

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

---

## In Progress

(none)

---

## Planned

### Phase 4.0.0 — Template Definition Schema + Dynamic Renderer

The data layer for custom templates. No editor UI yet.

- Define TypeScript interface and Zod schema for TemplateDefinition
  (palette, avatar, slots with grid position and style overrides)
- Dynamic renderer: React component that accepts TemplateDefinition +
  WorksheetContent and renders the same HTML contract as cozy_v1/playful_v1
- Store custom template definitions in vault/templates/ (ChromaDB-indexed,
  AI-recommendable based on subject/grade fit)
- Register custom templates alongside built-in templates in the review
  flow template selector

### Phase 4.1.0 — Template Editor UI

The Canva-like drag-and-drop editor. Depends on 4.0.0.

- Routes: /templates (list), /templates/new, /templates/[id]/edit
- dnd-kit drag-and-drop slot placement on a letter-sized canvas
- Slot types: header, vocabulary, activity, parent-notes, footer,
  decoration (SVG/avatar/banner overlays)
- Property panel: slot type, colors, border style, font overrides
- Avatar picker from assets/avatars/
- Color palette selector (HFK tokens + custom)
- Live preview panel (right side, uses dynamic renderer from 4.0.0)
- Save template definition to vault/templates/ on publish

### Phase 4.2.0 — Vault Ingestion + AI Template Recommendation

AI wiring for template recommendation. Depends on 4.0.0 and 4.1.0.

- Ingest saved template definitions into ChromaDB with subject/grade
  affinity metadata
- During review flow template selection step, AI queries vault for
  best-fit template for the day's grade, subject, and topic
- Reuse score increments on each approved package using that template
- Recommendation badge shown on best-fit template in selector

---

## Potential Next Directions

After the 4.x template builder series:

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
