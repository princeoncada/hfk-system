# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-21
Current stable version: 1.0.0-stable
Current working version: 1.0.1-alpha

---

## Completed

- ~~Phase 1.0.0 — Bootstrap~~ (stable 2026-05-21)

---

## In Progress

(none)

---

## Planned

### Phase 1.1.0 — JSON Content Schema

Priority: Foundation

Define and validate the complete JSON content schema for worksheets.
Add sample content files. Add schema validation utility.

Scope:
- Define WorksheetContent JSON schema in full detail
- Create 2-3 sample worksheet JSON files under content/worksheets/
- Add src/lib/schema.ts with validation helpers
- Document the schema in docs/CONTENT_PHILOSOPHY.md

---

### Phase 1.2.0 — cozy_v1 Worksheet Template

Priority: Core feature

Build the first React worksheet template. Warm, cozy, child-friendly
layout. Deterministic output from JSON input.

Scope:
- src/components/templates/cozy_v1/WorksheetTemplate.tsx
- src/components/templates/cozy_v1/index.ts
- Print CSS in src/styles/print.css
- Document template spec in docs/TEMPLATE_GUIDE.md

---

### Phase 1.3.0 — Preview System

Priority: Core feature

Live preview route that renders worksheet JSON through the cozy_v1
template. Print mode toggle.

Scope:
- src/app/preview/[id]/page.tsx
- Print mode CSS class toggling
- Dashboard links to preview routes

---

### Phase 1.4.0 — Export System

Priority: Core feature (MVP requirement)

Puppeteer-based PDF and PNG export. Outputs saved to exports/.

Scope:
- Add puppeteer dependency
- src/lib/export.ts with exportToPDF() and exportToPNG()
- src/app/api/export/route.ts
- Export button on preview page
- Output to exports/pdf/ and exports/png/

---

### Phase 1.5.0 — Save + Archive

Priority: Core feature (MVP requirement)

Save new/edited JSON content to content/. Archive export outputs to
archives/.

Scope:
- src/lib/archive.ts
- Save content action
- Archive action after export
- Move exports to archives/[date]/

---

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
