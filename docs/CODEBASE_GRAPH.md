# HFK Publishing Engine — Graphify Codebase Graph

## Purpose

`codebase-graph.json` is the read-first map for code navigation. Graphify is the authoritative generator for this artifact. The committed graph gives AI sessions a compact map of files, symbols, imports, route surfaces, scripts, and docs so they can choose targeted source reads instead of scanning several files at the start of each implementation prompt.

## Refreshing the Graph

Run:

```powershell
.\scripts\generate-codebase-graph.ps1
```

The wrapper uses the installed `graphify` CLI from the PyPI package `graphifyy` and normalizes the output into `codebase-graph.json`. It also leaves Graphify's native outputs in `graphify-out/graph.json` and `graphify-out/GRAPH_REPORT.md`.

Use the degraded fallback explicitly only when Graphify is unavailable:

```powershell
.\scripts\generate-codebase-graph.ps1 -FallbackOnly
```

## Protected Paths

The generator excludes `content/`, `exports/`, `archives/`, `assets/avatars/`, `vault/`, `.env`, `.git`, `.next`, `graphify-out/`, and `node_modules/`. The graph should describe engine structure, not creative source material or generated output.

## AI Usage Rule

Codex should read `STATE.json`, then `codebase-graph.json`, before choosing implementation files. For orientation-heavy work, read `graphify-out/GRAPH_REPORT.md` before source files. The graph does not replace source reads for edits; it narrows them to the few files most likely to matter.
