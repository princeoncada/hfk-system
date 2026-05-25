# HFK Publishing Engine - Versioning Reference

## Purpose

Authoritative versioning reference for all AI agents and contributors.
Read this file before touching any version-related documentation.

## Version Format

X.Y.Z semantic versioning.

Z — Patch: targeted fix, doc correction, single-file change.
Y — Minor: new feature or capability an operator would notice.
X — Major: architectural shift or production milestone.

## State Definitions

alpha   — Implemented, not yet validated.
beta    — Partially validated, known issues remain.
stable  — Fully validated, committed to master.

## Promotion Rules

alpha → stable (or beta → stable):
  All validation checks pass AND user commits to master.

stable → patch (regression):
  Any bug found after a stable release. ALWAYS open a new Z+1 patch.
  Never modify a stable release in place.
  The implementation prompt must bump all five versioning files to
  X.Y.(Z+1)-alpha as part of its implementation requirements.

## Five Versioning Locations

Every version change must be applied to all five simultaneously:
1. docs/VERSIONING.md (this file)
2. docs/AI_HANDOFF.md
3. docs/PHASE_LOG.md
4. README.md
5. STATE.json

## Current Version

| Field | Value |
| --- | --- |
| Version | 5.3.0-stable |
| Phase | Phase 5.3.0 |
| State | stable |
| Date | 2026-05-25 |
| Summary | ChromaDB Docs Extension. Adds hfk_docs collection to existing ChromaDB instance. ingest_docs.py + query_docs.py scripts. validate.ps1 auto-ingests docs on each run. Session start protocol updated to query before reading full docs. |

