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
- Provides Section 2 validation commands as a PowerShell block for
  the user to run and paste back
- Analyzes validation output and reports pass/fail per check
- Provides .\scripts\promote.ps1 stable-promotion block and writes session checkpoint Codex prompts
- Provides 1-by-1 git commit command blocks for the user to run —
  one git add + one git commit per file, no exceptions, no grouping
- Provides the git push origin master PowerShell block in the same
  message as the stable-promotion commit block

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
CLARIFY — Ask all open questions before writing the Codex prompt.
           If none, confirm and proceed.
PROMPT  — Write Codex master prompt (2-section format).
BUILD   — User runs Codex. AI does not assist during this step.
VERIFY  — Section 2 PowerShell block is provided for the user to run.
TEST    — User runs Section 2 commands and pastes results back.
ANALYZE — AI reviews every check. Reports pass/fail per check.
FIX     — If failures: AI writes targeted fix prompt. Repeat from BUILD.
DOCUMENT — AI provides .\scripts\promote.ps1 stable-promotion block after all checks pass.
COMMIT  — User commits manually. AI never commits or pushes.

## Bug Fix Versioning Rule

Any bug discovered after a stable release always triggers a Z+1 patch.
Never modify a stable release in place.

The fix implementation prompt must:
1. Bump all five versioning files to X.Y.(Z+1)-alpha
2. Open the new patch in alpha state
3. Follow the standard stable-promotion cycle after validation passes

## Version Ordering Rule

Version numbers must always be monotonically increasing and reflect
the order phases were actually implemented, not the order they were
originally planned.

If a phase is built out of its planned sequence:
1. Discard the originally planned phase number
2. Assign the next available Y.Z version after the last stable release
3. All five versioning files must use the new number
4. The PHASE_LOG.md history table must remain in implementation order
   with the corrected version numbers

## Codex Prompt Standards

Every Codex prompt must include:

Read-first list (mandatory):
- STATE.json
- codebase-graph.json when the prompt touches app code or scripts
- graphify-out/GRAPH_REPORT.md for orientation-heavy app-code changes
- docs/VERSIONING.md
- docs/AI_HANDOFF.md
- docs/PHASE_LOG.md
- docs/DECISIONS.md
- docs/WORKFLOW.md
- Plus files directly relevant to the implementation

Git rules (mandatory):
- Do NOT commit, push, create branches, or run validation commands
- Do NOT run npm commands (npm install, npm run dev,
  npm run type-check, etc.) — these belong in Section 2
  as USER-run validation steps
- Use Test-Path -LiteralPath and Select-String -LiteralPath for
  any path containing bracket characters (e.g. [id]). Without
  -LiteralPath, PowerShell treats brackets as wildcards and
  returns false negatives even when the file exists.

Stop instruction (mandatory, always last):
- Stop after implementation and summarize: files changed, logic added
  per file, expected behavior, assumptions made

Documentation requirement (mandatory for every phase prompt):
- README.md, docs/PHASE_LOG.md, docs/AI_HANDOFF.md, docs/VERSIONING.md,
  STATE.json

Post-stable bug fix: always include the version bump to X.Y.(Z+1)-alpha
in all five versioning files as an implementation requirement — not as a
separate step.

## When To Use The 2-Section Format

USE for: new phases, bug fixes, any task where Codex writes/modifies
code or files.

DO NOT USE for: post-validation docs prompts, session checkpoints,
documentation-only tasks. These get a single plain txt code block.

Pre-prompt clarification rule:
Before writing any 2-section prompt, ask all open questions first.
Wait for user answers. Only then write the prompt.
If no questions are needed, state "No clarifying questions needed"
and proceed directly to the 2-section output.

## Mandatory Workflow Artifact Enforcement

Section 2 standard: .\scripts\validate.ps1 is the baseline runner for all
Section 2 validation blocks. Phase-specific Select-String checks append
below the validate.ps1 call.

For implementation phases:
1. Validation summary
2. Implementation commit block (BEFORE running promote.ps1)
   Implementation commit rule: one git add + one git commit per file.
   Never group multiple files into a single commit. This applies to both
   the implementation commit block and the stable-promotion commit block.
3. Stable-promotion block: .\scripts\promote.ps1 PowerShell command
4. Stable-promotion commit block (IMMEDIATELY after the promote.ps1 block,
   in the same message — no AI turn between them)
5. ```powershell git push origin master ``` block — must appear
   in the same message as the stable-promotion commit block,
   no separate turn

For stable-promotion docs-only promotions:
1. Stable-promotion block: .\scripts\promote.ps1 PowerShell command
2. Two-section response (confirmation + 1-by-1 commit block)
3. ```powershell git push origin master ``` block — must appear
   in the same message as the stable-promotion commit block,
   no separate turn
(No validation commands required for docs-only promotion.)

## After Codex Finishes Implementation

If all pass, provide all of the following in one message:
1. Validation summary
2. Implementation commit block
3. Stable-promotion block: .\scripts\promote.ps1 PowerShell command
4. Stable-promotion commit block
5. ```powershell git push origin master ``` block

The promote.ps1 block and stable-promotion commit block MUST
travel together in the same message, with the commit block appearing
immediately below the promote.ps1 block. No additional AI turn is
required or permitted between them.

## Post-Validation Two-Section Response

This two-section block must appear immediately below the
promote.ps1 block in the same message.

SECTION 1: Stable-Promotion Confirmation
- Summarize what passed
- Identify files changed
- Identify remaining future work

SECTION 2: commit-phase.ps1 Call Sequence
One .\scripts\commit-phase.ps1 call per file. Never group files.
```powershell
.\scripts\commit-phase.ps1 -File "docs/VERSIONING.md" -Message "docs: promote X.Y.Z to stable"
.\scripts\commit-phase.ps1 -File "docs/AI_HANDOFF.md" -Message "docs: update AI handoff for X.Y.Z stable"
.\scripts\commit-phase.ps1 -File "docs/PHASE_LOG.md" -Message "docs: record X.Y.Z stable phase log"
.\scripts\commit-phase.ps1 -File "README.md" -Message "docs: update README version to X.Y.Z stable"
.\scripts\commit-phase.ps1 -File "STATE.json" -Message "chore: update STATE.json to X.Y.Z stable"
...
git status --short
```

After SECTION 2, always include:
```powershell
git push origin master
```
This must appear in the same message — no separate turn.

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

The prompt is a single plain txt code block (no 2-section format).
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
