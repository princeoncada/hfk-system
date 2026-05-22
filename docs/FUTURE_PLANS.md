# Future Plans

Living backlog for HFK Publishing Engine.
Completed items are struck through. Update this file every phase.

Last updated: 2026-05-22
Current stable version: 1.5.2-stable
Current working version: none

---

## Completed

- ~~Phase 1.0.0 — Bootstrap~~ (stable 2026-05-21)
- ~~Vault restructure (pre-1.1.0 housekeeping)~~ (committed 2026-05-21)
- ~~Phase 1.1.0 — JSON Content Schema~~ (stable 2026-05-21)
- ~~Phase 1.2.0 — cozy_v1 Worksheet Template~~ (stable 2026-05-21)
- ~~Phase 1.3.0 — Preview System~~ (stable 2026-05-21)
- ~~Phase 1.4.0 — Export System~~ (stable 2026-05-21)
- ~~Phase 1.5.0 — Save + Archive~~ (stable 2026-05-21)

---

## In Progress

(none)

---

## Planned — v2 Backend Phases (build and validate first)

### Phase 2.0.0 — Vault Schema

Define all Vault asset types: template, worksheet, caption, prompt, topic,
avatar, brand-rule. Establish metadata structure, lifecycle states
(draft → approved → archived → retired), freshness model, and reuse score
logic. JSON schemas locked. No UI. No database yet.

### Phase 2.1.0 — ChromaDB Layer

Set up local ChromaDB server. Build ingestion and embedding pipeline. Seed
from existing content/ and vault/ JSON files. Expose query API for semantic
retrieval. Non-text assets (images, templates) are represented by metadata
records only — the actual files are never embedded.

### Phase 2.2.0 — DeepSeek Integration

Connect DeepSeek API. Build the RAG pipeline: ChromaDB retrieve →
prompt assembly → DeepSeek generate. Deliver endpoints for: worksheet draft,
caption draft, daily summary, AI headline. All text generation runs through
DeepSeek. Visuals and template generation are out of scope.

### Phase 2.3.0 — Approval Gate API

Build the 5-gate state machine: Direction → Worksheet → Template →
Caption → Final Package. Write-back logic: approve writes to Vault and
triggers ChromaDB reindex; reject records a negative example in the Vault;
redirect re-prompts that gate only without resetting prior approved gates.

### Phase 2.4.0 — Planning Engine

Monthly plan generation via DeepSeek + Vault context. Subject/grade rotation,
duplicate-topic detection against prior 30 days, confidence scoring per day.

### Phase 2.5.0 — Prompt Library API

Vault-stored template generation prompts (for external tools: Canva, design
tools, image gen). Context assembly endpoint: topic + grade + brand voice →
ready-to-run external prompt. Mostly static; future analytics-driven
suggestions are a separate planned item, not in this phase.

---

## Planned — v2 UI Connection Phases (wire backend to frontend)

### Phase 2.6.0 — AI Command Center

Triage inbox home screen. Wire: today's AI-written headline, pending approvals
list ranked by urgency, Vault alerts (stale templates, duplicate risks),
monthly progress bar.

### Phase 2.7.0 — Daily Package Review

5-gate gated approval flow screen. Wire: live worksheet + FB asset preview,
provenance panel (which Vault items grounded each section), redirect overlay,
gate state persistence.

### Phase 2.8.0 — Monthly Planner

AI-proposed monthly content calendar. Wire: month/week/day approval altitudes,
lock/regen controls, AI rationale panel per day, day detail panel.

### Phase 2.9.0 — Calendar Intelligence

Bi-directional calendar. Wire: past cells (performance stats, reuse eligibility,
AI notes), future cells (planned content, approval state, duplicate risk),
hover popovers, drag-to-reuse interaction.

### Phase 3.0.0 — Vault Browser

Standing asset library UI. Wire: asset type filters, health/freshness indicators,
asset cards with usage + performance + lifecycle, promote/retire/resurrect gates,
semantic search via ⌘K.

### Phase 3.1.0 — Analytics + Recommendations

AI-narrated insight screen and recommendation card surface. Wire: AI summary
paragraph grounded in analytics history, top/worst post lists, best subject ×
grade heatmap, recommendation cards (headline + rationale + action + dismiss).
Build after sufficient usage data has accumulated; use mock data until then.

---

## Discarded / Won't Do

- Authentication and user management (single-operator tool, unnecessary)
- Database (Prisma, PostgreSQL) — filesystem-first is sufficient
- tRPC, TanStack Query — no server state management needed at MVP
- Cloud infrastructure — local-first is the architecture
- Automatic publishing — human review before any post goes live
- AI avatar generation — avatars are fixed assets only
- Relational database (Prisma, PostgreSQL) — filesystem-first for content JSON; ChromaDB is the local vector search layer and is not a relational DB replacement
