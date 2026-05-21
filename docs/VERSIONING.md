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
| Version | 1.0.0-stable |
| Phase | Phase 1.0.0 |
| State | stable |
| Date | 2026-05-21 |
| Summary | Bootstrap — docs foundation + Next.js project scaffold |

## Complete Version History

| Version | Phase | State | Date | Summary |
| --- | --- | --- | --- | --- |
| 1.0.0-stable | Phase 1.0.0 | stable | 2026-05-21 | Bootstrap — docs foundation + Next.js project scaffold |

## Next Phase

Current stable version: 1.0.0-stable
Current working version: none
Next recommended phase: Phase 1.1.0 - JSON Content Schema
