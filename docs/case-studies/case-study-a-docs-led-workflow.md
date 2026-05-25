# Docs-Led AI Workflow: Building a Reproducible AI-Assisted Content Studio

## Problem

Ad-hoc AI prompting works well for isolated tasks, but it breaks down in a
long-running software project. Each new session begins without memory of the
last one. The developer has to restate the architecture, explain which paths
are protected, summarize prior bugs, and repeat decisions that were already
settled. The first ten minutes of a session can become an orientation ritual
instead of engineering work.

That cost compounds as the project grows. The HFK Publishing Engine moved from
a bootstrap Next.js app into a local-first publishing studio with structured
content, stable React templates, a Vault knowledge layer, ChromaDB retrieval,
planning workflows, approval gates, review screens, and automation scripts. At
that scale, "just prompt the AI" is not a workflow. It is a recurring source of
implementation drift.

The core problem is not that AI systems are unable to follow instructions. The
problem is that the instructions are often hidden in the developer's head, in
old chat history, or in source files that the model may not read. Without a
structured handoff, every session re-discovers the same project from scratch.
That creates inconsistent output, stale assumptions, and avoidable regressions.

## Solution

The HFK workflow treats documentation as the primary engineering artifact. Code
implements the architecture, but the architecture lives in structured markdown
and machine-readable state. Every phase has an explicit scope. Every version
change updates the same documented locations. Every session starts from the
same state file and read-first instructions.

This changes the role of AI from an open-ended collaborator into a reliable
build tool. The AI does not infer the project from vibes, prior chat memory, or
whatever files happen to be opened first. It reads the authoritative context:
STATE.json, AI_HANDOFF.md, PHASE_LOG.md, FUTURE_PLANS.md, VERSIONING.md,
CLAUDE.md, README.md, and any targeted files named in the prompt.

The result is a reproducible development loop. The operator decides the phase.
The planning layer scopes the work and writes the implementation prompt. The
implementation layer reads the required files, makes only the requested
changes, and stops for validation. Stable promotion only happens after the
operator validates the result.

## Key Mechanisms

The first mechanism is a two-layer workflow. Claude Code is the planning,
scoping, review, and validation layer. Codex is the implementation layer.
CLAUDE.md makes this separation explicit: Claude Code diagnoses, scopes, writes
prompts, interprets validation results, and provides commit instructions. Codex
implements only what the prompt asks for. That boundary prevents a single AI
session from both inventing scope and silently changing the project.

The second mechanism is the read-first file list. Every Codex prompt names the
files that must be read before edits begin. This keeps context targeted. The AI
does not need to browse the full codebase to modify a small documentation
phase, and it does not need to guess which rules matter. The read-first list
turns context gathering into an explicit dependency, the same way a function
signature makes inputs visible.

The third mechanism is STATE.json. It is the single source of truth for current
version, state, phase, series, and next planned work. A new AI session can
orient in under 30 seconds regardless of project age because it does not need
to scan the entire phase log to learn the current status. The large docs remain
available for detail, but the project state is compact and machine-readable.

The fourth mechanism is the validation and promotion cycle. Work begins as
alpha. If validation is partial, it can move to beta. Only after validation
passes and the user commits does a phase become stable. This alpha -> beta ->
stable protocol prevents unvalidated implementation from being described as
done. It also gives future sessions a clear interpretation of what they are
reading.

The fifth mechanism is the version protocol. Every version bump touches five
locations together: docs/VERSIONING.md, docs/AI_HANDOFF.md,
docs/PHASE_LOG.md, README.md, and STATE.json. This creates an audit trail
across human-facing docs and machine-readable state. If a session opens any one
of those files, it sees the same version story.

## Outcomes

This workflow has supported more than 40 phases and patches with consistent
implementation quality. The project history includes frontend features,
backend routes, local database integration, template editing, export behavior,
workflow automation, graph-based code orientation, and documentation retrieval.
The common thread is not the technology stack. It is that every change is
described before it is implemented.

Implementation divergence has been effectively eliminated when prompts include
read-first file lists and precise safety constraints. The AI is not asked to
decide whether content files, exports, archives, avatar assets, or environment
files are in scope. Those boundaries are stated before the work starts.

Sessions are also reproducible. The same docs plus the same implementation
prompt lead to the same direction of work, even in a fresh conversation. That
matters because AI-assisted development often fails at continuity before it
fails at coding. HFK's standard opener lets a new session join cold, read the
state, and continue without reconstructing project history from the developer.

The documentation has also become onboarding material. A future AI session can
learn the architecture, constraints, validation expectations, and phase
sequence from the repository itself. The operator does not have to be the
memory layer.

## Key Insight

The documentation is the product architecture. Code implements what the docs
specify. When documentation is authoritative, AI becomes a repeatable build
tool rather than a creative collaborator who forgets everything between
conversations.

For HFK, the practical lesson is simple: reliable AI-assisted development is
less about finding the perfect prompt and more about building a system where
the prompt has stable inputs. Structured docs, explicit state, narrow scope,
and validation records give the AI enough context to execute without turning
each session into a rediscovery project.
