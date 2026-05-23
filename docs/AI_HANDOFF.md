# AI Handoff

## Current Version: 3.5.1-alpha

## Current Phase

Patch 3.5.1 [3.5.1-alpha] — Generate Worksheet Crash Fix — alpha.

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
records only â€” the actual files live on disk and are never embedded.
DeepSeek API handles all text generation. Visuals and worksheet template
generation go to external tools via the Prompt Library.

## Patch 3.5.1 [3.5.1-alpha] — Generate Worksheet Crash Fix

Status: alpha

Version: 3.5.1-alpha

Scope: Bug fix — ReviewFlow.tsx handleGenerate.

Bugs fixed:
- Missing template field in Generate Worksheet POST body
- No res.ok guard causing error payloads to be stored as drafts and crash on undefined draft


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


## Patch 3.4.1 [3.4.1-stable] â€” Export Overhaul

Status: stable

Version: 3.4.1-stable

Purpose: Export Overhaul â€” remove PDF export from preview and replace
server-side PNG export with client-side worksheet image saving.

Validation:
- PDF export button removed from PreviewControls
- PNG export replaced with client-side handleSaveImage using html-to-image
- Targets .worksheet DOM element at pixelRatio 2 â€” no padding artifact
- showSaveFilePicker Save As dialog with AbortError guard
- createObjectURL download fallback for Safari and Firefox
- All 10 checks passed, build clean, 21/21 pages

## Phase 3.4.0 [3.4.0-stable] â€” Worksheet Builder

Status: stable

Version: 3.4.0-stable

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

Purpose: Analytics + Recommendations â€” operator-facing analytics screen
using demo data until real performance metrics exist.

Scope:
- /analytics route â€” Server Component loads mock analytics snapshot
- AnalyticsDashboard client component â€” AI summary, top/worst post cards,
  subject-grade heatmap, localStorage-backed dismissible recommendations
- analytics types and mock snapshot provider
- SidebarNav â€” Analytics link added

New files:
- src/lib/analytics.types.ts
- src/lib/analytics.mock.ts
- src/app/analytics/page.tsx
- src/components/analytics/AnalyticsDashboard.tsx

Modified files:
- src/components/shell/SidebarNav.tsx
- docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

Validation:
- analytics.types.ts â€” PerformanceStat, HeatmapCell, RecommendationCard,
  AnalyticsSnapshot interfaces
- analytics.mock.ts â€” getMockSnapshot() returns demo snapshot with isDemo: true,
  AI summary, 5 top posts, 5 worst posts, 36-cell heatmap, 4 recommendation cards
- /analytics server page â€” calls getMockSnapshot, passes to AnalyticsDashboard
- AnalyticsDashboard client component â€” AI summary card with Demo Data pill,
  top/worst post columns, subjectÃ—grade heatmap, dismissible recommendation cards
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

Purpose: Vault Browser â€” standing UI for browsing, inspecting, and mutating
the lifecycle of Vault assets indexed in ChromaDB.

Scope:
- /vault route â€” Server Component loads all 7 asset types
- VaultBrowser client component â€” tabs, search, asset grid, lifecycle actions
- POST /api/vault/asset/[id]/lifecycle â€” lifecycle mutation via re-ingest
- SidebarNav â€” Vault link added

New files:
- src/app/vault/page.tsx
- src/components/vault/VaultBrowser.tsx
- src/app/api/vault/asset/[id]/lifecycle/route.ts

Modified files:
- src/components/shell/SidebarNav.tsx
- docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

Validation:
- /vault page created â€” server component with ChromaDB asset fetch and offline fallback
- VaultBrowser client component â€” type filter tabs, name/tag search, asset cards with freshness/lifecycle/usage, lifecycle mutation buttons
- POST /api/vault/asset/[id]/lifecycle route â€” reads asset, updates lifecycle field, re-ingests via upsert
- Vault nav link added to SidebarNav
- All 15 checks passed, build clean

## Phase 3.0.0 [3.0.0-stable]

Status: stable

Purpose: Make the Monthly Planner bi-directional. Past calendar cells read
existing package files and show shipped/in-review status. Future cells show
planned content with in-review overlay when a package already exists for that
date. The day detail panel gains a package gate summary section.

Scope:
- src/lib/calendar.ts (new) â€” getPackagesForMonth() read-only helper
- src/app/planner/[month]/page.tsx â€” load packages, pass to PlannerView
- src/components/planner/PlannerView.tsx â€” bi-directional rendering,
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
- tailwind.config.ts â€” design tokens + font families
- globals.css â€” CSS custom properties
- layout.tsx â€” sidebar shell with SidebarNav client component
- SidebarNav.tsx (new) â€” active-state nav with usePathname
- page.tsx â€” Command Center redesign
- TodayStatus.tsx â€” dark banner card
- MonthProgress.tsx â€” card redesign
- VaultAlerts.tsx â€” tinted card redesign
- review/page.tsx â€” page heading
- planner/[month]/page.tsx â€” page heading + month nav
- ReviewFlow.tsx â€” design system applied
- PlannerView.tsx â€” design system applied

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
Direction â†’ Worksheet â†’ Template â†’ Caption â†’ Final Package. Persist package
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

- Phase 2.0.0 â€” Vault Schema
- Phase 2.1.0 â€” ChromaDB Layer
- Phase 2.2.0 â€” DeepSeek Integration
- Phase 2.3.0 â€” Approval Gate API
- Phase 2.4.0 â€” Planning Engine
- Phase 2.5.0 â€” Prompt Library API
- Phase 2.6.0 â€” AI Command Center
- Phase 2.7.0 â€” Daily Package Review
- Phase 2.8.0 â€” Monthly Planner
- Phase 2.9.0 â€” UI Design System
- Phase 3.0.0 â€” Calendar Intelligence
- Phase 3.1.0 â€” Vault Browser
- Phase 3.3.0 â€” UI Animations + Onboarding

## Recommended Next Step

Phase 3.3.0 â€” UI Animations + Onboarding.

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






