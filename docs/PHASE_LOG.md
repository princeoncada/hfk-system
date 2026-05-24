# Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 4.5.0-stable | Phase 4.5.0 | stable | 2026-05-24 | Vault Ingestion + AI Template Recommendation: saved TemplateDefinitions ingest into template_definitions Chroma collection, review flow queries best-fit custom template, recommendation badge appears in selector, and approved custom template reuse score increments. Files: template.types.ts, template.chroma.ts, templates recommend/reuse API routes, templates save API, review/page.tsx, ReviewFlow.tsx, versioning docs. |
| 4.4.0-stable | Phase 4.4.0 | stable | 2026-05-24 | Live Preview + Publish: right-panel Style/Preview toggle with scaled DynamicWorksheetTemplate live preview driven by current TemplateDefinition state and sample worksheet content. Files: TemplatePreview.tsx, TemplateSlotEditor.tsx, versioning docs. |
| 4.3.0-stable | Phase 4.3.0 | stable | 2026-05-24 | Property Panel: right-side editor panel with global palette color controls, footer text, avatar selector, selected-slot style overrides, and two-column template editor layout. Files: PropertyPanel.tsx, TemplateSlotEditor.tsx, SortableSlotRow.tsx, templates/new/page.tsx, templates/[id]/edit/page.tsx, versioning docs. |
| 4.2.0-stable | Phase 4.2.0 | stable | 2026-05-24 | Canvas + Drag-and-Drop Slots: dnd-kit slot editor, reorderable TemplateSlot list, add/remove slot controls, save API route, new/edit template pages wired to editor. Files: TemplateSlotEditor.tsx, SortableSlotRow.tsx, editor/index.ts, api/templates/save/route.ts, templates/new/page.tsx, templates/[id]/edit/page.tsx, versioning docs. |
| 4.1.0-stable | Phase 4.1.0 | stable | 2026-05-24 | Template Routes + List Page: /templates nav entry, built-in/custom template list page, New Template placeholder, and edit placeholder routes. Files: SidebarNav.tsx, templates/page.tsx, templates/new/page.tsx, templates/[id]/edit/page.tsx, versioning docs, FUTURE_PLANS.md. |
| 4.0.0-stable | Phase 4.0.0 | stable | 2026-05-24 | Template definition schema (TemplateDefinition, TemplatePalette, TemplateSlot), template store (vault/templates/), DynamicWorksheetTemplate renderer, integrated into preview, builder, and review flow template selector. Sample modern_v1 template included. |
| 3.8.0-stable | Phase 3.8.0 | stable | 2026-05-24 | Direction overhaul: grade/subject locked from planner, topic read-only with AI regenerate, objective editable, direction approval syncs topic/objective back to planner. |
| 3.7.1-stable | Patch 3.7.1 - Export Crop + Instructions Icon Fix | stable | 2026-05-24 | PNG export crop fix (scrollWidth/minWidth), PDF print crop fix (zero @page margin, 816px worksheet width), instructions button replaced with Lucide Plus/SlidersHorizontal icon. |
| 3.7.0-stable | Phase 3.7.0 - playful_v1 Template | stable | 2026-05-24 | playful_v1 template: emoji-illustrated colorful layout with Fredoka/Nunito fonts, rotating activity colors, vocab tracing lines for reading/vocab subjects. |
| 3.6.5-stable | Patch 3.6.5 - Print/PDF Fix | stable | 2026-05-24 | Print/PDF fix: @page rule, 0.5in margin, main padding reset, full-width worksheet on print. Files: src/app/globals.css. |
| 3.6.4-stable | Patch 3.6.4 Ã¢â‚¬â€ Daily Review UX Polish + Print/Export Fixes | stable | 2026-05-24 | Print/export fixes, Fill from Plan removed, Instructions inline layout, localStorage persistence, step indicator spacing. Files: globals.css, preview/[id]/page.tsx, preview/[id]/PreviewControls.tsx, review/page.tsx, ReviewFlow.tsx. |
| 3.6.3-stable | Patch 3.6.3 Ã¢â‚¬â€ Final Package Lock and Worksheet Link | stable | 2026-05-24 | Save AI worksheet to content/worksheets/ on final approval, Edit Worksheet and Preview links in final gate, locked banner + locked action rows when package complete. Files: src/lib/approval.actions.ts, src/components/review/ReviewFlow.tsx. |
| 3.6.2-stable | Patch 3.6.2 Ã¢â‚¬â€ Daily Review UI/UX Fixes | stable | 2026-05-24 | Edit button on all approved non-final gates, empty border removed when no draft, outline Regenerate with loading state, instructions link persists after generation, hashtags merged into caption copy block. Files: src/components/review/ReviewFlow.tsx. |
| 3.6.1-stable | Patch 3.6.1 Ã¢â‚¬â€ Daily Review UI Improvements | stable | 2026-05-24 | Direction edit/fill, full draft content display, Instructions UX. Files: src/app/api/approval/gate/[gate]/reset/route.ts, src/components/review/ReviewFlow.tsx. Validation: all 7 checks passed, build clean, 22 pages. |
| 3.6.0-stable | Phase 3.6.0 Ã¢â‚¬â€ Instructions Flow | stable | 2026-05-23 | Remove Reject, redesign Redirect as Instructions flow. Files: src/lib/ai.types.ts, src/app/api/ai/draft/worksheet/route.ts, src/app/api/ai/draft/caption/route.ts, src/components/review/RedirectModal.tsx, src/components/review/ReviewFlow.tsx. |
| 3.5.6-stable | Patch 3.5.6 Ã¢â‚¬â€ Generate Caption Crash Fix | stable | 2026-05-23 | Bug fix Ã¢â‚¬â€ Generate Caption field name mismatch. Files: src/components/review/ReviewFlow.tsx. |
| 3.5.5-stable | Patch 3.5.5 Ã¢â‚¬â€ Mojibake + Missed Version Label Fix | stable | 2026-05-23 | Docs hardening Ã¢â‚¬â€ mojibake fix across all docs plus missed version label fix in AI_HANDOFF.md. Files: docs/PHASE_LOG.md, docs/VERSIONING.md, docs/AI_HANDOFF.md, README.md. |
| 3.5.4-stable | Patch 3.5.4 Ã¢â‚¬â€ Version Ordering Fix | stable | 2026-05-23 | Docs hardening Ã¢â‚¬â€ version ordering fix and ordering rule. Files: docs/PHASE_LOG.md, docs/VERSIONING.md, CLAUDE.md, docs/WORKFLOW.md. |
| 3.5.3-stable | Patch 3.5.3 Ã¢â‚¬â€ 1-by-1 Commit Rule Hardening | stable | 2026-05-23 | Docs hardening Ã¢â‚¬â€ explicit one git add + one git commit per file rule for implementation and stable-promotion commit blocks. |
| 3.5.2-stable | Patch 3.5.2 Ã¢â‚¬â€ Post-Stable Bug Versioning Rule | stable | 2026-05-23 | Docs hardening Ã¢â‚¬â€ post-stable bug versioning rule. Files: CLAUDE.md, docs/WORKFLOW.md, docs/VERSIONING.md. |
| 3.5.1-stable | Patch 3.5.1 Ã¢â‚¬â€ Generate Worksheet Crash Fix | stable | 2026-05-23 | Bug fix Ã¢â‚¬â€ ReviewFlow.tsx handleGenerate. Fixed missing template field in POST body and no res.ok guard causing undefined draft crash. |
| 3.5.0-stable | Patch 3.5.0 Ã¢â‚¬â€ Daily Review Fix | stable | 2026-05-23 | Direction pre-populated from today's Planner data. Generate Worksheet and Generate Caption buttons added. Template gate replaced with visual card selector. |
| 3.4.0-stable | Phase 3.4.0 Ã¢â‚¬â€ UI Animations + Onboarding | stable | 2026-05-23 | 4-step onboarding overlay (first-run + re-openable via Help button in sidebar). Framer Motion page transitions and sidebar nav micro-interactions. |
| 3.3.1-stable | Patch 3.3.1 Ã¢â‚¬â€ Export Overhaul | stable | 2026-05-23 | Removed PDF export. PNG export now client-side via html-to-image targeting the .worksheet element at 2x. Save As dialog via showSaveFilePicker with download fallback. No more server-side archiving on export. |
| 3.3.0-stable | Phase 3.3.0 Ã¢â‚¬â€ Worksheet Builder | stable | 2026-05-23 | Block-based worksheet builder with /worksheets route, drag-to-reorder sections, live preview, form editor, delete, and AI regeneration modal |
| 3.2.0-stable | Phase 3.2.0 Ã¢â‚¬â€ Analytics + Recommendations | stable | 2026-05-22 | Analytics + Recommendations Ã¢â‚¬â€ demo analytics screen with AI summary, post performance lists, heatmap, and recommendations |
| 3.1.0-stable | Phase 3.1.0 Ã¢â‚¬â€ Vault Browser | stable | 2026-05-22 | Standing Vault asset library at /vault with browsing, inspection, and lifecycle mutation |
| 3.0.0-stable | Phase 3.0.0 Ã¢â‚¬â€ Calendar Intelligence | stable | 2026-05-22 | Calendar Intelligence Ã¢â‚¬â€ bi-directional planner calendar with package status overlays |
| 2.9.0-stable | Phase 2.9.0 Ã¢â‚¬â€ UI Design System | stable | 2026-05-22 | UI Design System Ã¢â‚¬â€ sidebar nav shell, full design token system, card-based component redesign across all screens |
| 2.8.0-stable | Phase 2.8.0 Ã¢â‚¬â€ Monthly Planner | stable | 2026-05-22 | Monthly Planner Ã¢â‚¬â€ calendar grid UI, day detail panel, lock toggle, generate/regenerate, planner navigation links from command dashboard |
| 2.7.0-stable | Phase 2.7.0 Ã¢â‚¬â€ Daily Package Review | stable | 2026-05-22 | Daily Package Review screen at /review with 5-gate interactive approval flow |
| 2.6.0-stable | Phase 2.6.0 Ã¢â‚¬â€ AI Command Center | stable | 2026-05-22 | AI Command Center home screen with async Server Components |
| 2.5.0-stable | Phase 2.5.0 Ã¢â‚¬â€ Prompt Library API | stable | 2026-05-22 | Prompt listing and assembly endpoints for VaultPrompt assets |
| 2.4.0-stable | Phase 2.4.0 Ã¢â‚¬â€ Planning Engine | stable | 2026-05-22 | Monthly planning engine with DeepSeek + Vault RAG and persisted data/plans/ output |
| 2.3.0-stable | Phase 2.3.0 Ã¢â‚¬â€ Approval Gate API | stable | 2026-05-22 | 5-gate approval state machine with package persistence and Vault write-back |
| 2.2.0-stable | Phase 2.2.0 Ã¢â‚¬â€ DeepSeek Integration | stable | 2026-05-22 | DeepSeek integration with RAG pipeline Ã¢â‚¬â€ worksheet draft, caption draft, and daily summary endpoints |
| 2.1.0-stable | Phase 2.1.0 Ã¢â‚¬â€ ChromaDB Layer | stable | 2026-05-22 | ChromaDB layer Ã¢â‚¬â€ ingestion, query, seed, and Vault API routes |
| 2.0.0-stable | Phase 2.0.0 Ã¢â‚¬â€ Vault Schema | stable | 2026-05-22 | Vault type system Ã¢â‚¬â€ interfaces and Zod schemas for all seven Vault asset types |
| 1.5.2-stable | Patch 1.5.2 | stable | 2026-05-22 | v2 Phase Planning Ã¢â‚¬â€ backend-first phase queue, ChromaDB, and DeepSeek constraints documented |
| 1.5.1-stable | Patch 1.5.1 | stable | 2026-05-21 | Validation hardening Ã¢â‚¬â€ require -LiteralPath for bracket paths in PowerShell |
| 1.5.0-stable | Phase 1.5.0 | stable | 2026-05-21 | Save + Archive Ã¢â‚¬â€ JSON editor UI, save API, archive-on-export |
| 1.4.1-stable | Patch 1.4.1 | stable | 2026-05-21 | Workflow hardening Ã¢â‚¬â€ Section 2 ownership, npm command rule, push block rule |
| 1.4.0-stable | Phase 1.4.0 | stable | 2026-05-21 | Export system Ã¢â‚¬â€ Puppeteer PDF + PNG export to exports/ |
| 1.3.0-stable | Phase 1.3.0 | stable | 2026-05-21 | Preview system Ã¢â‚¬â€ /preview/[id] route + print controls + getWorksheetById fix |
| 1.2.0-stable | Phase 1.2.0 | stable | 2026-05-21 | cozy_v1 worksheet template + print CSS |
| 1.1.0-stable | Phase 1.1.0 | stable | 2026-05-21 | JSON Content Schema Ã¢â‚¬â€ Zod validation + 3 sample worksheets |
| 1.0.5-stable | Patch 1.0.5 | stable | 2026-05-21 | Workflow hardening Ã¢â‚¬â€ remove Section 2, add upfront clarification step |
| 1.0.4-stable | Patch 1.0.4 | stable | 2026-05-21 | Vault restructure Ã¢â‚¬â€ consolidate numbered root folders into vault/ |
| 1.0.3-stable | Patch 1.0.3 | stable | 2026-05-21 | Workflow hardening Ã¢â‚¬â€ require stable-promotion prompt and commit block together |
| 1.0.2-stable | Patch 1.0.2 | stable | 2026-05-21 | Next.js config compatibility Ã¢â‚¬â€ replace next.config.ts with next.config.mjs |
| 1.0.1-stable | Patch 1.0.1 | stable | 2026-05-21 | Docs hardening Ã¢â‚¬â€ chathead opener + session checkpoint workflow |
| 1.0.0-stable | Phase 1.0.0 | stable | 2026-05-21 | Bootstrap Ã¢â‚¬â€ docs foundation + Next.js project scaffold |

