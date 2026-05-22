# Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 2.7.0-stable | Phase 2.7.0 — Daily Package Review | stable | 2026-05-22 | Daily Package Review screen at /review with 5-gate interactive approval flow |
| 2.6.0-stable | Phase 2.6.0 — AI Command Center | stable | 2026-05-22 | AI Command Center home screen with async Server Components |
| 2.5.0-stable | Phase 2.5.0 — Prompt Library API | stable | 2026-05-22 | Prompt listing and assembly endpoints for VaultPrompt assets |
| 2.4.0-stable | Phase 2.4.0 — Planning Engine | stable | 2026-05-22 | Monthly planning engine with DeepSeek + Vault RAG and persisted data/plans/ output |
| 2.3.0-stable | Phase 2.3.0 — Approval Gate API | stable | 2026-05-22 | 5-gate approval state machine with package persistence and Vault write-back |
| 2.2.0-stable | Phase 2.2.0 — DeepSeek Integration | stable | 2026-05-22 | DeepSeek integration with RAG pipeline — worksheet draft, caption draft, and daily summary endpoints |
| 2.1.0-stable | Phase 2.1.0 — ChromaDB Layer | stable | 2026-05-22 | ChromaDB layer — ingestion, query, seed, and Vault API routes |
| 2.0.0-stable | Phase 2.0.0 — Vault Schema | stable | 2026-05-22 | Vault type system — interfaces and Zod schemas for all seven Vault asset types |
| 1.5.2-stable | Patch 1.5.2 | stable | 2026-05-22 | v2 Phase Planning — backend-first phase queue, ChromaDB, and DeepSeek constraints documented |
| 1.5.1-stable | Patch 1.5.1 | stable | 2026-05-21 | Validation hardening — require -LiteralPath for bracket paths in PowerShell |
| 1.5.0-stable | Phase 1.5.0 | stable | 2026-05-21 | Save + Archive — JSON editor UI, save API, archive-on-export |
| 1.4.1-stable | Patch 1.4.1 | stable | 2026-05-21 | Workflow hardening — Section 2 ownership, npm command rule, push block rule |
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

## Phase 2.7.0 — Daily Package Review

Status: stable

Version: 2.7.0-stable

Date: 2026-05-22

Purpose:
Built the Daily Package Review screen at /review. ReviewFlow handles all 5
gate interactions: inline direction form, worksheet/caption draft display with
provenance panel, template selector, reject inline form, and redirect modal.
All actions call existing approval API routes and trigger router.refresh().

Files changed:
- src/app/review/page.tsx (created) — Server Component, loads today's package
- src/components/review/ReviewFlow.tsx (created) — interactive gate approval flow
- src/components/review/RedirectModal.tsx (created) — redirect note modal
- src/components/command/TodayStatus.tsx (modified) — Review link added

Validation:
- /review screen is live.
- ReviewFlow handles all 5 gate interactions.
- Direction approval uses inline form.
- Worksheet and caption drafts display with provenance panels.
- Template selector, reject form, and redirect modal are live.
- Gate actions call existing API routes and refresh package state.
- Review link appears in TodayStatus on the home screen.

## Phase 2.6.0 — AI Command Center

Status: stable

Version: 2.6.0-stable

Date: 2026-05-22

Purpose:
Built the AI Command Center home screen. Three async Server Components render
above the existing worksheet list: TodayStatus shows the 5-gate approval grid,
MonthProgress shows plan progress and today's topic, and VaultAlerts shows
duplicate-risk topics, asset count, and an offline fallback.

Files changed:
- src/components/command/TodayStatus.tsx (created)
- src/components/command/MonthProgress.tsx (created)
- src/components/command/VaultAlerts.tsx (created)
- src/app/page.tsx (modified) — async, imports command components

Validation:
- Home page loads 200.
- TypeScript compiles clean.
- TodayStatus renders the 5-gate approval grid.
- MonthProgress renders the plan progress bar and today's topic.
- VaultAlerts renders duplicate risk topics, asset count, and offline fallback.
- Existing worksheet list remains available below the Command Center.

## Phase 2.5.0 — Prompt Library API

