## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query . "<keyword>"` when graphify-out/graph.json exists. Use `graphify path . "<A>" "<B>"` for relationships and `graphify explain . "<concept>"` for focused concepts. Queries match on node names (keyword/BFS traversal), not semantic meaning. Path lookup requires node names from the graph, not file paths. See docs/CODEBASE_GRAPH.md for full query behavior details.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- Do not run graphify update . or any other commands — graph refresh is the user's responsibility after Codex implementation is complete.

## Behavioral Guidelines

These principles balance implementation speed with correctness. Apply proportionally — trivial tasks need minimal ceremony; structural or multi-file changes need full rigor.

### Think Before Coding

Before implementing:
- State assumptions explicitly. If uncertain, surface it — don't silently pick an interpretation.
- If multiple valid approaches exist, note them briefly and pick the simplest unless instructed otherwise.
- If something is genuinely unclear, flag it once and propose your best interpretation. Don't stop completely — propose and proceed unless the ambiguity is blocking.

### Simplicity First

Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- No configurability or flexibility that wasn't requested.
- If you write 200 lines and 50 would work, rewrite it.

Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### Focused Changes

Touch only what the task requires.
- Don't improve adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code or issues, mention them — don't fix them.
- Every changed line should trace directly to the task.

### Goal-Driven Execution

For multi-step tasks, state a brief plan before implementing:
  1. [Step] → verify: [check]
  2. [Step] → verify: [check]

For simple single-file tasks, one line is enough. Don't over-plan trivial changes.
