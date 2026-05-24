# AI Handoff

**Current Version:** 5.2.1-stable

## Current Phase

Patch 5.2.1 [5.2.1-stable] — Real Graphify Output

Status: stable

The 4.x template builder series (4.0.0 through 4.5.0) is fully complete.
The 5.x workflow infrastructure series is now active.

Current scope complete: graphifyy is installed in the active Python environment and
the real graphify CLI generated graphify-out/graph.json plus GRAPH_REPORT.md.
codebase-graph.json is normalized from Graphify output with fallbackUsed false.
Graph read-first docs now point Codex to the report for orientation-heavy work.

Next recommended work: Patch 5.2.2 — Graphify Workflow Clarification.

## Completed Phase

Patch 5.2.1 [5.2.1-stable] — Real Graphify Output: installed graphifyy, generated graphify-out/graph.json and GRAPH_REPORT.md, normalized codebase-graph.json from Graphify output, and updated graph read-first docs — complete.

Phase 5.2.0 [5.2.0-stable] — Graphify-Ready Codebase Graph: committed codebase-graph.json, added Graphify wrapper and degraded fallback scanner, and wired graph read-first workflow docs — complete.

Patch 5.1.1 [5.1.1-stable] — Future Plans Queue: populated FUTURE_PLANS.md with 5.0.x + 5.1.0 completions and 5.2.0–5.5.0 planned phases with token optimization rationale — complete.

Phase 5.1.0 [5.1.0-stable] — Automation Scripts: commit-phase.ps1 single-file commit helper, validate.ps1 standard validation runner, docs/COMPACT_STRATEGY.md context window management strategy, and CLAUDE.md/WORKFLOW.md script wiring — complete.

Patch 5.0.2 [5.0.2-stable] — Workflow Doc Hardening: corrected workflow docs for five versioning locations, promote.ps1 stable-promotion flow, and 5.0.x Key File Map entries; validation passed — complete.

Patch 5.0.1 [5.0.1-stable] — Mojibake + State Column Fix: docs mojibake repaired, fix-mojibake wrapper added, promote.ps1 State field handling improved, validation passed — complete.

Phase 5.0.0 [5.0.0-stable] — Workflow Core Hardening: STATE.json machine-readable project state, scripts/promote.ps1 stable promotion helper, docs/CODEX_RULES.md standing ruleset, CLAUDE.md session start protocol update, and pre-4.x doc history archive — complete.

Phase 4.5.0 [4.5.0-stable] — Vault Ingestion + AI Template Recommendation: saved TemplateDefinitions ingest into ChromaDB, review flow shows a best-fit recommendation badge, and template approval increments reuse score — complete.

Phase 4.4.0 [4.4.0-stable] — Live Preview + Publish: right-panel Style/Preview toggle with scaled DynamicWorksheetTemplate live preview driven by current TemplateDefinition state and sample worksheet content — complete.

Phase 4.3.0 [4.3.0-stable] — Property Panel: right-side editor panel with global palette color controls, footer text, avatar selector, selected-slot style overrides, and two-column template editor layout — complete.

Phase 4.2.0 [4.2.0-stable] — Canvas + Drag-and-Drop Slots: dnd-kit slot editor, reorderable TemplateSlot list, add/remove slot controls, save API route, new/edit template pages wired to editor — complete.

Phase 4.1.0 [4.1.0-stable] — Template Routes + List Page: /templates nav entry, built-in/custom template list page, New Template placeholder, and edit placeholder routes — complete.

Phase 4.0.0 [4.0.0-stable] — Template definition schema (TemplateDefinition, TemplatePalette, TemplateSlot), template store (vault/templates/), DynamicWorksheetTemplate renderer, integrated into preview, builder, and review flow template selector. Sample modern_v1 template included — complete.
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

## Patch 3.6.4 [3.6.4-stable] — Daily Review UX Polish + Print/Export Fixes

Status: stable

Version: 3.6.4-stable

Scope: globals.css, preview page, PreviewControls, review page, ReviewFlow.tsx