## Validation Record — 4.0.0-stable

Date: 2026-05-24

- 14/14 checks passed
- Build clean at 22 pages
- Files validated: template.types.ts, template.store.ts, DynamicWorksheetTemplate.tsx, dynamic/index.ts, vault/templates/modern_v1.json, preview/[id]/page.tsx, worksheets/[id]/page.tsx, worksheets/new/page.tsx, WorksheetBuilder.tsx, review/page.tsx, ReviewFlow.tsx

# Phase Log

## Validation Record — 4.5.0-stable

Date: 2026-05-24

- 13/13 checks passed
- Build clean at 25 pages
- Files validated: template.types.ts, template.chroma.ts, recommend/route.ts, reuse/route.ts, save/route.ts, review/page.tsx, ReviewFlow.tsx, docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md
- Completes the 4.x template builder series
## Phase 4.5.0 — Vault Ingestion + AI Template Recommendation

Status: stable

Version: 4.5.0-stable

Date: 2026-05-24

Scope: Ingest saved TemplateDefinitions into ChromaDB and recommend the best-fit template in review flow.

Files:
- src/lib/template.types.ts
- src/lib/template.chroma.ts
- src/app/api/templates/recommend/route.ts
- src/app/api/templates/reuse/route.ts
- src/app/api/templates/save/route.ts
- src/app/review/page.tsx
- src/components/review/ReviewFlow.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

