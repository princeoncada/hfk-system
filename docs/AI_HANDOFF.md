# AI Handoff

## Current Version: 2.1.0-alpha

## Current Phase

Phase 2.1.0 [2.1.0-alpha] — ChromaDB Layer — alpha.

## Architecture Invariant

Filesystem-first, template-stable architecture is locked.

- content/ is the source of truth for all JSON content files.
- exports/ is a derived output layer regenerable from content + templates.
- archives/ is permanent output history and must never be deleted.
- assets/avatars/ contains fixed brand assets that AI must never regenerate.
- Templates are stable. Content is variable. They must never mix ownership.

v2 introduces ChromaDB (local vector database) as a search and retrieval
layer alongside the filesystem. Content JSON files remain the source of
truth. ChromaDB is populated from them and re-indexed on every approval.
Non-text assets (images, templates) are represented in ChromaDB by metadata
records only — the actual files live on disk and are never embedded.
DeepSeek API handles all text generation. Visuals and worksheet template
generation go to external tools via the Prompt Library.

## Phase 2.1.0 [2.1.0-alpha]

Status: alpha

Purpose:
Wire the Vault layer to a local ChromaDB vector database for semantic
search over Vault assets. Add client access, asset ingestion, natural
language query, project seeding, and development API endpoints.

Scope:
- Local ChromaDB HTTP client and vault_assets collection accessor
- Asset-to-document text conversion and flat metadata serialization
- Query filtering by asset type, lifecycle, subject, and grade
- Result reconstruction from raw_json metadata through Vault validation
- Seed logic for worksheets, templates, avatar images, and vault/ files
- API routes for ingest, query, and seed
- No UI, DeepSeek integration, approval gate, or production database

New files:
- src/lib/chroma.ts
- src/lib/vault.ingest.ts
- src/lib/vault.query.ts
- src/lib/vault.seed.ts
- src/app/api/vault/ingest/route.ts
- src/app/api/vault/query/route.ts
- src/app/api/vault/seed/route.ts

Modified files:
- package.json
- .gitignore
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.0.0 [2.0.0-stable]

Status: stable

Purpose:
Define the Vault knowledge base schema layer for v2. Establish all Vault
asset types, shared lifecycle states, freshness model, reuse score,
provenance tracking, rejection records, and ChromaDB query result shape
before backend implementation begins.

Scope:
- TypeScript interfaces for template, worksheet, caption, prompt, topic,
  avatar, and brand-rule Vault assets
- Zod schemas for every Vault asset type
- Shared constants for freshness thresholds, reuse cooldown, default reuse
  score, and rejection reasons
- Validation helpers for Vault assets
- No UI, API routes, database connections, ChromaDB setup, or data writes

New files:
- src/lib/vault.types.ts
- src/lib/vault.schema.ts
- src/lib/vault.constants.ts

Modified files:
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

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

- Phase 2.0.0 — Vault Schema
- Phase 2.1.0 — ChromaDB Layer
- Phase 2.2.0 — DeepSeek Integration
- Phase 2.3.0 — Approval Gate API
- Phase 2.4.0 — Planning Engine
- Phase 2.5.0 — Prompt Library API
- Phase 2.6.0 — AI Command Center
- Phase 2.7.0 — Daily Package Review
- Phase 2.8.0 — Monthly Planner
- Phase 2.9.0 — Calendar Intelligence
- Phase 3.0.0 — Vault Browser
- Phase 3.1.0 — Analytics + Recommendations

## Recommended Next Step

Phase 2.0.0 — Vault Schema. Define all asset types, metadata structure,
lifecycle states, and freshness model before any backend implementation begins.

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
- Do not use a relational database (Prisma, PostgreSQL). ChromaDB is the
  only database dependency permitted, and it is local-only.
- Do not embed actual image or template files into ChromaDB. Only metadata
  records for non-text assets are indexed.
