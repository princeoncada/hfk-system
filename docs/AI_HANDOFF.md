# AI Handoff

## Current Version: 1.5.1-stable

## Current Phase

Patch 1.5.1 [1.5.1-stable] — Validation Hardening — stable.

## Architecture Invariant

Filesystem-first, template-stable architecture is locked.

- content/ is the source of truth for all JSON content files.
- exports/ is a derived output layer regenerable from content + templates.
- archives/ is permanent output history and must never be deleted.
- assets/avatars/ contains fixed brand assets that AI must never regenerate.
- Templates are stable. Content is variable. They must never mix ownership.

## Phase 1.0.0 [1.0.0-stable]

Status: stable

Purpose:
Bootstrap the project. Create all documentation files, CLAUDE.md,
README.md, Next.js project configuration, core TypeScript types, content
loader, and the basic dashboard shell.

Scope:
- CLAUDE.md at repo root
- README.md
- All docs/ files (VERSIONING, WORKFLOW, AI_HANDOFF, PHASE_LOG,
  FUTURE_PLANS, DECISIONS, BRAND_GUIDE, CONTENT_PHILOSOPHY,
  TEMPLATE_GUIDE, AVATAR_GUIDE, PAGE_CONSTITUTION)
- package.json, next.config.ts, tsconfig.json, tailwind.config.ts,
  postcss.config.js, .gitignore
- src/app/layout.tsx, src/app/page.tsx, src/app/globals.css
- src/lib/types.ts, src/lib/content.ts
- Folder structure: content/, exports/, archives/, assets/, public/,
  src/components/templates/

## Phase 1.4.0 [1.4.0-stable]

Status: stable

Purpose:
Add a local export system that renders preview pages through Puppeteer
and writes PDF and PNG outputs to exports/.

Scope:
- Install Puppeteer
- Add PDF export helper
- Add PNG export helper
- Add API route for export requests
- Add export buttons to the preview toolbar

New files:
- src/lib/export.ts
- src/app/api/export/route.ts

Modified files:
- package.json
- package-lock.json
- src/app/preview/[id]/PreviewControls.tsx
- src/app/preview/[id]/page.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

## Phase 1.5.0 [1.5.0-stable]

Status: stable

Purpose:
Add worksheet JSON save/edit workflows and archive exported PDF/PNG
outputs into permanent date-based archive folders.

Scope:
- Archive export files from exports/ into archives/YYYY-MM-DD/
- Validate and save worksheet JSON into content/worksheets/
- Add save API route
- Add shared worksheet JSON editor
- Add new/edit worksheet pages
- Add dashboard New Worksheet and Edit actions
- Archive exports after PDF/PNG generation

New files:
- src/lib/archive.ts
- src/lib/save.ts
- src/app/api/save/route.ts
- src/app/edit/WorksheetEditor.tsx
- src/app/edit/new/page.tsx
- src/app/edit/[id]/page.tsx

Modified files:
- src/app/api/export/route.ts
- src/app/preview/[id]/PreviewControls.tsx
- src/app/page.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- docs/FUTURE_PLANS.md
- README.md

## Future Phase Queue

- Phase 2.0.0 — Facebook Post Template
- Phase 2.1.0 — Content Calendar
- Phase 2.2.0 — Caption Generator
- Phase 2.3.0 — Prompt Library

## Recommended Next Step

Phase 2.0.0 — Facebook Post Template.

## What Exists

All documentation files, CLAUDE.md, README.md, Next.js project
configuration, TypeScript content types, filesystem content loader,
dashboard shell, and folder structure. App runs with npm install && npm run
dev.

## Do Not Touch Without Explicit Request

- Do not modify template components without a documented phase.
- Do not add database dependencies (Prisma, PostgreSQL, etc.).
- Do not add authentication.
- Do not add cloud infrastructure.
- Do not add automation or scheduling.
- Do not modify content/ files without explicit operator confirmation.