Changes:
- Added subjectAffinity, gradeAffinity, and reuseScore to TemplateDefinition and schema.
- Added template_definitions ChromaDB collection helper for ingest, best-fit query, and reuse-score updates.
- Added recommend and reuse API routes that degrade gracefully when ChromaDB is unavailable.
- Added non-fatal template ingest after saving TemplateDefinitions.
- Added server-side best-fit lookup for custom templates on the review page.
- Added Recommended badge in the template selector and reuse-score increment on template approval.
- Promoted all four versioning files to 4.5.0-stable.

## Validation Record — 4.4.0-stable

Date: 2026-05-24

- 10/10 checks passed
- Build clean at 25 pages
- Files validated: TemplatePreview.tsx, TemplateSlotEditor.tsx, docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

## Phase 4.4.0 — Live Preview + Publish

Status: stable

Version: 4.4.0-stable

Date: 2026-05-24

Scope: Add Style/Preview toggle and scaled live template preview to the editor.

Files:
- src/components/templates/editor/TemplatePreview.tsx
- src/components/templates/editor/TemplateSlotEditor.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

Changes:
- Added TemplatePreview with fixed 816px worksheet scaling into a 288px preview viewport.
- Added realistic sample WorksheetContent for live preview rendering.
- Added Style/Preview toggle to TemplateSlotEditor right panel.
- Derived currentDefinition from editor state so palette, slot, footer, and avatar changes preview immediately.
- Promoted all four versioning files to 4.4.0-stable.

## Validation Record — 4.3.0-stable

Date: 2026-05-24

- 13/13 checks passed
- Build clean at 25 pages
- Files validated: PropertyPanel.tsx, TemplateSlotEditor.tsx, SortableSlotRow.tsx, templates/new/page.tsx, templates/[id]/edit/page.tsx, docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

## Phase 4.3.0 — Property Panel

Status: stable

Version: 4.3.0-stable

Date: 2026-05-24

Scope: Add global palette controls and selected-slot style overrides to the template editor.

Files:
- src/components/templates/editor/PropertyPanel.tsx
- src/components/templates/editor/TemplateSlotEditor.tsx
- src/components/templates/editor/SortableSlotRow.tsx
- src/app/templates/new/page.tsx
- src/app/templates/[id]/edit/page.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

Changes:
- Added right-side PropertyPanel with HFK color token swatches and hex inputs for TemplatePalette fields.
- Added footer text and avatar selection controls, with avatar options read from assets/avatars/ by server pages.
- Added selected-slot style controls for background, text color, border color, border width, border radius, and padding.
- Updated TemplateSlotEditor to manage palette, avatar, footerText, selectedSlotId, and slot style state.
- Updated SortableSlotRow to support row selection and selected styling while preserving existing dnd-kit sorting behavior.
- Updated new/edit template pages to pass avatarOptions into the editor.
- Promoted all four versioning files to 4.3.0-stable.

## Validation Record — 4.2.0-stable

Date: 2026-05-24

- 10/10 checks passed
- Build clean at 25 pages
- Files validated: TemplateSlotEditor.tsx, SortableSlotRow.tsx, editor/index.ts, api/templates/save/route.ts, templates/new/page.tsx, templates/[id]/edit/page.tsx, docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

## Phase 4.2.0 — Canvas + Drag-and-Drop Slots

Status: stable

Version: 4.2.0-stable

Date: 2026-05-24

Scope: Replace template new/edit placeholders with a dnd-kit slot editor and save API.

Files:
- src/components/templates/editor/TemplateSlotEditor.tsx
- src/components/templates/editor/SortableSlotRow.tsx
- src/components/templates/editor/index.ts
- src/app/api/templates/save/route.ts
- src/app/templates/new/page.tsx
- src/app/templates/[id]/edit/page.tsx
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

Changes:
- Added client-side TemplateSlotEditor with name/description inputs, reorderable TemplateSlot list, add-slot type picker, remove-slot controls, and save flow.
- Added SortableSlotRow using dnd-kit sortable handles and slot type badges.
- Added /api/templates/save route to validate TemplateDefinition payloads and persist them via saveTemplate().
- Wired /templates/new to create a new template through the editor.
- Wired /templates/[id]/edit to load an existing vault template and edit its slot order.
- Promoted all four versioning files to 4.2.0-stable.

## Validation Record — 4.1.0-stable

Date: 2026-05-24

- 10/10 checks passed
- Build clean at 25 pages
- Files validated: templates/page.tsx, templates/new/page.tsx, templates/[id]/edit/page.tsx, SidebarNav.tsx, FUTURE_PLANS.md, docs/VERSIONING.md, docs/AI_HANDOFF.md, docs/PHASE_LOG.md, README.md

