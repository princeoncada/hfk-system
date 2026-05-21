# Template Guide

## Core Principle

Templates are stable visual systems. Template changes are deliberate
and documented. AI must never casually modify a template.

## Template Registry

| Name | Status | Description |
|---|---|---|
| cozy_v1 | planned (Phase 1.2.0) | Warm, cozy worksheet for all subjects |

## Template Naming Convention

[aesthetic]_v[version]

Examples: cozy_v1, cozy_v2, science_v1, storybook_v1, montessori_v1

A new variant gets a new name. Existing templates are not modified
once validated and in production use.

## cozy_v1 Specification

Target feeling: warm, hand-crafted, child-loved printable worksheet.

Layout (portrait, A4 / Letter):
- Header: HFK logo/avatar placeholder, worksheet title, grade badge,
  subject badge
- Body: vocabulary section (if present), activity section, parent notes
  (if present)
- Footer: footer text, page attribution

Typography:
- Heading: friendly rounded sans-serif
- Body: clean readable sans or serif
- Print-safe at 12–14pt

Colors:
- Warm cream background
- Soft yellow and sage green accents
- Warm brown borders
- No harsh colors

Decorations:
- Subtle doodle borders or corner elements
- Simple icon accents per subject (optional)
- No heavy imagery

Print requirements:
- Renders correctly at A4 and US Letter
- No background colors that waste ink (use light tints only)
- Clear section boundaries

## Template Change Policy

1. Templates in production use are immutable.
2. Changes require a new version name (cozy_v1 → cozy_v2).
3. Every new template must have a spec entry in this file before
   implementation begins.
4. Template changes must be documented in docs/PHASE_LOG.md.
5. AI must not modify template files without an explicit phase prompt.

## Template File Structure

src/components/templates/[name]/
  WorksheetTemplate.tsx   — main template component
  index.ts                — named exports
  README.md               — template spec summary (optional)