Status: stable

Version: 2.5.0-stable

Date: 2026-05-22

Purpose:
Built the Prompt Library API. GET /api/prompts lists all VaultPrompt assets
using collection.get() through getAssetsByType(). POST /api/prompts/assemble
returns a brand-voice-enriched, ready-to-run prompt with placeholder
interpolation for topic, grade, subject, and objective.

Files changed:
- src/lib/prompt.types.ts (created) — PromptAssemblyRequest, AssembledPrompt
- src/lib/prompt.assemble.ts (created) — listPrompts(), assemblePrompt()
- src/lib/vault.query.ts (modified) — added getAssetsByType()
- src/app/api/prompts/route.ts (created) — GET prompt list
- src/app/api/prompts/assemble/route.ts (created) — POST prompt assembly
- vault/prompts/canva-worksheet.md (created) — sample Canva worksheet prompt

Validation:
- GET /api/prompts lists VaultPrompt assets via collection.get().
- POST /api/prompts/assemble returns ready-to-run external prompts.
- Brand voice enrichment and placeholder interpolation are live.
- Missing prompt context returns 404.
- listPrompts was refactored from semantic search to collection.get() for
  reliable flat listing.

## Phase 2.4.0 — Planning Engine

Status: stable

Version: 2.4.0-stable

Date: 2026-05-22

Purpose:
Built the monthly planning engine. DeepSeek + Vault RAG generates full-month
content proposals with subject/grade rotation, duplicate-topic detection, and
per-day confidence scoring. Plans persist to data/plans/YYYY-MM.json.

Files changed:
- src/lib/planning.types.ts (created) — PlanDay, MonthlyPlan, PlanRequest, PlanResponse
- src/lib/planning.store.ts (created) — filesystem read/write for data/plans/
- src/lib/planning.rag.ts (created) — RAG context for brand rules, recent worksheets, topics
- src/lib/planning.generate.ts (created) — DeepSeek plan generation with 4000 token budget
- src/app/api/planning/generate/route.ts (created) — POST generate monthly plan
- src/app/api/planning/[month]/route.ts (created) — GET plan by month
- .gitignore (modified) — data/plans/ excluded

Validation:
- Full 31-day content plan generation validated.
- Subject/grade rotation is live.
- Duplicate-topic detection is live.
- Per-day confidence scoring is live.
- Plans persist to data/plans/YYYY-MM.json.

Known issue:
- DeepSeek returns lowercase subjects and numeric grades. This is a data
  quality issue to be addressed in a separate patch.

## Phase 2.3.0 — Approval Gate API

Status: stable

Version: 2.3.0-stable

Date: 2026-05-22

Purpose:
Built the 5-gate approval state machine for daily content packages:
direction → worksheet → template → caption → final. Gate actions approve,
reject, and redirect package state persisted to data/packages/YYYY-MM-DD.json.
Vault write-back on worksheet and caption approval was confirmed.

Files changed:
- src/lib/approval.types.ts (created) — GateName, GateStatus, GateState, DailyPackage
- src/lib/approval.store.ts (created) — filesystem read/write for data/packages/
- src/lib/approval.actions.ts (created) — approveGate, rejectGate, redirectGate with Vault write-back
- src/app/api/approval/package/route.ts (created) — GET today's package
- src/app/api/approval/gate/[gate]/approve/route.ts (created)
- src/app/api/approval/gate/[gate]/reject/route.ts (created)
- src/app/api/approval/gate/[gate]/redirect/route.ts (created)
- .gitignore (modified) — data/packages/ excluded

Validation:
- 5-gate approval flow is live.
- Approve, reject, and redirect actions persist correctly.
- Package state writes to data/packages/YYYY-MM-DD.json.
- Vault write-back confirmed for worksheet and caption approvals.

## Phase 2.2.0 — DeepSeek Integration

Status: stable

Version: 2.2.0-stable

Date: 2026-05-22

Purpose:
Connected DeepSeek as the text generation layer using the OpenAI-compatible
client and model deepseek-chat in JSON mode. Built the RAG pipeline on top of
ChromaDB Vault retrieval so worksheet drafts and caption drafts are grounded
in brand rules, prior assets, and relevant context. Delivered the worksheet
draft, caption draft, and daily summary generation endpoints.