Files:
- src/app/globals.css
- src/app/preview/[id]/page.tsx
- src/app/preview/[id]/PreviewControls.tsx
- src/app/review/page.tsx
- src/components/review/ReviewFlow.tsx

Purpose: Fix scrollbar visible in print/PDF (overflow:hidden in print CSS). Multi-page PNG export — worksheet sliced into letter-proportion pages, single-page uses Save As dialog, multi-page auto-downloads each slice. preview/[id] redirects to /worksheets instead of 404 on missing worksheet. Fill from Plan button removed from direction gate — operator fills manually. Instructions link moved inline-right of Generate button with items-end alignment; same in action row. Draft worksheet and caption persisted to localStorage keyed by pkg.id so navigation away and back preserves in-progress work. Step indicator rewritten with flatMap to use fixed-width steps + flex-1 connectors for even spacing.

Validation:
- Build clean
- All 16 checks passed
- Print fix, redirect, multi-page PNG, planDay removal, localStorage persistence,
  Fill from Plan removal, inline Instructions layout, items-end alignment,
  flatMap step indicator all confirmed
- Version bump confirmed in all four versioning files

## Patch 3.6.3 [3.6.3-stable] — Final Package Lock and Worksheet Link

Status: stable

Version: 3.6.3-stable

Scope: approval.actions.ts + ReviewFlow.tsx

Files:
- src/lib/approval.actions.ts
- src/components/review/ReviewFlow.tsx

Purpose: When the final gate is approved, save the AI-generated worksheet to content/worksheets/[date].json using the existing saveWorksheet utility so it appears in /worksheets for editing and export. Show Edit Worksheet and Preview links in the final gate card. Lock the entire review page (all action rows return null, locked banner appears) when the package is complete so the day cannot be further edited from the review screen.

Validation:
- Build clean
- isTemplatePayload, saveWorksheetContent, saveWorksheet confirmed in approval.actions.ts
- gate === 'final' hook in approveGate confirmed
- isPackageComplete, Link, Edit Worksheet link, locked banner confirmed in ReviewFlow.tsx
- Version bump confirmed in all four versioning files

## Patch 3.6.2 [3.6.2-stable] — Daily Review UI/UX Fixes

Status: stable

Version: 3.6.2-stable

Scope: ReviewFlow.tsx UI/UX improvements across all gates.

Files:
- src/components/review/ReviewFlow.tsx

Purpose: Edit button (outline style) on all approved non-final gates so the operator can reset any gate before finalizing. Empty border removed when worksheet/caption has no draft yet. Regenerate button styled as outline with Regenerating... loading state. Instructions link persists in action row after draft generation. Hashtags merged into caption copy block so Copy copies caption + hashtags together.

Validation:
- Build clean
- outlineButtonClass defined and used at 3 sites in ReviewFlow.tsx
- Edit Direction button removed from renderDirectionBody approved body
- resetGate(gate) in renderActionRow approved branch
- Regenerating... loading state on both regenerate buttons
- hasWorksheetDraft guards in action row and instructions link blocks
- fullCopyText merges hashtags into caption copy block
- Version bump confirmed in all four versioning files

## Patch 3.6.1 [3.6.1-stable] — Daily Review UI Improvements

Status: stable

Version: 3.6.1-stable

Scope: Direction edit/fill, full draft content display, Instructions UX.

Files:
- src/app/api/approval/gate/[gate]/reset/route.ts
- src/components/review/ReviewFlow.tsx

Purpose: Add a reset route so approved direction can return to pending for
editing, add Fill from Plan to the direction form, expand worksheet and
caption draft displays to show full content, and move Instructions from the
action row to a subtle link near Generate.

Validation:
- All 7 validation checks passed
- Build clean, 22 pages
- reset/route.ts exists
- resetGate, Fill from Plan, Edit Direction confirmed in ReviewFlow.tsx
- tracking-widest count 5

Next recommended work:
- Export from builder
- Additional worksheet templates
- Real analytics pipeline

## Phase 3.6.0 [3.6.0-stable] — Instructions Flow

Status: stable

Version: 3.6.0-stable

Scope: Remove Reject, redesign Redirect as Instructions flow.