## Phase 4.1.0 — Template Routes + List Page

Status: stable

Version: 4.1.0-stable

Date: 2026-05-24

Scope: Scaffold template routes and list page.

Files:
- src/components/shell/SidebarNav.tsx
- src/app/templates/page.tsx
- src/app/templates/new/page.tsx
- src/app/templates/[id]/edit/page.tsx
- docs/FUTURE_PLANS.md
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- README.md

Changes:
- Added Templates sidebar navigation entry.
- Added /templates list page for built-in and custom vault templates.
- Added placeholder /templates/new route.
- Added placeholder /templates/[id]/edit route with template lookup and not-found state.
- Updated 4.x roadmap and versioning docs.


## Patch 3.6.4 Ã¢â‚¬â€ Daily Review UX Polish + Print/Export Fixes

Status: stable

Version: 3.6.4-stable

Date: 2026-05-24

Scope: Print/export fixes, review UX polish

Files:
- src/app/globals.css
- src/app/preview/[id]/page.tsx
- src/app/preview/[id]/PreviewControls.tsx
- src/app/review/page.tsx
- src/components/review/ReviewFlow.tsx

Changes:
- globals.css: overflow:hidden + scrollbar:none added to print media query
- preview/[id]/page.tsx: redirect('/worksheets') replaces notFound()
- PreviewControls.tsx: handleSaveImage splits worksheet into letter-proportion page slices; single-page Ã¢â€ â€™ Save As dialog; multi-page Ã¢â€ â€™ auto-download per slice
- review/page.tsx: planDay/plan fetching removed; ReviewFlow receives only pkg
- ReviewFlow.tsx: useEffect added; planDay prop removed; dirForm starts empty; Fill from Plan button removed; gate description simplified; localStorage persistence for worksheetDraft/captionDraft/instructions; resetGate clears worksheet/caption draft state; Instructions button inline-right of Generate with flex items-end; action row items-center Ã¢â€ â€™ items-end; step indicator rewritten with flatMap fixed-width steps + flex-1 connectors

Validation:
- Build clean
- All 16 checks passed
- Version bump confirmed in all four versioning files

## Patch 3.6.3 Ã¢â‚¬â€ Final Package Lock and Worksheet Link

Status: stable

Version: 3.6.3-stable

Date: 2026-05-24

Scope: approval.actions.ts + ReviewFlow.tsx

Files:
- src/lib/approval.actions.ts
- src/components/review/ReviewFlow.tsx

Changes:
- approval.actions.ts: saveWorksheetContent() converts approved AI draft to WorksheetContent and calls saveWorksheet on final gate approval. isTemplatePayload type guard added. TemplatePayload imported. Wrapped in try/catch so approval never fails if save fails.
- ReviewFlow.tsx: isPackageComplete derived const. renderActionRow returns null when isPackageComplete. renderFinalBody approved state shows Edit Worksheet and Preview links using Next.js Link. Locked banner rendered above step circles when isPackageComplete.

Validation:
- Build clean
- All 14 checks passed
- approval.actions.ts and ReviewFlow.tsx changes confirmed
- Version bump confirmed in all four versioning files

## Patch 3.6.2 Ã¢â‚¬â€ Daily Review UI/UX Fixes

Status: stable

Version: 3.6.2-stable

Date: 2026-05-24

Scope: ReviewFlow.tsx UI/UX improvements

Files:
- src/components/review/ReviewFlow.tsx

Changes:
- outlineButtonClass added for outline-style buttons
- renderDirectionBody approved: Edit Direction button removed from body (now in action row)
- renderWorksheetBody pre-generation: instructions link stacked below Generate button
- renderCaptionDraft: hashtags merged into caption copy block; Copy copies full text
- renderCaptionBody pre-generation: instructions link stacked below Generate button
- renderActionRow rewritten: approved non-final gates show Edit button; empty border removed when no draft; Regenerate uses outline style with Regenerating... state; instructions link visible in action row when draft exists

Validation:
- Build clean
- All 10 checks passed
- outlineButtonClass, Edit button, Regenerating..., instructions link, fullCopyText all confirmed
- Version bump confirmed in all four versioning files

## Patch 3.6.1 Ã¢â‚¬â€ Daily Review UI Improvements

Status: stable

Version: 3.6.1-stable

Date: 2026-05-24

Scope: Direction edit/fill, full draft content display, Instructions UX

Files:
- src/app/api/approval/gate/[gate]/reset/route.ts
- src/components/review/ReviewFlow.tsx

Purpose: Improve the Daily Review operator flow by allowing approved
direction edits, refilling direction from the daily plan, showing complete
worksheet and caption drafts, and moving Instructions to a quieter link near
Generate.

Validation:
- All 7 checks passed
- Build clean, 22 pages

## Phase 3.6.0 Ã¢â‚¬â€ Instructions Flow

Status: stable

Version: 3.6.0-stable

Date: 2026-05-23

Scope: remove Reject, redesign Redirect as Instructions flow

Files:
- src/lib/ai.types.ts
- src/app/api/ai/draft/worksheet/route.ts
- src/app/api/ai/draft/caption/route.ts
- src/components/review/RedirectModal.tsx
- src/components/review/ReviewFlow.tsx

Purpose: Replace destructive Reject and redirect mutation actions with a
local Instructions flow for worksheet and caption generation. Saved
instructions are passed to the AI as optional context on the next generation.

Validation:
- Date: 2026-05-23
- Scope: remove Reject, Instructions flow with AI context injection
- Files: src/lib/ai.types.ts, src/app/api/ai/draft/worksheet/route.ts, src/app/api/ai/draft/caption/route.ts, src/components/review/RedirectModal.tsx, src/components/review/ReviewFlow.tsx
- All 8 checks passed
- Build clean

## Patch 3.5.6 Ã¢â‚¬â€ Generate Caption Crash Fix

Status: stable

Version: 3.5.6-stable

Date: 2026-05-23

Scope: bug fix Ã¢â‚¬â€ Generate Caption field name mismatch

Files:
- src/components/review/ReviewFlow.tsx

Purpose: Replace worksheetContent with worksheetTitle in the caption
generation fetch body so ReviewFlow matches CaptionDraftRequestSchema.

Validation:
- Date: 2026-05-23
- Scope: Generate Caption crash fix
- Files: src/components/review/ReviewFlow.tsx
- All 4 checks passed
- Build clean

## Patch 3.5.5 Ã¢â‚¬â€ Mojibake + Missed Version Label Fix

Status: stable

Version: 3.5.5-stable

Date: 2026-05-23