## Complete Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 5.3.0-stable | Phase 5.3.0 | stable | 2026-05-25 | ChromaDB Docs Extension. Adds hfk_docs collection to existing ChromaDB instance. ingest_docs.py + query_docs.py scripts. validate.ps1 auto-ingests docs on each run. Session start protocol updated to query before reading full docs. |
| 5.2.8-stable | Patch 5.2.8 | stable | 2026-05-25 | Docs hardening patch. Added Infrastructure Check rule to New Phase workflow and Scoping Discipline section to CLAUDE.md. Added Behavioral Guidelines section to AGENTS.md. |
| 5.2.7-stable | Patch 5.2.7 | stable | 2026-05-25 | read_version() Encoding Fix: reads STATE.json with `utf-8-sig` so PowerShell's UTF-8 BOM does not cause graph metadata version fallback to `unknown`. |
| 5.2.6-stable | Patch 5.2.6 | stable | 2026-05-25 | Graph Refresh Automation + generate_codebase_graph.py Fix: stops the normalizer from re-running Graphify, reads existing Graphify output, uses STATE.json for graph version metadata, and adds graph refresh to validate.ps1. |
| 5.2.5-stable | Patch 5.2.5 | stable | 2026-05-25 | Graphify CLI Syntax Re-correction + Query Behavior Docs: restores required `.` arguments to graphify query/path/explain guidance and documents keyword/BFS query behavior plus exact node-name path lookup requirements. |
| 5.2.4-stable | Patch 5.2.4 | stable | 2026-05-25 | Graphify Install Integration + CLI Syntax Fix: tailored Graphify Claude/Codex install artifacts to HFK workflow, fixed Codex hook command path, and corrected query/path/explain CLI syntax in CODEBASE_GRAPH.md. |
| 5.2.3-stable | Patch 5.2.3 | stable | 2026-05-25 | Graphify Server/Tool Mode: documented that the installed Graphify CLI has agent install/tool integration commands but no serve/MCP daemon command, and clarified static artifact fallback rules. |
| 5.2.2-stable | Patch 5.2.2 | stable | 2026-05-25 | Graphify Workflow Clarification: rewrote CODEBASE_GRAPH.md as the authoritative workflow reference for Graphify artifacts, freshness checks, static CLI commands, prompt examples, and direct source-read rules. |
| 5.2.1-stable | Patch 5.2.1 | stable | 2026-05-24 | Real Graphify Output: installed graphifyy, generated graphify-out/graph.json and GRAPH_REPORT.md, normalized codebase-graph.json from Graphify output, and updated graph read-first docs. |
| 5.2.0-stable | Phase 5.2.0 | stable | 2026-05-24 | Graphify-Ready Codebase Graph: committed codebase-graph.json, added Graphify wrapper and degraded fallback scanner, and wired the graph into Codex read-first workflow docs. |
| 5.1.1-stable | Patch 5.1.1 | stable | 2026-05-24 | Future Plans Queue: populated FUTURE_PLANS.md with 5.0.x + 5.1.0 completions and 5.2.0–5.5.0 planned phases (Graphify, ChromaDB Docs, Case Studies, Advanced Memory) with token optimization rationale. |
| 5.1.0-stable | Phase 5.1.0 | stable | 2026-05-24 | Automation Scripts: commit-phase.ps1, validate.ps1, docs/COMPACT_STRATEGY.md, CLAUDE.md and WORKFLOW.md wired to new scripts. |
| 5.0.2-stable | Patch 5.0.2 | stable | 2026-05-24 | Workflow Doc Hardening: fix four-to-five versioning locations, replace Stable-Promotion Codex Prompt step with .\scripts\promote.ps1, update CLAUDE.md Key File Map with 5.0.x entries. |
| 5.0.1-stable | Patch 5.0.1 | stable | 2026-05-24 | Mojibake repair + State column fix: fix-mojibake.ps1 script, promote.ps1 State field improvement, em-dash mojibake corrected in PHASE_LOG, VERSIONING, AI_HANDOFF. Files: scripts/fix-mojibake.ps1, scripts/promote.ps1, docs/VERSIONING.md, docs/PHASE_LOG.md, versioning docs. |
| 5.0.0-stable | Phase 5.0.0 | stable | 2026-05-24 | Workflow Core Hardening: STATE.json, scripts/promote.ps1, docs/CODEX_RULES.md, CLAUDE.md session start protocol update, pre-4.x doc archiving. Files: STATE.json, scripts/promote.ps1, docs/CODEX_RULES.md, CLAUDE.md, docs/PHASE_LOG.md, docs/VERSIONING.md, docs/FUTURE_PLANS.md, versioning docs. |
| 4.5.0-stable | Phase 4.5.0 | stable | 2026-05-24 | Vault Ingestion + AI Template Recommendation: saved TemplateDefinitions ingest into template_definitions Chroma collection, review flow queries best-fit custom template, recommendation badge appears in selector, and approved custom template reuse score increments. Files: template.types.ts, template.chroma.ts, templates recommend/reuse API routes, templates save API, review/page.tsx, ReviewFlow.tsx, versioning docs. |
| 4.4.0-stable | Phase 4.4.0 | stable | 2026-05-24 | Live Preview + Publish: right-panel Style/Preview toggle with scaled DynamicWorksheetTemplate live preview driven by current TemplateDefinition state and sample worksheet content. Files: TemplatePreview.tsx, TemplateSlotEditor.tsx, versioning docs. |
| 4.3.0-stable | Phase 4.3.0 | stable | 2026-05-24 | Property Panel: right-side editor panel with global palette color controls, footer text, avatar selector, selected-slot style overrides, and two-column template editor layout. Files: PropertyPanel.tsx, TemplateSlotEditor.tsx, SortableSlotRow.tsx, templates/new/page.tsx, templates/[id]/edit/page.tsx, versioning docs. |
| 4.2.0-stable | Phase 4.2.0 | stable | 2026-05-24 | Canvas + Drag-and-Drop Slots: dnd-kit slot editor, reorderable TemplateSlot list, add/remove slot controls, save API route, new/edit template pages wired to editor. Files: TemplateSlotEditor.tsx, SortableSlotRow.tsx, editor/index.ts, api/templates/save/route.ts, templates/new/page.tsx, templates/[id]/edit/page.tsx, versioning docs. |
| 4.1.0-stable | Phase 4.1.0 | stable | 2026-05-24 | Template Routes + List Page: /templates nav entry, built-in/custom template list page, New Template placeholder, and edit placeholder routes. Files: SidebarNav.tsx, templates/page.tsx, templates/new/page.tsx, templates/[id]/edit/page.tsx, versioning docs, FUTURE_PLANS.md. |
| 4.0.0-stable | Phase 4.0.0 | stable | 2026-05-24 | Template definition schema (TemplateDefinition, TemplatePalette, TemplateSlot), template store (vault/templates/), DynamicWorksheetTemplate renderer, integrated into preview, builder, and review flow template selector. Sample modern_v1 template included. |