Files:
- src/lib/ai.types.ts
- src/app/api/ai/draft/worksheet/route.ts
- src/app/api/ai/draft/caption/route.ts
- src/components/review/RedirectModal.tsx
- src/components/review/ReviewFlow.tsx

Purpose: Remove Reject from gate action rows. Replace Redirect with an
editable Instructions dialog for worksheet and caption gates. Saved
instruction text is held in ReviewFlow state and included as optional AI
request context on the next worksheet or caption generation.

Validation:
- All 8 validation checks passed
- Build clean, 21 pages
- instruction field confirmed in ai.types.ts and both API routes
- worksheetInstruction wired through ReviewFlow.tsx
- rejectTarget fully removed
- initialValue confirmed in RedirectModal.tsx

Next recommended work:
- Export from builder
- Additional worksheet templates
- Real analytics pipeline

## Patch 3.5.6 [3.5.6-stable] — Generate Caption Crash Fix

Status: stable

Version: 3.5.6-stable

Scope: Bug fix — Generate Caption field name mismatch.

Files:
- src/components/review/ReviewFlow.tsx

Purpose: Fix Generate Caption by sending the payload required by
CaptionDraftRequestSchema: worksheetTitle, grade, subject, and topic.
The previous request sent worksheetContent with the draft object/null,
causing schema validation to reject the request.

Validation:
- All 4 validation checks passed
- Build clean, 21 pages
- worksheetTitle present in ReviewFlow.tsx
- worksheetContent removed from ReviewFlow.tsx

Next recommended work:
- Real analytics pipeline
- Export from builder
- Additional worksheet templates

## Patch 3.5.5 [3.5.5-stable] — Mojibake + Missed Version Label Fix

Status: stable

Version: 3.5.5-stable

Scope: Mojibake fix across all docs plus missed version label fix in
AI_HANDOFF.md.

Files:
- docs/PHASE_LOG.md
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

Purpose: Replace UTF-8 mojibake sequences for em dash, right arrow, and
multiplication sign across the four versioning docs. Correct missed
3.4.0/3.4.1 labels in AI_HANDOFF.md for Worksheet Builder and Export
Overhaul.
Validation:
- Version label fixes in AI_HANDOFF.md confirmed
- Version bump confirmed in all four versioning files
- Mojibake fix confirmed indirectly via clean em-dash display in grep output

Next recommended work:
- Real analytics pipeline
- Export from builder
- Additional worksheet templates

## Patch 3.5.4 [3.5.4-stable] — Version Ordering Fix

Status: stable

Version: 3.5.4-stable

Scope: Docs hardening — version ordering fix and ordering rule.

Files:
- docs/PHASE_LOG.md
- docs/VERSIONING.md
- CLAUDE.md
- docs/WORKFLOW.md

Purpose: Correct out-of-order version labels for Worksheet Builder,
Export Overhaul, and UI Animations + Onboarding. Add explicit rules that
future version numbers must be monotonically increasing and follow
implementation order, not planning order.

Validation:
- All 10 grep checks passed
- Version history ordering corrected in PHASE_LOG.md and VERSIONING.md
- Ordering rule confirmed in CLAUDE.md and WORKFLOW.md

Next recommended work:
- Real analytics pipeline
- Export from builder
- Additional worksheet templates

## Patch 3.5.3 [3.5.3-stable] — 1-by-1 Commit Rule Hardening

Status: stable

Version: 3.5.3-stable

Scope: Docs hardening — one git add + one git commit per file rule.

Files:
- CLAUDE.md
- docs/WORKFLOW.md

Purpose: Make the 1-by-1 commit rule unambiguous for implementation commit
blocks and stable-promotion commit blocks. Each file must receive exactly one
git add and one git commit; grouping multiple files into one commit is never
allowed.

Validation:
- All 5 grep checks passed
- Rule present in CLAUDE.md and WORKFLOW.md in three locations
- Version bump confirmed in all four versioning files

Next recommended work:
- Real analytics pipeline
- Export from builder
- Additional worksheet templates

## Patch 3.5.2 [3.5.2-stable] — Post-Stable Bug Versioning Rule

Status: stable

