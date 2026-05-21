# HFK Publishing Engine - Operational Workflow Reference

## Purpose

Defines the standard workflow for all AI agents and contributors.
Read at the start of every session before any planning or coding.

## Primary Workflow — Claude Code

Claude Code is the PLANNING, REVIEWING, and VALIDATION layer.
Codex is the IMPLEMENTATION layer.

Claude Code:
- Pulls master and reads key docs at session start
- Reports current state before any work begins
- Diagnoses bugs and writes Codex fix prompts
- Scopes new phases and writes Codex master prompts
- Runs validation commands directly via bash after Codex finishes
- Analyzes validation output and reports pass/fail per check
- Writes post-validation documentation Codex prompts
- Provides 1-by-1 git commit command blocks for the user to run
- Reminds the user to push after clean commits

Claude Code does NOT (default — without Implementation Gate unlock phrase):
- Implement code changes (writes Codex prompts instead)
- Commit or push (provides commands for the user to run)
- Create branches
- Access content/, exports/, archives/, assets/avatars/, or .env
- Run validation commands inside a Codex prompt

Even when the Implementation Gate unlock phrase is provided:
- Does NOT commit, push, or create branches
- Does NOT run validation commands

### Claude Code Fallback Implementor Mode

When Codex is unavailable, Claude Code can implement directly.
Requires the unlock phrase as the first line of the user's message:

  I AUTHORIZE CLAUDE CODE TO IMPLEMENT - [reason]

Without the phrase, Claude Code writes Codex prompts regardless of
the task instruction. With the phrase, Claude Code uses Edit/Write,
stops and summarizes, does not commit/push/run validation, and waits
for the user to paste validation results back.

## Standard Phase Cycle

PLAN    — Discuss scope. Agree on what will be built.
PROMPT  — Write Codex master prompt (3-section format).
BUILD   — User runs Codex. AI does not assist during this step.
VERIFY  — AI writes validation commands (separately from Codex prompt).
TEST    — User runs validation commands, pastes results back.
ANALYZE — AI reviews every check. Reports pass/fail per check.
FIX     — If failures: AI writes targeted fix prompt. Repeat from BUILD.
DOCUMENT — AI writes stable-promotion Codex prompt after all checks pass.
COMMIT  — User commits manually. AI never commits or pushes.

## Codex Prompt Standards

Every Codex prompt must include:

Read-first list (mandatory):
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- docs/DECISIONS.md
- docs/WORKFLOW.md
- Plus files directly relevant to the implementation

Git rules (mandatory):
- Do NOT commit, push, create branches, or run validation commands

Stop instruction (mandatory, always last):
- Stop after implementation and summarize: files changed, logic added
  per file, expected behavior, assumptions made

Documentation requirement (mandatory for every phase prompt):
- README.md, docs/PHASE_LOG.md, docs/AI_HANDOFF.md, docs/VERSIONING.md

## When To Use The 3-Section Format

USE for: new phases, bug fixes, any task where Codex writes/modifies code.

DO NOT USE for: post-validation docs prompts, session checkpoints,
documentation-only tasks. These get a single plain txt code block.

## Mandatory Workflow Artifact Enforcement

For implementation phases:
1. Validation summary
2. Implementation commit block (BEFORE stable-promotion prompt)
3. Stable-promotion Codex prompt
4. Stable-promotion commit block (IMMEDIATELY after the Codex prompt,
   in the same message — no AI turn between them)
5. Push reminder

For stable-promotion docs-only prompts:
1. Stable-promotion Codex prompt
2. Two-section response (confirmation + 1-by-1 commit block)
3. Push reminder
(No validation commands required for docs-only promotion.)

## After Codex Finishes Implementation

If all pass:
1. Validation summary
2. Implementation commit block
3. Stable-promotion Codex prompt

The stable-promotion prompt and stable-promotion commit block MUST
travel together in the same message, with the commit block appearing
immediately below the Codex prompt block. No additional AI turn is
required or permitted between them.

## Post-Validation Two-Section Response

This two-section block must appear immediately below the
stable-promotion Codex prompt in the same message.

SECTION 1: Stable-Promotion Confirmation
- Summarize what passed
- Identify files changed
- Identify remaining future work

SECTION 2: 1-by-1 Git Commit Commands
```powershell
git add docs/VERSIONING.md
git commit -m "docs: promote X.Y.Z to stable"
...
git status --short
```

## Safety Rules That Never Change

- Do NOT write to content/ without explicit YES confirmation
- Do NOT bypass human review before content publication
- Do NOT modify templates casually — changes must be deliberate + documented
- Do NOT regenerate avatars — use stored assets or placeholders only
- Do NOT commit, push, or create branches
- Do NOT run validation commands inside Codex prompts
- ALWAYS preserve: content/ as source of truth
- ALWAYS preserve: exports/ and archives/ as derived/historical data
- ALWAYS preserve: same JSON + same template = same output

## Session Checkpoint

When closing a session or pausing mid-phase, follow this process.

### Step 1 — AI writes a session checkpoint Codex prompt

The prompt is a single plain txt code block (no 3-section format).
It must create or update these files:
- docs/SESSION_LOG/YYYY-MM-DD-session-NN.md (CREATE)
- docs/AI_HANDOFF.md (UPDATE current state and next step if changed)

The session log must use this exact format:

# Session Log — YYYY-MM-DD Session NN

## What Was Done This Session
[bullet list of completed work]

## What Is In Progress
[in-progress items, or "Nothing."]

## Current Version State
[version — phase — state — commit status]

## Open Decisions
[open decisions, or "None."]

## Known Issues
[non-blocking issues, or "None blocking."]

## Uncommitted Work
[files pending commit, or "None. Working tree is clean."]

## Next Recommended Action
[what to do at the start of the next session]

## New Chathead Opener
See docs/NEW_CHATHEAD_OPENER.md for the current opener text.

The session log MUST reference docs/NEW_CHATHEAD_OPENER.md.
It must NOT embed the opener text inline.

### Step 2 — User runs the checkpoint prompt through Codex and commits

### Step 3 — New session opens with the standard opener

Copy the opener from docs/NEW_CHATHEAD_OPENER.md.
Claude Code pulls master, reads required docs, reports state.
No other context from the prior session is needed.
