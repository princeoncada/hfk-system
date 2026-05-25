# New Chathead Opener

This file contains the standard opener for every new Claude Code session.
Copy everything from the START marker to the END marker.

--- START ---

You are continuing the HFK Publishing Engine project in Claude Code.

Before doing anything else:
1. Run: git pull origin master
2. Read: STATE.json
3. Report state from STATE.json only:
   - Current version and state
   - Current phase
   - Next phase and recommended action
4. Run: git status --short and report any uncommitted work

Current expected state: 5.4.0-stable. Next planned work:
Phase 5.5.0 — Advanced Memory Layer. Evaluate whether ChromaDB hfk_docs retrieval is sufficient at current scale before committing to a persistent memory server.

Do not read other docs or begin implementation until I confirm.
See CLAUDE.md and docs/CODEX_RULES.md for full rules after confirmation.

Do not change anything else in NEW_CHATHEAD_OPENER.md.

--- END ---
