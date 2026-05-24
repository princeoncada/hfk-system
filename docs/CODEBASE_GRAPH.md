# HFK Publishing Engine — Graphify-Ready Codebase Graph

## Purpose

`codebase-graph.json` is the read-first map for code navigation. Graphify is the intended authoritative generator for this artifact. The committed graph gives AI sessions a compact map of files, symbols, imports, route surfaces, scripts, and docs so they can choose targeted source reads instead of scanning several files at the start of each implementation prompt.

## Refreshing the Graph

Run:

```powershell
.\scripts\generate-codebase-graph.ps1
```

When the `graphify` CLI is installed, the wrapper uses it and normalizes the output into `codebase-graph.json`. If Graphify is unavailable, the wrapper writes a degraded fallback graph using `scripts/generate_codebase_graph.py`; that fallback is only a bridge until the real Graphify CLI is installed and run.

Use the fallback explicitly only when needed:

```powershell
.\scripts\generate-codebase-graph.ps1 -FallbackOnly
```

## Protected Paths

The generator excludes `content/`, `exports/`, `archives/`, `assets/avatars/`, `vault/`, `.env`, `.git`, `.next`, `graphify-out/`, and `node_modules/`. The graph should describe engine structure, not creative source material or generated output.

## AI Usage Rule

Codex should read `STATE.json`, then `codebase-graph.json`, before choosing implementation files. The graph does not replace source reads for edits; it narrows them to the few files most likely to matter. A future 5.2.1 patch should install/run real Graphify and replace the fallback-derived graph with Graphify-derived output.