Version: 3.5.2-stable

Scope: Docs hardening — post-stable bug versioning rule.

Files:
- CLAUDE.md
- docs/WORKFLOW.md
- docs/VERSIONING.md

Purpose: Encode that any bug discovered after a stable release always opens
a new Z+1 patch version and must include version bumps to X.Y.(Z+1)-alpha in
all four versioning files as part of the implementation prompt.

Validation:
- All 6 grep checks passed
- Rule present in CLAUDE.md, WORKFLOW.md, and VERSIONING.md
- Version bump confirmed in all four versioning files

Next recommended work:
- Real analytics pipeline
- Export from builder
- Additional worksheet templates

## Patch 3.5.1 [3.5.1-stable] — Generate Worksheet Crash Fix

Status: stable

Version: 3.5.1-stable

Scope: Bug fix — ReviewFlow.tsx handleGenerate.

Bugs fixed:
- Missing template field in Generate Worksheet POST body
- No res.ok guard causing error payloads to be stored as drafts and crash on undefined draft

Validation:
- Build clean
- TypeScript zero errors
- Generate Worksheet no longer crashes
- Inline generation error display confirmed

Next recommended work:
- Real analytics pipeline
- Export from builder
- Additional worksheet templates


## Patch 3.5.0 [3.5.0-stable] — Daily Review Fix

Status: stable

Version: 3.5.0-stable

Purpose: Daily Review Fix — Direction pre-populated from today's Planner data.
Generate Worksheet and Generate Caption buttons added. Template gate replaced
with visual card selector.

Validation:
- Build clean
- TypeScript zero errors
- Direction pre-population verified from today's Planner data
- Generate Worksheet and Generate Caption buttons present
- Worksheet and caption draft state confirmed
- Template selector replaces free-text input
- renderActionRow narrowing fixed with status === 'pending'

Next recommended work:
- Real analytics pipeline
- Export from builder
- Additional worksheet templates


## Patch 3.3.1 [3.3.1-stable] — Export Overhaul

Status: stable

Version: 3.3.1-stable

Purpose: Export Overhaul — remove PDF export from preview and replace
server-side PNG export with client-side worksheet image saving.

Validation:
- PDF export button removed from PreviewControls
- PNG export replaced with client-side handleSaveImage using html-to-image
- Targets .worksheet DOM element at pixelRatio 2 — no padding artifact
- showSaveFilePicker Save As dialog with AbortError guard
- createObjectURL download fallback for Safari and Firefox
- All 10 checks passed, build clean, 21/21 pages

## Phase 3.3.0 [3.3.0-stable] — Worksheet Builder

Status: stable

Version: 3.3.0-stable

Purpose: Worksheet Builder - block-based worksheet builder with /worksheets
route, drag-to-reorder sections, live preview, form editor, delete, and AI
regeneration modal.

Scope:
- /worksheets route replaces the dashboard worksheet section
- Block conversion utilities for worksheet section ordering
- WorksheetBuilder client component with live cozy_v1 preview
- BlockPanel client component with dnd-kit section ordering and live forms
- Worksheet delete API and inline delete confirmation
- Legacy /edit routes redirect to /worksheets

Validation:
- sectionOrder field added to WorksheetContent in types.ts
- worksheet.blocks.ts - WorksheetBlock union type, worksheetToBlocks,
  blocksToWorksheet utilities
- deleteWorksheet added to save.ts, DELETE /api/worksheets/[id] route
- WorksheetTemplate updated to render sections in sectionOrder
- /worksheets list page with inline delete confirm
- /worksheets/[id] - split-panel builder: dnd-kit sortable block list,
  inline form editor, scaled live preview, save/cancel, AI regeneration modal
- /worksheets/new - blank worksheet builder
- /edit routes redirect to /worksheets equivalents
- Worksheets sidebar link updated from /#worksheets to /worksheets
- All checks passed, build clean, 21/21 pages

## Phase 3.2.0 [3.2.0-stable]

Status: stable

Purpose: Analytics + Recommendations — operator-facing analytics screen
using demo data until real performance metrics exist.