## Validation Record — 5.0.1-stable

Date: 2026-05-24

- scripts/fix-mojibake.ps1 ran idempotently with no file changes.
- Mojibake scan clean across README.md, docs/, vault/, CLAUDE.md, master_prompt.md, and scripts/.
- npm run type-check passed.
- npm run build passed with 28/28 static pages.

## Validation Record — 3.6.1-stable

Date: 2026-05-24

- Build clean, 22 pages
- reset/route.ts exists
- resetGate, Fill from Plan, Edit Direction confirmed in ReviewFlow.tsx
- tracking-widest count 5 (all content section labels present)
- Version bump confirmed in all four versioning files

## Validation Record — 3.6.2-stable

Date: 2026-05-24

- Build clean
- outlineButtonClass defined and used at 3 sites in ReviewFlow.tsx
- Edit Direction button removed from renderDirectionBody approved body
- resetGate(gate) in renderActionRow approved branch
- Regenerating... loading state on both regenerate buttons
- hasWorksheetDraft guards in action row and instructions link blocks
- fullCopyText merges hashtags into caption copy block
- Version bump confirmed in all four versioning files

## Validation Record — 3.6.3-stable

Date: 2026-05-24

- Build clean
- isTemplatePayload defined and used in approval.actions.ts
- saveWorksheetContent defined and called on final gate approval
- saveWorksheet imported and used
- gate === 'final' hook in approveGate confirmed
- isPackageComplete defined and used at 3 sites in ReviewFlow.tsx
- Link imported from next/link
- Edit Worksheet and Preview links in renderFinalBody
- Locked banner in main return
- Version bump confirmed in all four versioning files

## Validation Record — 3.6.4-stable

Date: 2026-05-24

- Build clean
- overflow:hidden confirmed in globals.css print media query
- redirect('/worksheets') confirmed in preview/[id]/page.tsx
- pageCount/pageHeight multi-page PNG logic confirmed in PreviewControls.tsx
- planDay removed from review/page.tsx
- useEffect imported and used at 2 sites in ReviewFlow.tsx
- localStorage get/set confirmed
- Fill from Plan removed (0 matches)
- setWorksheetDraft(null) in resetGate
- flex items-end gap-3 on both Generate rows
- items-end gap-2.5 on both action rows
- flatMap step indicator confirmed
- Version bump confirmed in all four versioning files

## Validation Record — 3.6.5-stable

Date: 2026-05-24

- Build clean, 22 pages
- @page rule confirmed in globals.css
- margin: 0.5in confirmed
- print-color-adjust: exact confirmed
- main padding: 0 !important confirmed
- .worksheet max-width: 100% !important confirmed
- Version bump confirmed in all four versioning files


## Validation Record — 3.7.0-stable

Date: 2026-05-24

- Build clean, 22 pages
- Fredoka + Nunito font variables confirmed in layout.tsx
- play-sky + play-sky-light confirmed in tailwind.config.ts
- playful-heading + playful-body font utilities confirmed in tailwind.config.ts
- playful_v1/WorksheetTemplate.tsx and index.ts created
- resolveTemplate confirmed in preview/[id]/page.tsx
- ActiveTemplate switching confirmed in WorksheetBuilder.tsx
- playful_v1 entry confirmed in TEMPLATES in ReviewFlow.tsx
- Version bump confirmed in all four versioning files


## Validation Record — 3.7.1-stable

Date: 2026-05-24

