# Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 1.4.0-stable | Phase 1.4.0 | stable | 2026-05-21 | Export system — Puppeteer PDF + PNG export to exports/ |
| 1.3.0-stable | Phase 1.3.0 | stable | 2026-05-21 | Preview system — /preview/[id] route + print controls + getWorksheetById fix |
| 1.2.0-stable | Phase 1.2.0 | stable | 2026-05-21 | cozy_v1 worksheet template + print CSS |
| 1.1.0-stable | Phase 1.1.0 | stable | 2026-05-21 | JSON Content Schema — Zod validation + 3 sample worksheets |
| 1.0.5-stable | Patch 1.0.5 | stable | 2026-05-21 | Workflow hardening — remove Section 2, add upfront clarification step |
| 1.0.4-stable | Patch 1.0.4 | stable | 2026-05-21 | Vault restructure — consolidate numbered root folders into vault/ |
| 1.0.3-stable | Patch 1.0.3 | stable | 2026-05-21 | Workflow hardening — require stable-promotion prompt and commit block together |
| 1.0.2-stable | Patch 1.0.2 | stable | 2026-05-21 | Next.js config compatibility — replace next.config.ts with next.config.mjs |
| 1.0.1-stable | Patch 1.0.1 | stable | 2026-05-21 | Docs hardening — chathead opener + session checkpoint workflow |
| 1.0.0-stable | Phase 1.0.0 | stable | 2026-05-21 | Bootstrap — docs foundation + Next.js project scaffold |

# Phase Log

## Phase 1.4.0 — Export System

Status: stable

Version: 1.4.0-alpha

Date: 2026-05-21

Purpose:
Add Puppeteer-backed PDF and PNG export from the existing preview route.
Exports are saved into exports/pdf/ and exports/png/ as derived output.

New files:
- src/lib/export.ts
- src/app/api/export/route.ts

Modified files:
- package.json (puppeteer dependency added)
- package-lock.json (puppeteer dependency tree added)
- src/app/preview/[id]/PreviewControls.tsx (export buttons and request handling)
- src/app/preview/[id]/page.tsx (passes id to PreviewControls)
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

### Patch Notes — 1.4.0-alpha
- exportToPDF() renders /preview/[id] with print media and writes A4 PDFs
- exportToPNG() renders /preview/[id] at A4 viewport size and writes PNG screenshots
- /api/export accepts POST requests for pdf or png export formats
- Preview toolbar now includes Export PDF and Export PNG buttons
- Export controls are hidden from print/export output via no-print
- Export requires the local Next.js app to be running on localhost:3000

### Validation Record — 1.4.0-stable

- Date: 2026-05-21
- src/lib/export.ts exists: PASS
- src/app/api/export/route.ts exists: PASS
- exportToPDF defined in export.ts: PASS
- exportToPNG defined in export.ts: PASS
- route.ts imports from @/lib/export: PASS
- PreviewControls.tsx has /api/export fetch: PASS
- PreviewControls.tsx accepts id prop: PASS
- page.tsx passes id={params.id} to PreviewControls: PASS
- puppeteer ^25.0.4 in package.json: PASS
- All 4 versioning locations show 1.4.0-alpha: PASS
- npm run type-check clean: PASS
- Promoted to stable: 2026-05-21

## Phase 1.3.0 — Preview System

Status: stable

Version: 1.3.0-alpha

Date: 2026-05-21

Purpose:
Build the live preview route at /preview/[id] that renders a
worksheet through the cozy_v1 template. Add a print controls
toolbar (back link + print button). Fix getWorksheetById to
search by id field rather than by filename, which would have
caused all preview routes to 404.

New files:
- src/app/preview/[id]/page.tsx
- src/app/preview/[id]/PreviewControls.tsx

Modified files:
- src/lib/content.ts (getWorksheetById fixed to search by id field)