Scope:
- /analytics route — Server Component loads mock analytics snapshot
- AnalyticsDashboard client component — AI summary, top/worst post cards,
  subject-grade heatmap, localStorage-backed dismissible recommendations
- analytics types and mock snapshot provider
- SidebarNav — Analytics link added

New files:
- src/lib/analytics.types.ts
- src/lib/analytics.mock.ts
- src/app/analytics/page.tsx
- src/components/analytics/AnalyticsDashboard.tsx

Modified files:
- src/components/shell/SidebarNav.tsx
- docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

Validation:
- analytics.types.ts — PerformanceStat, HeatmapCell, RecommendationCard,
  AnalyticsSnapshot interfaces
- analytics.mock.ts — getMockSnapshot() returns demo snapshot with isDemo: true,
  AI summary, 5 top posts, 5 worst posts, 36-cell heatmap, 4 recommendation cards
- /analytics server page — calls getMockSnapshot, passes to AnalyticsDashboard
- AnalyticsDashboard client component — AI summary card with Demo Data pill,
  top/worst post columns, subject-grade heatmap, dismissible recommendation cards
  persisted to localStorage
- Analytics nav link + bar chart icon added to SidebarNav
- All 17 checks passed, build clean, 19/19 static pages

## Phase 3.3.0 [3.3.0-stable] — UI Animations + Onboarding

Status: stable

Version: 3.3.0-stable

Purpose: UI Animations + Onboarding — first-run orientation, re-openable
help flow, page transitions, and sidebar nav micro-interactions.

Validation:
- PageTransition.tsx — Framer Motion enter animation (fade + slide up)
  keyed by pathname, no AnimatePresence at root level
- OnboardingOverlay.tsx — 4-step modal, first-run auto-open via
  localStorage, re-openable via hfk:open-help custom event,
  AnimatePresence on step content and modal itself
- Root layout wired with PageTransition wrapping children and
  OnboardingOverlay mounted as sibling
- SidebarNav — Help button dispatches hfk:open-help, nav items
  have whileHover and whileTap micro-interactions via Framer Motion
- next.config.mjs — transpilePackages added for framer-motion to
  fix static prerendering of /404 and /500 error pages
- All checks passed, build clean, 21/21 pages

Roadmap complete. All planned phases 1.0.0 through 3.3.0 are now stable.

## Phase 3.1.0 [3.1.0-stable]

Status: stable

Purpose: Vault Browser — standing UI for browsing, inspecting, and mutating
the lifecycle of Vault assets indexed in ChromaDB.

Scope:
- /vault route — Server Component loads all 7 asset types
- VaultBrowser client component — tabs, search, asset grid, lifecycle actions
- POST /api/vault/asset/[id]/lifecycle — lifecycle mutation via re-ingest
- SidebarNav — Vault link added

New files:
- src/app/vault/page.tsx
- src/components/vault/VaultBrowser.tsx
- src/app/api/vault/asset/[id]/lifecycle/route.ts

Modified files:
- src/components/shell/SidebarNav.tsx
- docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

Validation:
- /vault page created — server component with ChromaDB asset fetch and offline fallback
- VaultBrowser client component — type filter tabs, name/tag search, asset cards with freshness/lifecycle/usage, lifecycle mutation buttons
- POST /api/vault/asset/[id]/lifecycle route — reads asset, updates lifecycle field, re-ingests via upsert
- Vault nav link added to SidebarNav
- All 15 checks passed, build clean

## Phase 3.0.0 [3.0.0-stable]

Status: stable

Purpose: Make the Monthly Planner bi-directional. Past calendar cells read
existing package files and show shipped/in-review status. Future cells show
planned content with in-review overlay when a package already exists for that
date. The day detail panel gains a package gate summary section.

Scope:
- src/lib/calendar.ts (new) — getPackagesForMonth() read-only helper
- src/app/planner/[month]/page.tsx — load packages, pass to PlannerView
- src/components/planner/PlannerView.tsx — bi-directional rendering,
  package summary in detail panel, calendar legend

New files: src/lib/calendar.ts

Modified files: src/app/planner/[month]/page.tsx,
  src/components/planner/PlannerView.tsx,
  docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

