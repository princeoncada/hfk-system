# Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 1.0.3-stable | Patch 1.0.3 | stable | 2026-05-21 | Workflow hardening — require stable-promotion prompt and commit block together |
| 1.0.2-stable | Patch 1.0.2 | stable | 2026-05-21 | Next.js config compatibility — replace next.config.ts with next.config.mjs |
| 1.0.1-stable | Patch 1.0.1 | stable | 2026-05-21 | Docs hardening — chathead opener + session checkpoint workflow |
| 1.0.0-stable | Phase 1.0.0 | stable | 2026-05-21 | Bootstrap — docs foundation + Next.js project scaffold |

# Phase Log

## Patch 1.0.3 — Workflow Hardening

Status: stable

Version: 1.0.3-alpha

Date: 2026-05-21

Purpose:
Harden WORKFLOW.md and CLAUDE.md to prevent omission of the
stable-promotion commit block. The rule existed but was not
explicit enough to enforce inline structure without an extra AI turn.

Modified files:
- docs/WORKFLOW.md (inline structure requirement made explicit)
- CLAUDE.md (After Validation Passes section rewritten)

### Patch Notes — 1.0.3-alpha
- Stable-promotion commit block now required inline in same message
  as the stable-promotion Codex prompt — no AI turn permitted between
- WORKFLOW.md Mandatory Workflow Artifact Enforcement updated
- WORKFLOW.md Post-Validation Two-Section Response clarified
- CLAUDE.md After Validation Passes section rewritten

### Validation Record — 1.0.3-stable

- Date: 2026-05-21
- WORKFLOW.md contains inline structure requirement: PASS
- CLAUDE.md contains inline structure requirement: PASS
- All four versioning locations show 1.0.3-alpha: PASS
- Promoted to stable: 2026-05-21

## Patch 1.0.2 — next.config.ts → next.config.mjs

Status: stable

Version: 1.0.2-alpha

Date: 2026-05-21

Purpose:
Fix dev server crash. Next.js 14.2.3 does not support next.config.ts.
Replace with next.config.mjs using JSDoc typing.

Files changed:
- next.config.mjs (created)
- next.config.ts (deleted)

### Patch Notes — 1.0.2-alpha
- Replaced next.config.ts with next.config.mjs
- JSDoc @type annotation preserves type safety without TypeScript import

### Validation Record — 1.0.2-stable

- Date: 2026-05-21
- next.config.ts deleted: PASS
- next.config.mjs exists with correct content: PASS
- npm run dev starts cleanly on Next.js 14.2.3: PASS
- Promoted to stable: 2026-05-21

## Patch 1.0.1 — Docs Hardening

Status: stable

Version: 1.0.1-alpha

Date: 2026-05-21

Purpose:
Add two workflow artifacts missing from Phase 1.0.0 bootstrap: the
canonical chathead opener (docs/NEW_CHATHEAD_OPENER.md) and the session
checkpoint format in docs/WORKFLOW.md. Also updates docs/AI_HANDOFF.md
to reflect the vault restructure decision made during session 01.

New files:
- docs/NEW_CHATHEAD_OPENER.md

Modified files:
- docs/WORKFLOW.md (session checkpoint section added)
- docs/AI_HANDOFF.md (recommended next step + future phase queue updated)
- docs/VERSIONING.md
- docs/PHASE_LOG.md
- docs/FUTURE_PLANS.md
- README.md

### Patch Notes — 1.0.1-alpha

- Canonical session opener created
- Session checkpoint format and process documented in WORKFLOW.md
- AI_HANDOFF.md updated with vault restructure scope and pending next step
- Two-layer architecture decision captured in AI_HANDOFF.md future queue

### Validation Record — 1.0.1-stable

- Date: 2026-05-21
- NEW_CHATHEAD_OPENER.md exists with START/END markers: PASS
- WORKFLOW.md has Session Checkpoint section: PASS
- WORKFLOW.md references NEW_CHATHEAD_OPENER.md: PASS
- AI_HANDOFF.md has vault restructure content: PASS
- All four versioning locations show 1.0.1-alpha: PASS
- Promoted to stable: 2026-05-21

## Phase 1.0.0 - Bootstrap

Status: stable

Version: 1.0.0-stable

Date: 2026-05-21

Purpose:
Create the complete project foundation: all documentation files, CLAUDE.md,
README.md, Next.js configuration, TypeScript types, content loader, basic
dashboard shell, and folder structure.

New files:
- CLAUDE.md
- README.md
- docs/VERSIONING.md
- docs/WORKFLOW.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- docs/FUTURE_PLANS.md
- docs/DECISIONS.md
- docs/BRAND_GUIDE.md
- docs/CONTENT_PHILOSOPHY.md
- docs/TEMPLATE_GUIDE.md
- docs/AVATAR_GUIDE.md
- docs/PAGE_CONSTITUTION.md
- package.json
- next.config.ts
- tsconfig.json
- tailwind.config.ts
- postcss.config.js
- .gitignore
- src/app/layout.tsx
- src/app/page.tsx
- src/app/globals.css
- src/lib/types.ts
- src/lib/content.ts
- Folder structure placeholders

### Patch Notes — 1.0.0-alpha

- Initial project bootstrap
- Docs-first workflow established
- Next.js 14 App Router configured
- TypeScript content types defined
- Filesystem content loader scaffolded
- Dashboard shell created

### Validation Record — 1.0.0-stable

- Date: 2026-05-21
- All docs present: PASS
- All Next.js config files present: PASS
- All source files present: PASS
- Folder structure present: PASS
- All four versioning locations show 1.0.0-alpha: PASS
- TypeScript type-check: PASS
- npm install: PASS
- Promoted to stable: 2026-05-21