### Patch Notes — 1.3.0-alpha
- /preview/[id] renders any worksheet by its JSON id field
- notFound() called for unknown IDs
- PreviewControls toolbar hidden on print via no-print class
- Print button triggers window.print()
- getWorksheetById now scans by id field, not by filename
- Dashboard Preview links were already in place from Phase 1.0.0

### Validation Record — 1.3.0-stable

- Date: 2026-05-21
- src/app/preview/[id]/page.tsx exists: PASS
- src/app/preview/[id]/PreviewControls.tsx exists: PASS
- PreviewControls has no-print class: PASS
- PreviewControls has window.print() button: PASS
- page.tsx calls notFound(): PASS
- page.tsx imports and renders WorksheetTemplate: PASS
- getWorksheetById searches by id field: PASS
- npm run type-check clean: PASS
- All 4 versioning locations show 1.3.0-alpha: PASS
- Promoted to stable: 2026-05-21

## Phase 1.2.0 — cozy_v1 Worksheet Template

Status: stable

Version: 1.2.0-alpha

Date: 2026-05-21

Purpose:
Build the first React worksheet template. Warm, cozy, child-friendly
layout. Deterministic output from WorksheetContent JSON. Covers all
5 activity types. Add template-aware print CSS.

New files:
- src/components/templates/cozy_v1/WorksheetTemplate.tsx
- src/components/templates/cozy_v1/index.ts
- src/styles/print.css

Modified files:
- src/app/layout.tsx (print.css import, app-shell-header class)
- docs/TEMPLATE_GUIDE.md (cozy_v1 status → active)

### Patch Notes — 1.2.0-alpha
- WorksheetTemplate renders all 5 activity types distinctly
- Avatar placeholder renders when no asset is present
- Vocabulary, activities, parent notes sections are conditional
- Print CSS hides app shell and preserves worksheet layout
- US Letter page dimensions used (816x1056px at 96dpi)

### Validation Record — 1.2.0-stable

- Date: 2026-05-21
- WorksheetTemplate.tsx and index.ts exist: PASS
- src/styles/print.css exists: PASS
- WorksheetTemplate and WorksheetTemplateProps exported: PASS
- print.css imported in layout.tsx: PASS
- app-shell-header class in layout.tsx: PASS
- All 5 activity types handled in WorksheetTemplate: PASS
- cozy_v1 marked active in TEMPLATE_GUIDE.md: PASS
- npm run type-check clean: PASS
- All 4 versioning locations show 1.2.0-alpha: PASS
- Promoted to stable: 2026-05-21

## Phase 1.1.0 — JSON Content Schema

Status: stable

Version: 1.1.0-alpha

Date: 2026-05-21

Purpose:
Define and validate the complete JSON content schema for worksheets
using Zod. Create 3 sample worksheet JSON files covering Math Grade
2, Science Grade 3, and Reading Grade 1. Document the schema and
validation helpers in docs/CONTENT_PHILOSOPHY.md.

New files:
- src/lib/schema.ts
- content/worksheets/math-grade2-addition-basics-abc12345.json
- content/worksheets/science-grade3-plant-parts-def67890.json
- content/worksheets/reading-grade1-short-vowels-ghi11223.json

Modified files:
- package.json (zod added to dependencies)
- docs/CONTENT_PHILOSOPHY.md (Schema Validation section added)

### Patch Notes — 1.1.0-alpha
- WorksheetSchema defined with Zod, aligned with WorksheetContent type
- validateWorksheet() and isValidWorksheet() helpers exported
- 3 sample worksheets cover math, science, and reading subjects
- Schema validation rules documented in CONTENT_PHILOSOPHY.md

### Validation Record — 1.1.0-stable

- Date: 2026-05-21
- zod installed and present in package.json: PASS
- src/lib/schema.ts exists: PASS
- All 3 sample worksheets exist in content/worksheets/: PASS
- WorksheetSchema exported from schema.ts: PASS
- validateWorksheet() exported from schema.ts: PASS
- isValidWorksheet() exported from schema.ts: PASS
- CONTENT_PHILOSOPHY.md has Schema Validation section: PASS
- npm run type-check clean: PASS
- All 4 versioning locations show 1.1.0-alpha: PASS
- Promoted to stable: 2026-05-21