## Phase 2.9.0 [2.9.0-stable]

Status: stable

Purpose: Apply the HFK design system across the entire app shell and all
existing screens. Introduce sidebar navigation, Google Fonts (Inter,
Instrument Serif, JetBrains Mono), design token extension in Tailwind,
and card-based component redesign.

Scope:
- tailwind.config.ts — design tokens + font families
- globals.css — CSS custom properties
- layout.tsx — sidebar shell with SidebarNav client component
- SidebarNav.tsx (new) — active-state nav with usePathname
- page.tsx — Command Center redesign
- TodayStatus.tsx — dark banner card
- MonthProgress.tsx — card redesign
- VaultAlerts.tsx — tinted card redesign
- review/page.tsx — page heading
- planner/[month]/page.tsx — page heading + month nav
- ReviewFlow.tsx — design system applied
- PlannerView.tsx — design system applied

New files:
- src/components/shell/SidebarNav.tsx

Modified files:
- tailwind.config.ts
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.tsx
- src/components/command/TodayStatus.tsx
- src/components/command/MonthProgress.tsx
- src/components/command/VaultAlerts.tsx
- src/components/review/ReviewFlow.tsx
- src/components/planner/PlannerView.tsx
- src/app/review/page.tsx
- src/app/planner/[month]/page.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

## Phase 2.8.0 [2.8.0-stable]

Status: stable

Purpose:
Provide a monthly planner UI for browsing generated plans, inspecting daily
plan details, locking days, and generating or regenerating monthly content
plans from the planning backend.

Scope:
- /planner redirect to the current month
- /planner/[month] monthly calendar page
- Interactive PlannerView client component
- Calendar grid with subject chips, confidence indicators, duplicate-risk
  highlighting, today highlight, and selected-day state
- Day detail panel with objective, confidence, duplicate risk, notes, and lock
  toggle
- Lock API route for toggling PlanDay.locked
- MonthProgress View Planner link
- Backward-compatible locked field on PlanDay
- No changes to existing planning GET route, content files, or generation logic

New files:
- src/app/api/planning/[month]/lock/[date]/route.ts
- src/app/planner/page.tsx
- src/app/planner/[month]/page.tsx
- src/components/planner/PlannerView.tsx

Modified files:
- src/lib/planning.types.ts
- src/components/command/MonthProgress.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.7.0 [2.7.0-stable]

Status: stable

Purpose:
Provide an operator-facing review screen for the daily package approval
workflow. Operators can review each gate, approve generated content, reject
with a reason, or redirect a gate with guidance.

Scope:
- /review page for today's package
- Interactive 5-gate review flow client component
- Direction gate inline topic/grade/subject/objective form
- Worksheet and caption draft display
- Template selector and final package approval state
- Provenance panels for generated worksheet and caption content
- Inline rejection form
- Redirect modal
- Command Center Review link
- No new API routes, lib changes, package installs, or data model changes

New files:
- src/app/review/page.tsx
- src/components/review/ReviewFlow.tsx
- src/components/review/RedirectModal.tsx

Modified files:
- src/components/command/TodayStatus.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.6.0 [2.6.0-stable]

Status: stable

Purpose:
Wire the completed v2 backend phases into the home dashboard. The Command
Center surfaces today's package gate status, monthly plan progress, Vault
health alerts, and the existing worksheet list.

Scope:
- Today's package status Server Component
- Monthly plan progress Server Component
- Vault health and duplicate-risk alert Server Component
- Home page Command Center layout
- Existing worksheet library preserved below the command sections
- No new API routes, backend mutations, package installs, or validation changes

New files:
- src/components/command/TodayStatus.tsx
- src/components/command/MonthProgress.tsx
- src/components/command/VaultAlerts.tsx

Modified files:
- src/app/page.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.5.0 [2.5.0-stable]

Status: stable

Purpose:
Expose the Vault-stored prompt library for external tools. List all
VaultPrompt assets and assemble a ready-to-run prompt from topic, grade,
subject, optional objective, and HFK brand voice context.