- Build clean, 22 pages
- @page margin: 0 confirmed in globals.css
- worksheet width: 816px + box-sizing: border-box confirmed for print
- minWidth + scrollWidth confirmed in PreviewControls.tsx
- Plus + SlidersHorizontal from lucide-react confirmed at 4 sites
- instructionIconClass defined and used at 4 sites
- Text instruction buttons replaced (title attributes only — correct)
- Version bump confirmed in all four versioning files

## Validation Record — 3.8.0-stable

Date: 2026-05-24

- Build clean, 22 pages
- update-day and topic/suggest API routes created
- planDay: PlanDay | null in ReviewFlowProps, imported from planning.types
- generatingTopic state wired to Regenerate button
- handleRegenerateTopic and approveDirection defined and called
- /api/planner/update-day called in approveDirection (non-fatal sync)
- Locked from planner label confirmed in direction form
- getPlan fetched in review/page.tsx, planDay passed to ReviewFlow
- Version bump confirmed in all four versioning files

## Validation Record — 3.6.0-stable

Date: 2026-05-23

- Build clean, 21 pages
- instruction field confirmed in ai.types.ts and both API routes
- worksheetInstruction wired through ReviewFlow.tsx
- rejectTarget fully removed
- initialValue confirmed in RedirectModal.tsx
- Version bump confirmed in all four versioning files

## Validation Record — 3.5.6-stable

Date: 2026-05-23

- Build clean, 21 pages
- worksheetTitle present in ReviewFlow.tsx
- worksheetContent removed from ReviewFlow.tsx
- Version bump confirmed in all four versioning files

## Validation Record — 3.5.5-stable

Date: 2026-05-23

- Version label fixes in AI_HANDOFF.md confirmed
- Version bump confirmed in all four versioning files
- Mojibake fix confirmed indirectly via clean em-dash display in grep output

## Validation Record — 3.5.0-stable

Date: 2026-05-23

- Build clean
- TypeScript zero errors
- Direction pre-population verified
- Generate Worksheet and Generate Caption buttons present
- Worksheet and caption draft state confirmed

## Validation Record — 3.5.1-stable

Date: 2026-05-23

- Build clean
- TypeScript zero errors
- Generate Worksheet no longer crashes
- Error display confirmed

## Validation Record — 3.5.2-stable

Date: 2026-05-23

- All 6 grep checks passed
- Rule present in CLAUDE.md, WORKFLOW.md, and VERSIONING.md
- Version bump confirmed in all four versioning files

## Validation Record — 3.5.3-stable

Date: 2026-05-23

- All 5 grep checks passed
- Rule present in CLAUDE.md and WORKFLOW.md in three locations
- Version bump confirmed in all four versioning files

## Validation Record — 3.5.4-stable

Date: 2026-05-23

- All 10 grep checks passed
- Version history ordering corrected in PHASE_LOG.md and VERSIONING.md
- Ordering rule confirmed in CLAUDE.md and WORKFLOW.md


## Next Phase

Current stable version: 5.2.8-stable
Current working version: 5.3.0-stable
Next recommended phase: Phase 5.4.0 — Portfolio Case Studies






