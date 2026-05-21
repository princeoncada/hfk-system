# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-21
Current stable version: 1.4.1-stable
Current working version: 1.5.0-alpha

---

## Completed

- ~~Phase 1.0.0 — Bootstrap~~ (stable 2026-05-21)
- ~~Vault restructure (pre-1.1.0 housekeeping)~~ (committed 2026-05-21)
- ~~Phase 1.1.0 — JSON Content Schema~~ (stable 2026-05-21)
- ~~Phase 1.2.0 — cozy_v1 Worksheet Template~~ (stable 2026-05-21)
- ~~Phase 1.3.0 — Preview System~~ (stable 2026-05-21)
- ~~Phase 1.4.0 — Export System~~ (stable 2026-05-21)
- ~~Phase 1.5.0 — Save + Archive~~ (alpha 2026-05-21)

---

## In Progress

(none)

---

## Planned

## Post-MVP Planned

### Phase 2.0.0 — Facebook Post Template

Build a separate template for Facebook image posts. facebook_v1.
JSON schema extension for post content.

### Phase 2.1.0 — Content Calendar

Simple content planning view. Dates, subjects, statuses.
JSON-backed, no database.

### Phase 2.2.0 — Caption Generator

AI-assisted caption drafts from worksheet JSON content.
Human reviews before use.

### Phase 2.3.0 — Prompt Library

Managed library of reusable AI generation prompts.
Stored as JSON. Version-controlled.

---

## Discarded / Won't Do

- Authentication and user management (single-operator tool, unnecessary)
- Database (Prisma, PostgreSQL) — filesystem-first is sufficient
- tRPC, TanStack Query — no server state management needed at MVP
- Cloud infrastructure — local-first is the architecture
- Automatic publishing — human review before any post goes live
- AI avatar generation — avatars are fixed assets only
