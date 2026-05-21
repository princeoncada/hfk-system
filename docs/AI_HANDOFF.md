# AI Handoff

## Current Version: 1.0.2-alpha

## Current Phase

Phase 1.0.0 [1.0.0-stable] — Bootstrap — docs foundation + Next.js project
scaffold — stable.

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

## Future Phase Queue

- PENDING: Vault restructure (pre-1.1.0 housekeeping)
- Phase 1.1.0 — JSON Content Schema
- Phase 1.2.0 — cozy_v1 Worksheet Template
- Phase 1.3.0 — Preview System
- Phase 1.4.0 — Export System (PDF + PNG)
- Phase 1.5.0 — Save + Archive

## Recommended Next Step

Vault restructure — complete before Phase 1.1.0.

Scope:
- Move 00_PAGE_CONSTITUTION through 09_REFERENCE_INSPIRATION into vault/
- Remove numeric prefixes from subfolder names (e.g. vault/avatars/,
  vault/prompts/, vault/references/, vault/templates/, vault/calendar/)
- Eliminate duplicate concerns: vault brand and constitution content is
  already covered by docs/; migrate 08_SESSION_LOGS/ content into
  docs/SESSION_LOG/; migrate 07_POST_ARCHIVE/ content into archives/;
  remove 06_OUTPUTS/ (superseded by exports/)
- Update CLAUDE.md protected paths to include vault/
- Add ADR-007 to docs/DECISIONS.md documenting the two-layer architecture
  (vault as creative input layer, Next.js engine as output layer)

After vault restructure is committed → begin Phase 1.1.0 JSON Content Schema.

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
