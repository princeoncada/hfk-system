# HFK Publishing Engine — Context Window Management Strategy

## When to Open a New Session vs. Continue

Open a new session when any one signal appears: the conversation has passed approximately 15-20 turns, Claude Code is showing confusion about earlier decisions, a stable phase was just committed and pushed, work is shifting to a different series, or a phase failed and needs a fresh perspective. A clean stable state is the best time to reset context because the repository becomes the shared memory. Always write a SESSION_LOG entry before closing a session, regardless of reason, so the next session starts with explicit state rather than inferred chat history.

## How STATE.json + Session Opener Replace Multi-Doc Reads

STATE.json contains the complete current state in three fields: version, phase.name, and next.phase. The session opener in docs/NEW_CHATHEAD_OPENER.md is designed to be pasted as the first message of a new session; it includes the STATE.json summary and instructs Claude Code to git pull and read STATE.json first. Together they eliminate startup reads of docs/AI_HANDOFF.md, docs/VERSIONING.md, and docs/PHASE_LOG.md. Use those files only when deeper context is requested. Rule: Claude Code reads STATE.json first, reports state from it, and waits for user confirmation before reading any other doc.

## Writing SESSION_LOG Entries for Maximum State, Minimum Token Cost

Use the fixed format from docs/WORKFLOW.md exactly. "What Was Done" is completed tasks as one-line bullets, not method descriptions. "What Is In Progress" is one bullet per incomplete task, or "Nothing." "Current Version State" is one line: version — phase — state — commit status. "Next Recommended Action" is one clear sentence, no alternatives. "Uncommitted Work" is a file list only, or "None. Working tree is clean." Do not replicate phase history inline; it lives in docs/PHASE_LOG.md. Do not explain why things were done; that belongs in commit messages. Reference docs/NEW_CHATHEAD_OPENER.md, never embed the opener text inline.

## Chathead Opener Format and When to Update

The opener lives in docs/NEW_CHATHEAD_OPENER.md and is the first message pasted into a new Claude Code session. It must include the current version and phase from STATE.json, instruct Claude Code to git pull origin master and read STATE.json, identify the next recommended action, and stay under 300 tokens. Update the opener after every stable promotion, any change to the recommended next action, or a significant finalized architectural decision. Do not update the opener mid-phase. Update it as part of the session checkpoint prompt after a phase stabilizes.

## Keeping AI_HANDOFF.md Lean as Phase History Grows

AI_HANDOFF.md has three zones. Zone 1 is Active at the top, about 100 words max: current version, current phase status, and next recommended work. Zone 2 is Completed phases in the middle: one short paragraph per phase covering scope, key files, and what changed, with no inline validation records. Keep each entry under 60 words. Zone 3 is the archive table at the bottom, headed "## Archive — Pre-X.x History". When a full series completes, compress its completed-phase entries into one row each using: | version | phase name | summary (one sentence) |. Move Zone 2 entries to Zone 3 when the next major series starts. Never delete archived entries.