Scope: mojibake fix across all docs + missed version label fix in AI_HANDOFF.md

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
- Date: 2026-05-23
- Scope: mojibake fix and missed version label fix
- Files: docs/PHASE_LOG.md, docs/VERSIONING.md, docs/AI_HANDOFF.md, README.md
- Version label fixes confirmed
- Version bump confirmed

## Patch 3.5.4 Ã¢â‚¬â€ Version Ordering Fix

Status: stable

Version: 3.5.4-stable

Date: 2026-05-23

Scope: version ordering fix and ordering rule hardening

Files:
- docs/PHASE_LOG.md
- docs/VERSIONING.md
- CLAUDE.md
- docs/WORKFLOW.md

Purpose: Correct out-of-order version labels for Worksheet Builder, Export
Overhaul, and UI Animations + Onboarding while preserving implementation
order. Add explicit rules that version numbers must follow implementation
order, not planned order.

Validation:
- Date: 2026-05-23
- Scope: version ordering fix and ordering rule hardening
- Files: docs/PHASE_LOG.md, docs/VERSIONING.md, CLAUDE.md, docs/WORKFLOW.md
- All 10 grep checks passed

## Patch 3.5.3 Ã¢â‚¬â€ 1-by-1 Commit Rule Hardening

Status: stable

Version: 3.5.3-stable

Date: 2026-05-23

Scope: docs hardening Ã¢â‚¬â€ 1-by-1 commit rule made explicit

Files:
- CLAUDE.md
- docs/WORKFLOW.md

Purpose: Clarify that every implementation commit block and every
stable-promotion commit block must use exactly one git add and one git commit
per file, with no exceptions and no grouped commits.

Validation:
- Date: 2026-05-23
- Scope: docs hardening Ã¢â‚¬â€ 1-by-1 commit rule made explicit
- Files: CLAUDE.md, docs/WORKFLOW.md
- All 5 grep checks passed

## Patch 3.5.2 Ã¢â‚¬â€ Post-Stable Bug Versioning Rule

Status: stable

Version: 3.5.2-stable

Date: 2026-05-23

Scope: docs hardening Ã¢â‚¬â€ post-stable bug versioning rule

Files:
- CLAUDE.md
- docs/WORKFLOW.md
- docs/VERSIONING.md

Purpose: Encode that bugs discovered after a stable release always open a
new Z+1 patch version and are never fixed in place.

Validation:
- Date: 2026-05-23
- Scope: docs hardening Ã¢â‚¬â€ post-stable bug versioning rule
- Files: CLAUDE.md, docs/WORKFLOW.md, docs/VERSIONING.md
- All 6 grep checks passed

## Patch 3.5.1 Ã¢â‚¬â€ Generate Worksheet Crash Fix

Status: stable

Version: 3.5.1-stable

Date: 2026-05-23

Scope: Generate Worksheet crash fix

Bugs fixed:
- Missing template field in POST body
- No res.ok guard causing undefined draft crash

Validation:
- Date: 2026-05-23
- Scope: Generate Worksheet crash fix
- Files: src/components/review/ReviewFlow.tsx
- Build clean
- TypeScript zero errors


## Patch 3.5.0 Ã¢â‚¬â€ Daily Review Fix

Status: stable

Version: 3.5.0-stable

Date: 2026-05-23

Purpose: Direction pre-populated from today's Planner data. Generate Worksheet
and Generate Caption buttons added. Template gate replaced with visual card
selector.

Validation:
- Date: 2026-05-23
- Scope: Daily Review Fix
- Files: src/app/review/page.tsx, src/components/review/ReviewFlow.tsx
- Build clean
- TypeScript zero errors


## Phase 3.4.0 Ã¢â‚¬â€ UI Animations + Onboarding

Status: stable

Version: 3.4.0-stable

Date: 2026-05-23

Purpose: 4-step onboarding overlay (first-run + re-openable via Help button
in sidebar). Framer Motion page transitions and sidebar nav
micro-interactions.

Validation:
- PageTransition.tsx Ã¢â‚¬â€ Framer Motion enter animation (fade + slide up)
  keyed by pathname, no AnimatePresence at root level
- OnboardingOverlay.tsx Ã¢â‚¬â€ 4-step modal, first-run auto-open via
  localStorage, re-openable via hfk:open-help custom event,
  AnimatePresence on step content and modal itself
- Root layout wired with PageTransition wrapping children and
  OnboardingOverlay mounted as sibling
- SidebarNav Ã¢â‚¬â€ Help button dispatches hfk:open-help, nav items
  have whileHover and whileTap micro-interactions via Framer Motion
- next.config.mjs Ã¢â‚¬â€ transpilePackages added for framer-motion to
  fix static prerendering of /404 and /500 error pages
- All checks passed, build clean, 21/21 pages

## Patch 3.3.1 Ã¢â‚¬â€ Export Overhaul

Status: stable

Version: 3.3.1-stable

Date: 2026-05-23

Purpose: Removed PDF export. PNG export now client-side via html-to-image
targeting the .worksheet element at 2x. Save As dialog via
showSaveFilePicker with download fallback. No more server-side archiving on
export.

Validation:
- PDF export button removed from PreviewControls
- PNG export replaced with client-side handleSaveImage using html-to-image
- Targets .worksheet DOM element at pixelRatio 2 Ã¢â‚¬â€ no padding artifact
- showSaveFilePicker Save As dialog with AbortError guard
- createObjectURL download fallback for Safari and Firefox
- All 10 checks passed, build clean, 21/21 pages

## Phase 3.3.0 Ã¢â‚¬â€ Worksheet Builder

Status: stable

Version: 3.3.0-stable

Date: 2026-05-23

Purpose: Block-based worksheet builder. /worksheets route, drag-to-reorder sections, live preview, form editor, delete, AI regeneration modal.

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

## Phase 3.2.0 Ã¢â‚¬â€ Analytics + Recommendations

Status: stable

Version: 3.2.0-stable

Date: 2026-05-22

Purpose: Analytics screen with AI-narrated demo summary, top and worst post
lists, subject-grade performance heatmap, and localStorage-backed
dismissible recommendations.

Validation:
- analytics.types.ts Ã¢â‚¬â€ PerformanceStat, HeatmapCell, RecommendationCard,
  AnalyticsSnapshot interfaces
- analytics.mock.ts Ã¢â‚¬â€ getMockSnapshot() returns demo snapshot with isDemo: true,
  AI summary, 5 top posts, 5 worst posts, 36-cell heatmap, 4 recommendation cards
- /analytics server page Ã¢â‚¬â€ calls getMockSnapshot, passes to AnalyticsDashboard
- AnalyticsDashboard client component Ã¢â‚¬â€ AI summary card with Demo Data pill,
  top/worst post columns, subjectÃƒÆ’Ã†â€™Ã¯Â¿Â½grade heatmap, dismissible recommendation cards
  persisted to localStorage
