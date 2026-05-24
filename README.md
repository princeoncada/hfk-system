# HFK Publishing Engine

Internal content publishing studio for **Homeschooling for Kiddos (HFK)**,
a Facebook educational page serving homeschool families and parents of
Grades 1Ã¢â‚¬â€œ6 learners.

## Version Status

| Field | Value |
| --- | --- |
| Current | 3.8.0-stable |
| Status | stable |
| Current phase | Phase 3.8.0 — Direction overhaul: grade/subject locked from planner, topic read-only with AI regenerate, objective editable, direction approval syncs topic/objective back to planner. |

Full planned roadmap complete as of 3.3.0-stable.


## What This Is

A local-first publishing studio that generates printable worksheets,
Facebook image posts, PDF learning materials, and educational captions
from structured JSON content files and stable React templates.

## What This Is Not

- Not a SaaS
- Not a CMS product
- Not a public website
- Not an AI agent platform

## Architecture

```
content/ (JSON source of truth)
Ã¢â€ â€™ React Template (cozy_v1, etc.)
Ã¢â€ â€™ Live Preview (Next.js)
Ã¢â€ â€™ PDF Export / PNG Export (Puppeteer)
Ã¢â€ â€™ Archives
```

Same JSON + same template = same output, every time.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see the dashboard.

## Key Docs

| Doc | Purpose |
| --- | --- |
| docs/BRAND_GUIDE.md | Visual identity and tone |
| docs/CONTENT_PHILOSOPHY.md | JSON schema and ownership rules |
| docs/TEMPLATE_GUIDE.md | Template spec and change policy |
| docs/PAGE_CONSTITUTION.md | HFK mission and content pillars |
| docs/DECISIONS.md | Architecture decision records |
| docs/WORKFLOW.md | AI and human contribution workflow |
| docs/FUTURE_PLANS.md | Living backlog and planned phases |
| docs/PHASE_LOG.md | Full version and validation history |




