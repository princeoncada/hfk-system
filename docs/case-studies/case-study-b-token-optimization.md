# Token Optimization Journey: Making AI Sessions Leaner as the Project Scales

## Problem

AI session overhead grows with project age. Every phase adds more history to
PHASE_LOG.md, more roadmap detail to FUTURE_PLANS.md, and more operational
context to AI_HANDOFF.md. Early HFK sessions could start with roughly 2,000
tokens of documentation context. After more than 40 phases and patches,
unchecked doc growth pushed routine startup context toward 8,000 to 10,000
tokens before any real implementation work began.

That is not just a cost issue. It is a latency issue and a quality issue. Large
startup reads leave less room for the current task, encourage skimming, and
make it easier for a model to anchor on stale or irrelevant history. In a
long-running AI-assisted project, every session pays the same orientation tax
unless the project invests in retrieval infrastructure.

The HFK approach was to reduce the amount of context that must be loaded by
default. The goal was not to make documentation smaller or less detailed. The
goal was to stop reading every large document when a targeted query could
answer the question.

## The 5.X Optimization Series

The 5.x workflow infrastructure series focused on making AI sessions leaner as
the project scaled. Each optimization replaced linear browsing with a targeted
lookup path.

## Optimization 1 - Graphify Codebase Graph (Phases 5.2.0-5.2.7)

Before Graphify, code orientation required opening source files directly. A
simple question such as "what fields does a worksheet asset have?" could lead
to reading types.ts, content.ts, schema files, Vault types, and nearby helper
modules. That was acceptable when the codebase was small, but it became
expensive as routes, components, scripts, and model contracts accumulated.

Graphify introduced a committed codebase graph under graphify-out/. The
workflow now starts codebase questions with commands such as:

```powershell
graphify query . "worksheet"
```

The query returns relevant graph nodes in under 1 second when the graph exists.
For relationship questions, the workflow can use graphify path with exact node
names. For focused conceptual orientation, it can use graphify explain. The
graph is committed to the repository, so no server startup is required.

This replaced broad source browsing with graph-guided orientation. The impact
is largest on exploratory questions: it eliminates most file-browsing overhead
before a direct source read is needed. The graph does not replace source files
for implementation, but it reduces the files opened just to find the starting
point.

## Optimization 2 - ChromaDB Docs Extension (Phase 5.3.0)

The next bottleneck was documentation startup. Before Phase 5.3.0, routine
session orientation often meant reading AI_HANDOFF.md at roughly 300 lines,
PHASE_LOG.md at more than 400 lines and growing, and FUTURE_PLANS.md at about
130 lines. Those reads were useful, but most tasks only needed a few chunks:
current phase status, next planned work, the latest version rule, or one
specific validation record.

Phase 5.3.0 extended the existing local ChromaDB instance with an hfk_docs
collection. The project already used ChromaDB for vault_assets, so the docs
extension did not add a new database or service. It added ingestion and query
scripts for the documentation layer:

```powershell
python scripts/query_docs.py "current phase status"
```

The query returns the two or three most relevant chunks in under 2 seconds in
normal local use. Full document reads are still available, but they are
reserved for cases where the query result is insufficient. This changed the
session-start pattern from "open the large docs first" to "query first, then
open only what is needed."

The estimated impact is a 15-20% reduction in session-start token overhead at
the current project size. That estimate grows more valuable as the docs grow,
because the old approach scales with document length while retrieval scales
with relevant chunks. The infrastructure cost was zero: HFK reused the ChromaDB
service already running on port 8000 for vault_assets.

## What Was Not Built (And Why)

Zep Community Edition was evaluated as an advanced memory layer. It offers a
more specialized memory model, but for HFK's immediate need it required
PostgreSQL plus three Docker services to retrieve documentation chunks. That
was too much infrastructure for a use case already covered by the existing
ChromaDB instance.

Mem0 was also evaluated. It was rejected because its cloud API model conflicted
with HFK's local-first architecture constraint. The publishing engine keeps
content files, generated outputs, ChromaDB retrieval, and workflow state local.
A memory layer that depends on cloud infrastructure would add operational and
privacy tradeoffs that the project does not need at this stage.

The principle was straightforward: prefer extending existing running
infrastructure over adding new dependencies. If a local service already solves
the retrieval problem, a new memory stack has to justify its cost with a
capability the current stack cannot provide.

## Roadmap

An advanced memory layer remains planned. The intended direction is to replace
file-based memory with query-based retrieval through a persistent memory
server. The estimated benefit is a 30-40% reduction in session-start overhead
once the project reaches a scale where ChromaDB document chunks are no longer
enough.

That work is deliberately deferred. HFK does not need three new services to
solve today's documentation retrieval problem. The current ChromaDB layer is
cheap, local, and already integrated into the workflow. The right next step is
to let it prove whether it is sufficient at the current scale before adding a
dedicated memory server.

## Key Insight

Token optimization is an infrastructure engineering problem, not a prompting
problem. Better prompts help only after the session has loaded the context it
needs. The larger gains come from replacing O(n) document reads with O(1)
targeted queries, where n grows with every phase.

HFK's optimization path reflects that. Graphify reduces code orientation
overhead. ChromaDB docs retrieval reduces documentation startup overhead. A
future memory layer may reduce persistent handoff overhead further. The common
pattern is query-first retrieval over bulk reading.

Invest in the query layer early. The savings compound immediately, and the
workflow becomes more reliable because sessions load the context that matters
instead of carrying the entire project history into every prompt.