## Patch 1.0.5 — Workflow Hardening: Remove Section 2

Status: stable

Version: 1.0.5-alpha

Date: 2026-05-21

Purpose:
Remove Section 2 ("What You Need From Me") from the Codex prompt
format. It created a redundancy where Claude Code would write a
full prompt, receive an answer, then write a second full prompt.
Replace with an upfront clarification step: Claude Code asks all
questions before writing any prompt. If no questions, it confirms
that and proceeds directly to the 2-section output.

Modified files:
- CLAUDE.md (Codex Prompt Format rewritten, Bug Found and New Phase
  workflow rules updated)
- docs/WORKFLOW.md (CLARIFY step added to phase cycle,
  3-section format section renamed and updated)

### Patch Notes — 1.0.5-alpha
- Section 2 removed from all Codex prompt output
- Upfront clarification step added to Bug Found and New Phase rules
- CLARIFY step added to Standard Phase Cycle in WORKFLOW.md
- "When To Use The 3-Section Format" renamed to 2-section format
- Claude Code must now confirm "no questions needed" before writing
  any prompt

### Validation Record — 1.0.5-stable

- Date: 2026-05-21
- "What You Need From Me" gone from CLAUDE.md: PASS
- Upfront clarification rule present in CLAUDE.md: PASS
- CLARIFY step present in WORKFLOW.md: PASS
- "3-Section Format" gone from WORKFLOW.md: PASS
- All 4 versioning locations show 1.0.5-alpha: PASS
- Promoted to stable: 2026-05-21

## Patch 1.0.4 — Vault Restructure

Status: stable

Version: 1.0.4-alpha

Date: 2026-05-21

Purpose:
Consolidate the ten numbered root folders (00_PAGE_CONSTITUTION
through 09_REFERENCE_INSPIRATION) into a clean vault/ directory.
Migrate session logs to docs/SESSION_LOG/, post archives to
archives/, and delete 06_OUTPUTS/ which is superseded by exports/.
Add vault/ to CLAUDE.md protected paths. Document two-layer
architecture in ADR-007.

Files moved into vault/:
- vault/constitution/HFK_PAGE_CONSTITUTION.md
- vault/brand/HFK_BRAND_STYLE_GUIDE.md
- vault/avatars/HFK_AVATAR_INDEX.md
- vault/calendar/HFK_2026_WEEKLY_CALENDAR.md
- vault/prompts/ (4 prompt files)
- vault/templates/OFFICIAL_TEMPLATE_NOTES.md
- vault/references/ (3 empty reference subdirs)

Migrated:
- docs/SESSION_LOG/2026-05-20-session-00.md
- archives/2026/, archives/2027/

Deleted:
- 00_PAGE_CONSTITUTION/ through 09_REFERENCE_INSPIRATION/
- 06_OUTPUTS/ (superseded)

Modified:
- CLAUDE.md (vault/ added to protected paths)
- docs/DECISIONS.md (ADR-007 added)

### Patch Notes — 1.0.4-alpha
- vault/ established as creative input layer (Layer 1)
- Next.js engine remains output layer (Layer 2)
- Repository root is now clean — no numbered legacy folders
- Two-layer architecture documented in ADR-007
- master_prompt.md intentionally left at repo root

### Validation Record — 1.0.4-stable

- Date: 2026-05-21
- vault/ structure exists (7 subdirs): PASS
- All key vault files in place: PASS
- All 10 numbered root folders gone: PASS
- master_prompt.md still at root: PASS
- Session log migrated to docs/SESSION_LOG/: PASS
- archives/2026 and archives/2027 created: PASS
- CLAUDE.md has vault/ in protected paths: PASS
- DECISIONS.md has ADR-007: PASS
- All 4 versioning locations show 1.0.4-alpha: PASS
- Promoted to stable: 2026-05-21

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
