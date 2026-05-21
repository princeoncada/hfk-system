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
  New bug found. Create new patch version.

## Four Versioning Locations

Every version change must be applied to all four simultaneously:
1. docs/VERSIONING.md (this file)
2. docs/AI_HANDOFF.md
3. docs/PHASE_LOG.md
4. README.md

## Current Version

| Field | Value |
| --- | --- |
| Version | 1.2.0-alpha |
| Phase | Phase 1.2.0 |
| State | alpha |
| Date | 2026-05-21 |
| Summary | cozy_v1 worksheet template + print CSS |

## Complete Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 1.2.0-alpha | Phase 1.2.0 | alpha | 2026-05-21 | cozy_v1 worksheet template + print CSS |
| 1.1.0-stable | Phase 1.1.0 | stable | 2026-05-21 | JSON Content Schema — Zod validation + 3 sample worksheets |
| 1.0.5-stable | Patch 1.0.5 | stable | 2026-05-21 | Workflow hardening — remove Section 2, add upfront clarification step |
| 1.0.4-stable | Patch 1.0.4 | stable | 2026-05-21 | Vault restructure — consolidate numbered root folders into vault/ |
| 1.0.3-stable | Patch 1.0.3 | stable | 2026-05-21 | Workflow hardening — require stable-promotion prompt and commit block together |
| 1.0.2-stable | Patch 1.0.2 | stable | 2026-05-21 | Next.js config compatibility — replace next.config.ts with next.config.mjs |
| 1.0.1-stable | Patch 1.0.1 | stable | 2026-05-21 | Docs hardening — chathead opener + session checkpoint workflow |
| 1.0.0-stable | Phase 1.0.0 | stable | 2026-05-21 | Bootstrap — docs foundation + Next.js project scaffold |

## Next Phase

Current stable version: 1.1.0-stable
Current working version: 1.2.0-alpha
Next recommended phase: Phase 1.3.0 — Preview System