Scope:
- Prompt assembly request/response types
- VaultPrompt listing helper
- Prompt interpolation for topic, grade, grade label, subject, and objective
- Brand voice retrieval from Vault brand-rule assets
- Context append behavior for prompts without placeholders
- Prompt list API route
- Prompt assembly API route
- No DeepSeek generation, image generation, UI, or data writes

New files:
- src/lib/prompt.types.ts
- src/lib/prompt.assemble.ts
- src/app/api/prompts/route.ts
- src/app/api/prompts/assemble/route.ts

Modified files:
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.4.0 [2.4.0-stable]

Status: stable

Purpose:
Generate full-month content plans using DeepSeek plus Vault RAG context.
Each planned day includes topic, grade, subject, learning objective,
confidence score, duplicate-risk flag, and optional notes.

Scope:
- Monthly plan type contracts
- Filesystem plan store under data/plans/
- Planning-specific Vault RAG context retrieval
- DeepSeek monthly plan generation
- Subject and grade rotation guidance
- Duplicate-topic context from Vault worksheets and topics
- Confidence scoring requested per day
- Generate monthly plan API route
- Retrieve saved monthly plan API route
- No UI, scheduling, publishing automation, or approval mutations

New files:
- src/lib/planning.types.ts
- src/lib/planning.store.ts
- src/lib/planning.rag.ts
- src/lib/planning.generate.ts
- src/app/api/planning/generate/route.ts
- src/app/api/planning/[month]/route.ts

Modified files:
- .gitignore
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.3.0 [2.3.0-stable]

Status: stable

Purpose:
Build the 5-gate approval state machine for daily content packages:
Direction → Worksheet → Template → Caption → Final Package. Persist package
state as JSON and write approved worksheet/caption outputs back into the Vault.

Scope:
- Approval type contracts for gates, payloads, and daily packages
- Filesystem package store under data/packages/
- Approve, reject, and redirect gate actions
- Vault write-back for approved worksheet and caption gates
- Current-day package GET route
- Gate approve/reject/redirect API routes
- Redirect does not reset prior approved gates
- No UI, scheduling, publishing automation, or relational database

New files:
- src/lib/approval.types.ts
- src/lib/approval.store.ts
- src/lib/approval.actions.ts
- src/app/api/approval/package/route.ts
- src/app/api/approval/gate/[gate]/approve/route.ts
- src/app/api/approval/gate/[gate]/reject/route.ts
- src/app/api/approval/gate/[gate]/redirect/route.ts

Modified files:
- .gitignore
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.2.0 [2.2.0-stable]

Status: stable

Purpose:
Connect DeepSeek as the v2 text generation layer through the OpenAI-compatible
client. Build RAG prompt assembly on top of ChromaDB Vault retrieval and expose
generation endpoints for worksheet drafts, caption drafts, and daily summaries.

Scope:
- DeepSeek client using model deepseek-chat
- JSON-object generation helper with key validation
- RAG context retrieval for brand rules, prior worksheets, topic overlap, and
  caption patterns
- Typed AI request/response contracts
- Worksheet draft API route
- Caption draft API route
- Daily summary API route
- No UI, approval gate, template generation, image generation, or .env changes

New files:
- src/lib/ai.types.ts
- src/lib/deepseek.ts
- src/lib/vault.rag.ts
- src/app/api/ai/draft/worksheet/route.ts
- src/app/api/ai/draft/caption/route.ts
- src/app/api/ai/summary/route.ts

Modified files:
- package.json
- next.config.mjs
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- README.md

## Phase 2.1.0 [2.1.0-stable]

Status: stable

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

- Patch 5.2.2 — Graphify Workflow Clarification
- Patch 5.2.3 — Graphify Server/Tool Mode
- Phase 5.3.0 — ChromaDB Docs Extension
- Phase 5.4.0 — Portfolio Case Studies
- Phase 5.5.0 — Advanced Memory Layer
- hfk-token-dashboard has been scoped as a separate standalone project, not part of the HFK phase queue.

## Recommended Next Step

Start Patch 5.2.2 — Graphify Workflow Clarification. Next planned follow-up is Patch 5.2.3 — Graphify Server/Tool Mode.

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