- Analytics nav link + bar chart icon added to SidebarNav
- All 17 checks passed, build clean, 19/19 static pages

## Phase 3.1.0 Ã¢â‚¬â€ Vault Browser

Status: stable

Version: 3.1.0-stable

Date: 2026-05-22

Purpose: Standing Vault asset library at /vault. Browse, inspect, and
mutate lifecycle state of all indexed Vault assets.

Validation:
- /vault page created Ã¢â‚¬â€ server component with ChromaDB asset fetch and offline fallback
- VaultBrowser client component Ã¢â‚¬â€ type filter tabs, name/tag search, asset cards with freshness/lifecycle/usage, lifecycle mutation buttons
- POST /api/vault/asset/[id]/lifecycle route Ã¢â‚¬â€ reads asset, updates lifecycle field, re-ingests via upsert
- Vault nav link added to SidebarNav
- All 15 checks passed, build clean

## Phase 3.0.0 Ã¢â‚¬â€ Calendar Intelligence

Status: stable

Version: 3.0.0-stable

Date: 2026-05-22

Purpose: Bi-directional planner calendar Ã¢â‚¬â€ past cells show package shipping
status, future cells show plan + in-review state, day detail panel shows
gate-by-gate package summary.

Validation:
- calendar.ts created with getPackagesForMonth read-only helper
- approval.store.ts not modified
- Planner page loads packages server-side and passes to PlannerView
- PlannerView renders past cells with Shipped/In Review/no-package states
- isPastDate and getPackageSummary helpers added
- Day detail panel shows gate-by-gate package status when package exists
- Calendar legend added for shipped/in-review/duplicate-risk/today states
- No other lib or template files modified
- npm run build passes clean

## Phase 2.9.0 Ã¢â‚¬â€ UI Design System

Status: stable

Version: 2.9.0-stable

Date: 2026-05-22

Purpose: Applied the HFK design language across the app shell and all
existing screens. Sidebar navigation, Google Fonts, design token extension,
card-based components.

Validation:
- SidebarNav.tsx created and wired in layout.tsx
- Fonts loaded via next/font/google (Inter, Instrument Serif, JetBrains Mono)
- All new design tokens present in tailwind.config.ts
- Old tokens (warm-brown, sage-green) preserved for backward compat
- TodayStatus renders as dark ink banner card
- font-display applied on home, review, and planner pages
- No lib or template files modified
- npm run build passes clean

## Phase 2.7.0 Ã¢â‚¬â€ Daily Package Review

Status: stable

Version: 2.7.0-stable

Date: 2026-05-22

Purpose:
Built the Daily Package Review screen at /review. ReviewFlow handles all 5
gate interactions: inline direction form, worksheet/caption draft display with
provenance panel, template selector, reject inline form, and redirect modal.
All actions call existing approval API routes and trigger router.refresh().

Files changed:
- src/app/review/page.tsx (created) Ã¢â‚¬â€ Server Component, loads today's package
- src/components/review/ReviewFlow.tsx (created) Ã¢â‚¬â€ interactive gate approval flow
- src/components/review/RedirectModal.tsx (created) Ã¢â‚¬â€ redirect note modal
- src/components/command/TodayStatus.tsx (modified) Ã¢â‚¬â€ Review link added

Validation:
- /review screen is live.
- ReviewFlow handles all 5 gate interactions.
- Direction approval uses inline form.
- Worksheet and caption drafts display with provenance panels.
- Template selector, reject form, and redirect modal are live.
- Gate actions call existing API routes and refresh package state.
- Review link appears in TodayStatus on the home screen.

## Phase 2.6.0 Ã¢â‚¬â€ AI Command Center

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
- src/app/page.tsx (modified) Ã¢â‚¬â€ async, imports command components

Validation:
- Home page loads 200.
- TypeScript compiles clean.
- TodayStatus renders the 5-gate approval grid.
- MonthProgress renders the plan progress bar and today's topic.
- VaultAlerts renders duplicate risk topics, asset count, and offline fallback.
- Existing worksheet list remains available below the Command Center.

## Phase 2.5.0 Ã¢â‚¬â€ Prompt Library API

Status: stable

Version: 2.5.0-stable

Date: 2026-05-22

Purpose:
Built the Prompt Library API. GET /api/prompts lists all VaultPrompt assets
using collection.get() through getAssetsByType(). POST /api/prompts/assemble
returns a brand-voice-enriched, ready-to-run prompt with placeholder
interpolation for topic, grade, subject, and objective.

Files changed:
- src/lib/prompt.types.ts (created) Ã¢â‚¬â€ PromptAssemblyRequest, AssembledPrompt
- src/lib/prompt.assemble.ts (created) Ã¢â‚¬â€ listPrompts(), assemblePrompt()
- src/lib/vault.query.ts (modified) Ã¢â‚¬â€ added getAssetsByType()
- src/app/api/prompts/route.ts (created) Ã¢â‚¬â€ GET prompt list
- src/app/api/prompts/assemble/route.ts (created) Ã¢â‚¬â€ POST prompt assembly
- vault/prompts/canva-worksheet.md (created) Ã¢â‚¬â€ sample Canva worksheet prompt

Validation:
- GET /api/prompts lists VaultPrompt assets via collection.get().
- POST /api/prompts/assemble returns ready-to-run external prompts.
- Brand voice enrichment and placeholder interpolation are live.
- Missing prompt context returns 404.
- listPrompts was refactored from semantic search to collection.get() for
  reliable flat listing.

## Phase 2.4.0 Ã¢â‚¬â€ Planning Engine

Status: stable

Version: 2.4.0-stable

Date: 2026-05-22

Purpose:
Built the monthly planning engine. DeepSeek + Vault RAG generates full-month
content proposals with subject/grade rotation, duplicate-topic detection, and
per-day confidence scoring. Plans persist to data/plans/YYYY-MM.json.

Files changed:
- src/lib/planning.types.ts (created) Ã¢â‚¬â€ PlanDay, MonthlyPlan, PlanRequest, PlanResponse
- src/lib/planning.store.ts (created) Ã¢â‚¬â€ filesystem read/write for data/plans/
- src/lib/planning.rag.ts (created) Ã¢â‚¬â€ RAG context for brand rules, recent worksheets, topics
- src/lib/planning.generate.ts (created) Ã¢â‚¬â€ DeepSeek plan generation with 4000 token budget
- src/app/api/planning/generate/route.ts (created) Ã¢â‚¬â€ POST generate monthly plan
- src/app/api/planning/[month]/route.ts (created) Ã¢â‚¬â€ GET plan by month
- .gitignore (modified) Ã¢â‚¬â€ data/plans/ excluded