## Archive — Pre-4.x History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 3.8.0-stable | Phase 3.8.0 | stable | 2026-05-24 | Direction overhaul: grade/subject locked from planner, topic read-only with AI regenerate, objective editable, direction approval syncs topic/objective back to planner. |
| 3.7.1-stable | Patch 3.7.1 — Export Crop + Instructions Icon Fix | stable | 2026-05-24 | PNG export crop fix (scrollWidth/minWidth), PDF print crop fix (zero @page margin, 816px worksheet width), instructions button replaced with Lucide Plus/SlidersHorizontal icon. |
| 3.7.0-stable | Phase 3.7.0 — playful_v1 Template | stable | 2026-05-24 | playful_v1 template: emoji-illustrated colorful layout with Fredoka/Nunito fonts, rotating activity colors, vocab tracing lines for reading/vocab subjects. |
| 3.6.5-stable | Patch 3.6.5 — Print/PDF Fix | stable | 2026-05-24 | Print/PDF fix: @page rule, 0.5in margin, main padding reset, full-width worksheet on print. |
| 3.6.4-stable | Patch 3.6.4 — Daily Review UX Polish + Print/Export Fixes | stable | 2026-05-24 | Print scrollbar fix, multi-page PNG export, preview 404 redirect, Fill from Plan removed, Instructions inline-right of Generate, draft persistence via localStorage, step indicator layout fix. |
| 3.6.3-stable | Patch 3.6.3 — Final Package Lock and Worksheet Link | stable | 2026-05-24 | Save AI worksheet to content/worksheets/ on final approval, show Edit Worksheet and Preview links in final gate, lock all action rows when package is complete, locked banner at page top. |
| 3.6.2-stable | Patch 3.6.2 — Daily Review UI/UX Fixes | stable | 2026-05-24 | Edit button on all approved gates, outline Regenerate with loading state, instructions link persists after draft generation, hashtags merged into caption copy block. |
| 3.6.1-stable | Patch 3.6.1 — Daily Review UI Improvements | stable | 2026-05-24 | Direction fill-from-plan and edit, full worksheet and caption draft display, Instructions moved to subtle link near Generate button. |
| 3.6.0-stable | Phase 3.6.0 — Instructions Flow | stable | 2026-05-23 | Remove Reject from all gates. Replace Redirect with editable Instructions dialog on worksheet and caption gates. Saved instruction text passed to AI on next generation. |
| 3.5.6-stable | Patch 3.5.6 — Generate Caption Crash Fix | stable | 2026-05-23 | Bug fix — Generate Caption crash: replace worksheetContent with worksheetTitle in caption fetch body. |
| 3.5.5-stable | Patch 3.5.5 — Mojibake + Missed Version Label Fix | stable | 2026-05-23 | Docs hardening — fix UTF-8 mojibake for em dash, right arrow, and multiplication sign across PHASE_LOG.md, VERSIONING.md, AI_HANDOFF.md, README.md. Fix missed 3.4.0/3.4.1 version labels in AI_HANDOFF.md. |
| 3.5.4-stable | Patch 3.5.4 — Version Ordering Fix | stable | 2026-05-23 | Docs hardening — fix out-of-order version numbers (3.4→3.3.0, 3.4.1→3.3.1, 3.3→3.4.0) and add Version Ordering Rule to CLAUDE.md and WORKFLOW.md. |
| 3.5.3-stable | Patch 3.5.3 — 1-by-1 Commit Rule Hardening | stable | 2026-05-23 | Docs hardening — make implementation and stable-promotion commit blocks require one git add + one git commit per file, no exceptions and no grouping. |
| 3.5.2-stable | Patch 3.5.2 — Post-Stable Bug Versioning Rule | stable | 2026-05-23 | Docs hardening — encode post-stable bug = Z+1 rule in CLAUDE.md, WORKFLOW.md, and VERSIONING.md. |
| 3.5.1-stable | Patch 3.5.1 — Generate Worksheet Crash Fix | stable | 2026-05-23 | Fix Generate Worksheet crash: add missing template field to worksheet generation POST body and res.ok guards for worksheet/caption generation errors. |
| 3.5.0-stable | Patch 3.5.0 — Daily Review Fix | stable | 2026-05-23 | Direction pre-populated from today's Planner data. Generate Worksheet and Generate Caption buttons added. Template gate replaced with visual card selector. |
| 3.4.0-stable | Phase 3.4.0 — UI Animations + Onboarding | stable | 2026-05-23 | 4-step onboarding overlay (first-run + re-openable via Help button in sidebar). Framer Motion page transitions and sidebar nav micro-interactions. |
| 3.3.1-stable | Patch 3.3.1 — Export Overhaul | stable | 2026-05-23 | Removed PDF export. PNG export now client-side via html-to-image targeting the .worksheet element at 2x. Save As dialog via showSaveFilePicker with download fallback. No more server-side archiving on export. |
| 3.3.0-stable | Phase 3.3.0 — Worksheet Builder | stable | 2026-05-23 | Block-based worksheet builder. /worksheets route, drag-to-reorder sections, live preview, form editor, delete, AI regeneration modal. |
| 3.2.0-stable | Phase 3.2.0 — Analytics + Recommendations | stable | 2026-05-22 | Analytics + Recommendations — /analytics screen with AI-narrated demo summary, top/worst post lists, subject-grade heatmap, dismissible recommendation cards, and Analytics nav link added to sidebar. |
| 3.1.0-stable | Phase 3.1.0 — Vault Browser | stable | 2026-05-22 | Vault Browser — /vault standing asset library. 7 asset types, type filter tabs, name search, asset cards with freshness/lifecycle/usage data, lifecycle mutation actions (approve, archive, retire, resurrect). Vault nav link added to sidebar. |
| 3.0.0-stable | Phase 3.0.0 — Calendar Intelligence | stable | 2026-05-22 | Calendar Intelligence — bi-directional planner. Past cells show shipped/in-review status from package data. Future cells show plan + in-review state. Day detail panel includes gate-by-gate package summary. |
| 2.9.0-stable | Phase 2.9.0 — UI Design System | stable | 2026-05-22 | UI Design System — sidebar nav shell, full design token system (Inter + Instrument Serif + JetBrains Mono), card-based component redesign across all screens: Command Center, Daily Review, Monthly Planner. |
| 2.8.0-stable | Phase 2.8.0 — Monthly Planner | stable | 2026-05-22 | Monthly Planner — calendar grid UI, day detail panel, lock toggle, generate/regenerate, planner navigation links from command dashboard |
| 2.7.0-stable | Phase 2.7.0 — Daily Package Review | stable | 2026-05-22 | Daily Package Review screen at /review. 5-gate interactive approval flow with inline direction form, worksheet/caption display, provenance panel, reject form, redirect modal. Review link added to Command Center. |
| 2.6.0-stable | Phase 2.6.0 — AI Command Center | stable | 2026-05-22 | AI Command Center home screen. TodayStatus, MonthProgress, and VaultAlerts wired as async Server Components above the worksheet list. Direct filesystem reads — no API hops. |
| 2.5.0-stable | Phase 2.5.0 — Prompt Library API | stable | 2026-05-22 | Prompt Library API. GET /api/prompts lists Vault prompts via collection.get(). POST /api/prompts/assemble returns brand-voice-enriched ready-to-run prompts with placeholder interpolation. getAssetsByType() added to vault.query.ts for reliable flat asset listing. |
| 2.4.0-stable | Phase 2.4.0 — Planning Engine | stable | 2026-05-22 | Monthly planning engine. DeepSeek + Vault RAG generates full-month content proposals with subject/grade rotation, duplicate-topic detection, and per-day confidence scoring. Plans persisted to data/plans/. |
| 2.3.0-stable | Phase 2.3.0 — Approval Gate API | stable | 2026-05-22 | 5-gate approval state machine. Direction → Worksheet → Template → Caption → Final Package. Vault write-back on worksheet and caption gate approval. Package state persisted to data/packages/. |
| 2.2.0-stable | Phase 2.2.0 — DeepSeek Integration | stable | 2026-05-22 | DeepSeek integration with RAG pipeline — worksheet draft, caption draft, and daily summary endpoints |
| 2.1.0-stable | Phase 2.1.0 — ChromaDB Layer | stable | 2026-05-22 | Local ChromaDB vector database integration. Ingestion, query, and seed pipelines. Three API routes: /api/vault/ingest, /api/vault/query, /api/vault/seed. Seeds from existing worksheets, templates, avatars, and vault/ contents. |
| 2.0.0-stable | Phase 2.0.0 — Vault Schema | stable | 2026-05-22 | Vault asset type system. Defines TypeScript interfaces and Zod schemas for all Vault asset types (template, worksheet, caption, prompt, topic, avatar, brand-rule), lifecycle states, freshness model, reuse score, provenance tracking, and rejection records. |
| 1.5.2-stable | Patch 1.5.2 | stable | 2026-05-22 | Documentation patch — v2 phase queue defined. New backend-first phase sequence (2.0.0–3.1.0) replaces old planned phases (2.0.0–2.3.0). ChromaDB and DeepSeek architecture constraints documented. |
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






