Files changed:
- src/lib/ai.types.ts (created) — AI request/response types with VaultProvenance
- src/lib/deepseek.ts (created) — DeepSeek client, model deepseek-chat, JSON mode
- src/lib/vault.rag.ts (created) — RAG retrieval for worksheet and caption contexts
- src/app/api/ai/draft/worksheet/route.ts (created) — POST /api/ai/draft/worksheet
- src/app/api/ai/draft/caption/route.ts (created) — POST /api/ai/draft/caption
- src/app/api/ai/summary/route.ts (created) — POST /api/ai/summary
- next.config.mjs (modified) — added openai to serverComponentsExternalPackages

Validation:
- TypeScript compiles clean.
- Worksheet draft endpoint works correctly.
- Caption draft endpoint works correctly.
- Daily summary endpoint works correctly.
- RAG pipeline retrieves Vault context and passes it to DeepSeek for grounded generation.
- All 8 TypeScript errors in vault.rag.ts resolved via flatMap type narrowing.

## Phase 2.1.0 — ChromaDB Layer

Status: stable

Version: 2.1.0-stable

Date: 2026-05-22

Purpose:
Wired local ChromaDB as the vector search layer over the Vault.
Built ingestion pipeline, semantic query pipeline, seed pipeline,
and three API routes (/api/vault/ingest, /api/vault/query,
/api/vault/seed). Seeded 7 assets from existing worksheets,
templates, and vault/ contents. Query returns semantically ranked
VaultAsset results with provenance. Fixed webpack externalization
for chromadb and chromadb-default-embed in next.config.mjs. Fixed
vault/prompts/*.md routing to VaultPrompt instead of VaultBrandRule.

New files:
- src/lib/chroma.ts
- src/lib/vault.ingest.ts
- src/lib/vault.query.ts
- src/lib/vault.seed.ts
- src/app/api/vault/ingest/route.ts
- src/app/api/vault/query/route.ts
- src/app/api/vault/seed/route.ts

Modified files:
- next.config.mjs
- package.json
- package-lock.json
- .gitignore
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

Validation: Seed 7/7, zero errors. Query returns correct semantic
ranking. TypeScript clean. ChromaDB live locally.

## Phase 2.0.0 — Vault Schema

Status: stable

Version: 2.0.0-stable

Date: 2026-05-22

Purpose:
Introduced the Vault type system for v2. Defined TypeScript interfaces
and Zod schemas for all seven Vault asset types (template, worksheet,
caption, prompt, topic, avatar, brand-rule). Established lifecycle
states (draft → approved → archived → retired), freshness model
(fresh / healthy / stale_ish / stale / retired), reuse score (0.0–1.0),
provenance tracking, and rejection records.

New files:
- src/lib/vault.types.ts
- src/lib/vault.schema.ts
- src/lib/vault.constants.ts

Modified files:
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

Validation: All 26 checks passed. TypeScript compiled clean.

## Patch 1.5.2 — v2 Phase Planning

Status: stable

Version: 1.5.2-stable

Date: 2026-05-22

Purpose:
Documentation-only patch. Replaced the old planned phase queue
(2.0.0–2.3.0) with the full v2 phase sequence (2.0.0–3.1.0).
Documented ChromaDB (local vector DB) and DeepSeek API as the v2
backend stack. Established that non-text assets are represented
in ChromaDB by metadata only. Confirmed backend-first build order.

Files changed:
- docs/FUTURE_PLANS.md
- docs/AI_HANDOFF.md
- docs/VERSIONING.md
- README.md

## Patch 1.5.1 — Validation Hardening

Status: stable

Version: 1.5.1-alpha

Date: 2026-05-21

Purpose:
Harden Section 2 PowerShell validation guidance to prevent false
negative file checks for paths containing bracket characters such as
[id].

Modified files:
- CLAUDE.md
- docs/WORKFLOW.md
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

### Patch Notes — 1.5.1-alpha
- Section 2 validation guidance now requires Test-Path -LiteralPath
  for paths containing bracket characters.
- Section 2 validation guidance now requires Select-String -LiteralPath
  for paths containing bracket characters.
- The rule documents the PowerShell wildcard behavior that caused a
  false negative for src/app/edit/[id]/page.tsx.

### Validation Record — 1.5.1-stable

- Date: 2026-05-21
- CLAUDE.md has -LiteralPath rule: PASS
- WORKFLOW.md has -LiteralPath rule: PASS
- All 4 versioning locations show 1.5.1-alpha: PASS
- Promoted to stable: 2026-05-21

## Phase 1.5.0 — Save + Archive

Status: stable

Version: 1.5.0-alpha

Date: 2026-05-21

Purpose:
Add a local worksheet JSON editor and save API while making exports
transient by moving generated PDF/PNG files into permanent date-based
archives.

New files:
- src/lib/archive.ts
- src/lib/save.ts
- src/app/api/save/route.ts
- src/app/edit/WorksheetEditor.tsx
- src/app/edit/new/page.tsx
- src/app/edit/[id]/page.tsx

Modified files:
- src/app/api/export/route.ts (archives successful exports)
- src/app/preview/[id]/PreviewControls.tsx (reports archive path)
- src/app/page.tsx (New Worksheet and Edit links)
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- docs/FUTURE_PLANS.md
- README.md

### Patch Notes — 1.5.0-alpha
- archiveExport() moves exported PDF/PNG files from exports/ to archives/YYYY-MM-DD/
- saveWorksheet() validates worksheet JSON with the existing Zod schema and writes to content/worksheets/
- /api/save accepts worksheet JSON and returns the saved worksheet id
- /api/export now returns archivePath after moving generated files into archives/
- /edit/new provides a prefilled blank worksheet JSON editor
- /edit/[id] loads an existing worksheet into the shared JSON editor
- Dashboard includes New Worksheet and per-card Edit links

### Validation Record — 1.5.0-stable

- Date: 2026-05-21
- src/lib/archive.ts exists: PASS
- src/lib/save.ts exists: PASS
- src/app/api/save/route.ts exists: PASS
- src/app/edit/WorksheetEditor.tsx exists: PASS
- src/app/edit/new/page.tsx exists: PASS
- src/app/edit/[id]/page.tsx exists: PASS
- archiveExport + renameSync in archive.ts: PASS
- saveWorksheet in save.ts: PASS
- api/save imports @/lib/save: PASS
- api/export calls archiveExport and returns archivePath: PASS
- WorksheetEditor has /api/save fetch: PASS
- Dashboard has /edit links: PASS
- PreviewControls shows archivePath: PASS
- All 4 versioning locations show 1.5.0-alpha: PASS
- npm run type-check clean: PASS
- Promoted to stable: 2026-05-21

## Patch 1.4.1 — Workflow Hardening

Status: stable

Version: 1.4.1-alpha

Date: 2026-05-21

Purpose:
Harden Claude Code and workflow documentation around validation
ownership, npm command placement, and push-block delivery.

Modified files:
- CLAUDE.md
- docs/WORKFLOW.md
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- docs/FUTURE_PLANS.md
- README.md

### Patch Notes — 1.4.1-alpha
- Section 2 validation commands are now explicitly USER-run PowerShell
  commands; Claude Code receives pasted results and reports pass/fail.
- Codex master prompts must not instruct Codex to run npm commands;
  npm commands belong in Section 2 as USER-run validation steps.
- The git push block must appear in the same message as the
  stable-promotion commit block; no separate reminder turn.

### Validation Record — 1.4.1-stable

- Date: 2026-05-21
- CLAUDE.md no longer contains "using bash": PASS
- CLAUDE.md has PowerShell block rule in Section 2: PASS
- CLAUDE.md has npm command restriction for Codex: PASS
- CLAUDE.md has git push block rule: PASS
- WORKFLOW.md no longer contains "via bash": PASS
- WORKFLOW.md has npm command restriction for Codex: PASS
- WORKFLOW.md has git push block rule: PASS
- All 4 versioning locations show 1.4.1-alpha: PASS
- Promoted to stable: 2026-05-21

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