Validation:
- Full 31-day content plan generation validated.
- Subject/grade rotation is live.
- Duplicate-topic detection is live.
- Per-day confidence scoring is live.
- Plans persist to data/plans/YYYY-MM.json.

Known issue:
- DeepSeek returns lowercase subjects and numeric grades. This is a data
  quality issue to be addressed in a separate patch.

## Phase 2.3.0 Ã¢â‚¬â€ Approval Gate API

Status: stable

Version: 2.3.0-stable

Date: 2026-05-22

Purpose:
Built the 5-gate approval state machine for daily content packages:
direction Ã¢â€ â€™ worksheet Ã¢â€ â€™ template Ã¢â€ â€™ caption Ã¢â€ â€™ final. Gate actions approve,
reject, and redirect package state persisted to data/packages/YYYY-MM-DD.json.
Vault write-back on worksheet and caption approval was confirmed.

Files changed:
- src/lib/approval.types.ts (created) Ã¢â‚¬â€ GateName, GateStatus, GateState, DailyPackage
- src/lib/approval.store.ts (created) Ã¢â‚¬â€ filesystem read/write for data/packages/
- src/lib/approval.actions.ts (created) Ã¢â‚¬â€ approveGate, rejectGate, redirectGate with Vault write-back
- src/app/api/approval/package/route.ts (created) Ã¢â‚¬â€ GET today's package
- src/app/api/approval/gate/[gate]/approve/route.ts (created)
- src/app/api/approval/gate/[gate]/reject/route.ts (created)
- src/app/api/approval/gate/[gate]/redirect/route.ts (created)
- .gitignore (modified) Ã¢â‚¬â€ data/packages/ excluded

Validation:
- 5-gate approval flow is live.
- Approve, reject, and redirect actions persist correctly.
- Package state writes to data/packages/YYYY-MM-DD.json.
- Vault write-back confirmed for worksheet and caption approvals.

## Phase 2.2.0 Ã¢â‚¬â€ DeepSeek Integration

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
- src/lib/ai.types.ts (created) Ã¢â‚¬â€ AI request/response types with VaultProvenance
- src/lib/deepseek.ts (created) Ã¢â‚¬â€ DeepSeek client, model deepseek-chat, JSON mode
- src/lib/vault.rag.ts (created) Ã¢â‚¬â€ RAG retrieval for worksheet and caption contexts
- src/app/api/ai/draft/worksheet/route.ts (created) Ã¢â‚¬â€ POST /api/ai/draft/worksheet
- src/app/api/ai/draft/caption/route.ts (created) Ã¢â‚¬â€ POST /api/ai/draft/caption
- src/app/api/ai/summary/route.ts (created) Ã¢â‚¬â€ POST /api/ai/summary
- next.config.mjs (modified) Ã¢â‚¬â€ added openai to serverComponentsExternalPackages

Validation:
- TypeScript compiles clean.
- Worksheet draft endpoint works correctly.
- Caption draft endpoint works correctly.
- Daily summary endpoint works correctly.
- RAG pipeline retrieves Vault context and passes it to DeepSeek for grounded generation.
- All 8 TypeScript errors in vault.rag.ts resolved via flatMap type narrowing.

## Phase 2.1.0 Ã¢â‚¬â€ ChromaDB Layer

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

## Phase 2.0.0 Ã¢â‚¬â€ Vault Schema

Status: stable

Version: 2.0.0-stable

Date: 2026-05-22

Purpose:
Introduced the Vault type system for v2. Defined TypeScript interfaces
and Zod schemas for all seven Vault asset types (template, worksheet,
caption, prompt, topic, avatar, brand-rule). Established lifecycle
states (draft Ã¢â€ â€™ approved Ã¢â€ â€™ archived Ã¢â€ â€™ retired), freshness model
(fresh / healthy / stale_ish / stale / retired), reuse score (0.0Ã¢â‚¬â€œ1.0),
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

## Patch 1.5.2 Ã¢â‚¬â€ v2 Phase Planning

Status: stable

Version: 1.5.2-stable

Date: 2026-05-22

Purpose:
Documentation-only patch. Replaced the old planned phase queue
(2.0.0Ã¢â‚¬â€œ2.3.0) with the full v2 phase sequence (2.0.0Ã¢â‚¬â€œ3.1.0).
Documented ChromaDB (local vector DB) and DeepSeek API as the v2
backend stack. Established that non-text assets are represented
in ChromaDB by metadata only. Confirmed backend-first build order.

Files changed:
- docs/FUTURE_PLANS.md
- docs/AI_HANDOFF.md
- docs/VERSIONING.md
- README.md

## Patch 1.5.1 Ã¢â‚¬â€ Validation Hardening

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

### Patch Notes Ã¢â‚¬â€ 1.5.1-alpha
- Section 2 validation guidance now requires Test-Path -LiteralPath
  for paths containing bracket characters.
- Section 2 validation guidance now requires Select-String -LiteralPath
  for paths containing bracket characters.
- The rule documents the PowerShell wildcard behavior that caused a
  false negative for src/app/edit/[id]/page.tsx.

### Validation Record Ã¢â‚¬â€ 1.5.1-stable

- Date: 2026-05-21
- CLAUDE.md has -LiteralPath rule: PASS
- WORKFLOW.md has -LiteralPath rule: PASS
- All 4 versioning locations show 1.5.1-alpha: PASS
- Promoted to stable: 2026-05-21

## Phase 1.5.0 Ã¢â‚¬â€ Save + Archive

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

### Patch Notes Ã¢â‚¬â€ 1.5.0-alpha
- archiveExport() moves exported PDF/PNG files from exports/ to archives/YYYY-MM-DD/
- saveWorksheet() validates worksheet JSON with the existing Zod schema and writes to content/worksheets/
- /api/save accepts worksheet JSON and returns the saved worksheet id
- /api/export now returns archivePath after moving generated files into archives/
- /edit/new provides a prefilled blank worksheet JSON editor
- /edit/[id] loads an existing worksheet into the shared JSON editor
- Dashboard includes New Worksheet and per-card Edit links

### Validation Record Ã¢â‚¬â€ 1.5.0-stable

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

## Patch 1.4.1 Ã¢â‚¬â€ Workflow Hardening

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

### Patch Notes Ã¢â‚¬â€ 1.4.1-alpha
- Section 2 validation commands are now explicitly USER-run PowerShell
  commands; Claude Code receives pasted results and reports pass/fail.
- Codex master prompts must not instruct Codex to run npm commands;
  npm commands belong in Section 2 as USER-run validation steps.
- The git push block must appear in the same message as the
  stable-promotion commit block; no separate reminder turn.

