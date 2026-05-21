# Architecture Decision Records

## ADR-001: Filesystem-First Architecture

Date: 2026-05-21
Status: ACCEPTED

Decision:
Use the local filesystem as the primary data layer. JSON files in
content/ are the source of truth. No database (Prisma, PostgreSQL,
SQLite, etc.) at MVP.

Rationale:
- Single-operator tool with no concurrent writes
- Version control (git) is free with filesystem
- No migration scripts, no schema versioning
- Simpler operational model
- Consistent with docs-first philosophy

Consequences:
- Content/ must be treated as protected source of truth
- File naming conventions must be established and followed
- Large-scale search will need a future indexing layer if content grows

---

## ADR-002: Next.js App Router as Publishing Studio

Date: 2026-05-21
Status: ACCEPTED

Decision:
Use Next.js 14 App Router as the application framework for the internal
publishing studio UI, preview system, and export API routes.

Rationale:
- Familiar stack for React/TypeScript development
- App Router enables server components for filesystem reads
- API routes support Puppeteer export without a separate server
- Single codebase for UI and export backend

Consequences:
- Keep as internal tool — not a public deployment
- Do not add auth, middleware, or public-facing routes

---

## ADR-003: JSON as Content Representation

Date: 2026-05-21
Status: ACCEPTED

Decision:
All content is stored as structured JSON files. JSON describes what the
content is. Templates describe how it looks. These concerns must never mix.

JSON contains: title, grade, subject, vocabulary, activities, notes,
footer text, references, metadata.

JSON does NOT contain: styling, layout, typography, spacing, colors.

Rationale:
- Separates content authorship from visual design
- Same JSON renders identically every time (determinism)
- AI can generate/edit JSON without touching template code
- Templates can be redesigned without touching content

---

## ADR-004: Template Stability Policy

Date: 2026-05-21
Status: ACCEPTED

Decision:
Templates are stable visual systems. Template changes are deliberate,
documented, and versioned. AI must never casually modify templates.

New template variants get new names (cozy_v2, science_v1, etc.).
Existing templates are not modified once validated and in use.

Rationale:
- Prevents style drift across the content archive
- Ensures historical exports remain reproducible
- Protects operator trust in consistent output

---

## ADR-005: Puppeteer for PDF/PNG Export

Date: 2026-05-21
Status: ACCEPTED (deferred to Phase 1.4.0)

Decision:
Use Puppeteer to render the Next.js preview route to PDF and PNG.
Export is triggered via an API route.

Rationale:
- Puppeteer renders the actual React template with real CSS
- No separate rendering pipeline needed
- Consistent output between preview and export
- Avoids jsPDF or canvas-based approaches that don't respect CSS

Consequences:
- Puppeteer adds a heavyweight Node dependency
- Export requires the Next.js server to be running
- PNG export needs viewport sizing conventions

---

## ADR-006: Single Repository

Date: 2026-05-21
Status: ACCEPTED

Decision:
All implementation, documentation, templates, content, exports, and
archives live in a single repository.

Rationale:
- Repository is the continuity layer and operational memory
- Single place for AI agents to read and understand the full system
- Avoids cross-repo dependency management
- Content history and code history stay together

Consequences:
- exports/ and archives/ should be gitignored or selectively tracked
- content/ should be committed (it is the source of truth)
- Large binary assets (PNG exports) must not bloat git history
