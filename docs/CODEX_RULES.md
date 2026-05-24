# HFK Publishing Engine — Codex Standing Rules

Every Codex session follows these rules without exception.
Reference this file in prompts instead of repeating these rules inline.

## Never do

- Commit, push, or create branches
- Run git, npm, or validation commands
- Modify protected paths: content/ exports/ archives/ assets/avatars/ .env
- Modify vault/ except reading from vault/templates/
- Generate a summary after completing implementation — stop when done

## Always do

- Read all files listed in the prompt's READ FIRST section before writing any code
- Read STATE.json, then codebase-graph.json, before selecting source files when the task touches app code
- Read graphify-out/GRAPH_REPORT.md for orientation-heavy app-code work before opening source files
- Wrap all ChromaDB and external service calls in try/catch (graceful degradation when offline)
- Use 'use client' only when the component uses React hooks or browser APIs
- Use inline styles (not Tailwind classes) for values driven by dynamic or user data

## Version bump protocol

When a prompt says to bump the version, update ALL FIVE locations:
1. docs/VERSIONING.md — Current Version table + new row in history table
2. docs/AI_HANDOFF.md — current version line + current phase description
3. docs/PHASE_LOG.md — top history table row + new phase section
4. README.md — current version badge or line
5. STATE.json — version, state, phase.current, phase.name, phase.status, lastUpdated

New version state is always -alpha. Never write -stable — promotion is handled by scripts/promote.ps1.

## Commit rules (reference — user runs these, Codex does not)

- One git add + one git commit per file, no exceptions
- No grouping multiple files in one commit
- No --amend
- No Co-Authored-By trailers