### Validation Record Ã¢â‚¬â€ 1.4.1-stable

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

## Phase 1.4.0 Ã¢â‚¬â€ Export System

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

### Patch Notes Ã¢â‚¬â€ 1.4.0-alpha
- exportToPDF() renders /preview/[id] with print media and writes A4 PDFs
- exportToPNG() renders /preview/[id] at A4 viewport size and writes PNG screenshots
- /api/export accepts POST requests for pdf or png export formats
- Preview toolbar now includes Export PDF and Export PNG buttons
- Export controls are hidden from print/export output via no-print
- Export requires the local Next.js app to be running on localhost:3000

### Validation Record Ã¢â‚¬â€ 1.4.0-stable

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

## Phase 1.3.0 Ã¢â‚¬â€ Preview System

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

### Patch Notes Ã¢â‚¬â€ 1.3.0-alpha
- /preview/[id] renders any worksheet by its JSON id field
- notFound() called for unknown IDs
- PreviewControls toolbar hidden on print via no-print class
- Print button triggers window.print()
- getWorksheetById now scans by id field, not by filename
- Dashboard Preview links were already in place from Phase 1.0.0

### Validation Record Ã¢â‚¬â€ 1.3.0-stable

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

## Phase 1.2.0 Ã¢â‚¬â€ cozy_v1 Worksheet Template

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
- docs/TEMPLATE_GUIDE.md (cozy_v1 status Ã¢â€ â€™ active)

### Patch Notes Ã¢â‚¬â€ 1.2.0-alpha
- WorksheetTemplate renders all 5 activity types distinctly
- Avatar placeholder renders when no asset is present
- Vocabulary, activities, parent notes sections are conditional
- Print CSS hides app shell and preserves worksheet layout
- US Letter page dimensions used (816x1056px at 96dpi)

### Validation Record Ã¢â‚¬â€ 1.2.0-stable

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

## Phase 1.1.0 Ã¢â‚¬â€ JSON Content Schema

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

### Patch Notes Ã¢â‚¬â€ 1.1.0-alpha
- WorksheetSchema defined with Zod, aligned with WorksheetContent type
- validateWorksheet() and isValidWorksheet() helpers exported
- 3 sample worksheets cover math, science, and reading subjects
- Schema validation rules documented in CONTENT_PHILOSOPHY.md

### Validation Record Ã¢â‚¬â€ 1.1.0-stable

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

## Patch 1.0.5 Ã¢â‚¬â€ Workflow Hardening: Remove Section 2

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

### Patch Notes Ã¢â‚¬â€ 1.0.5-alpha
- Section 2 removed from all Codex prompt output
- Upfront clarification step added to Bug Found and New Phase rules
- CLARIFY step added to Standard Phase Cycle in WORKFLOW.md
- "When To Use The 3-Section Format" renamed to 2-section format
- Claude Code must now confirm "no questions needed" before writing
  any prompt

### Validation Record Ã¢â‚¬â€ 1.0.5-stable

- Date: 2026-05-21
- "What You Need From Me" gone from CLAUDE.md: PASS
- Upfront clarification rule present in CLAUDE.md: PASS
- CLARIFY step present in WORKFLOW.md: PASS
- "3-Section Format" gone from WORKFLOW.md: PASS
- All 4 versioning locations show 1.0.5-alpha: PASS
- Promoted to stable: 2026-05-21

## Patch 1.0.4 Ã¢â‚¬â€ Vault Restructure

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

### Patch Notes Ã¢â‚¬â€ 1.0.4-alpha
- vault/ established as creative input layer (Layer 1)
- Next.js engine remains output layer (Layer 2)
- Repository root is now clean Ã¢â‚¬â€ no numbered legacy folders
- Two-layer architecture documented in ADR-007
- master_prompt.md intentionally left at repo root

### Validation Record Ã¢â‚¬â€ 1.0.4-stable

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

## Patch 1.0.3 Ã¢â‚¬â€ Workflow Hardening

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

### Patch Notes Ã¢â‚¬â€ 1.0.3-alpha
- Stable-promotion commit block now required inline in same message
  as the stable-promotion Codex prompt Ã¢â‚¬â€ no AI turn permitted between
- WORKFLOW.md Mandatory Workflow Artifact Enforcement updated
- WORKFLOW.md Post-Validation Two-Section Response clarified
- CLAUDE.md After Validation Passes section rewritten

### Validation Record Ã¢â‚¬â€ 1.0.3-stable

- Date: 2026-05-21
- WORKFLOW.md contains inline structure requirement: PASS
- CLAUDE.md contains inline structure requirement: PASS
- All four versioning locations show 1.0.3-alpha: PASS
- Promoted to stable: 2026-05-21

## Patch 1.0.2 Ã¢â‚¬â€ next.config.ts Ã¢â€ â€™ next.config.mjs

Status: stable

Version: 1.0.2-alpha

Date: 2026-05-21

Purpose:
Fix dev server crash. Next.js 14.2.3 does not support next.config.ts.
Replace with next.config.mjs using JSDoc typing.

Files changed:
- next.config.mjs (created)
- next.config.ts (deleted)

### Patch Notes Ã¢â‚¬â€ 1.0.2-alpha
- Replaced next.config.ts with next.config.mjs
- JSDoc @type annotation preserves type safety without TypeScript import

### Validation Record Ã¢â‚¬â€ 1.0.2-stable

- Date: 2026-05-21
- next.config.ts deleted: PASS
- next.config.mjs exists with correct content: PASS
- npm run dev starts cleanly on Next.js 14.2.3: PASS
- Promoted to stable: 2026-05-21

## Patch 1.0.1 Ã¢â‚¬â€ Docs Hardening

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

### Patch Notes Ã¢â‚¬â€ 1.0.1-alpha

- Canonical session opener created
- Session checkpoint format and process documented in WORKFLOW.md
- AI_HANDOFF.md updated with vault restructure scope and pending next step
- Two-layer architecture decision captured in AI_HANDOFF.md future queue

### Validation Record Ã¢â‚¬â€ 1.0.1-stable

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

### Patch Notes Ã¢â‚¬â€ 1.0.0-alpha

- Initial project bootstrap
- Docs-first workflow established
- Next.js 14 App Router configured
- TypeScript content types defined
- Filesystem content loader scaffolded
- Dashboard shell created

### Validation Record Ã¢â‚¬â€ 1.0.0-stable

- Date: 2026-05-21
- All docs present: PASS
- All Next.js config files present: PASS
- All source files present: PASS
- Folder structure present: PASS
- All four versioning locations show 1.0.0-alpha: PASS
- TypeScript type-check: PASS
- npm install: PASS
- Promoted to stable: 2026-05-21






