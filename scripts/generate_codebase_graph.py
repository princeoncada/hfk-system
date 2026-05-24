"""Generate codebase-graph.json for AI read-first navigation.

Graphify is the authoritative generator. The local scanner is intentionally a
degraded fallback for environments where the graphify CLI is not installed.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "codebase-graph.json"
GRAPHIFY_OUTPUTS = [ROOT / "graphify-out" / "graph.json", ROOT / "graph.json"]
PROTECTED_DIRS = {
    "content",
    "exports",
    "archives",
    "assets/avatars",
    "vault",
    "node_modules",
    "graphify-out",
    ".next",
    ".git",
}
SCANNED_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx", ".mjs", ".ps1", ".py", ".md", ".json"}


def is_protected(path: Path) -> bool:
    relative = path.relative_to(ROOT).as_posix()
    return any(relative == protected or relative.startswith(f"{protected}/") for protected in PROTECTED_DIRS)


def should_scan(path: Path) -> bool:
    return path.is_file() and path != OUTPUT and path.suffix in SCANNED_EXTENSIONS and not is_protected(path)


def resolve_import(source: Path, specifier: str) -> str | None:
    if specifier.startswith("@/"):
        base = ROOT / "src" / specifier[2:]
    elif specifier.startswith("."):
        base = (source.parent / specifier).resolve()
    else:
        return None

    candidates = [
        base,
        base.with_suffix(".ts"),
        base.with_suffix(".tsx"),
        base.with_suffix(".js"),
        base.with_suffix(".jsx"),
        base / "index.ts",
        base / "index.tsx",
    ]
    for candidate in candidates:
        if candidate.exists() and candidate.is_file() and not is_protected(candidate):
            return f"file:{candidate.relative_to(ROOT).as_posix()}"
    return None


def classify(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    name = path.name
    if relative.startswith("src/app/api/"):
        return "api_route"
    if relative.startswith("src/app/") and name == "page.tsx":
        return "page_route"
    if relative.startswith("src/components/"):
        return "component"
    if relative.startswith("src/lib/"):
        return "library"
    if relative.startswith("scripts/"):
        return "script"
    if relative.startswith("docs/"):
        return "documentation"
    if name in {"CLAUDE.md", "README.md", "STATE.json", "package.json"}:
        return "root_doc"
    return "file"


def extract_symbols(text: str) -> list[str]:
    patterns = [
        r"export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)",
        r"function\s+([A-Za-z0-9_]+)",
        r"export\s+const\s+([A-Za-z0-9_]+)",
        r"const\s+([A-Za-z0-9_]+)\s*=",
        r"export\s+(?:interface|type|class)\s+([A-Za-z0-9_]+)",
        r"(?:interface|type|class)\s+([A-Za-z0-9_]+)",
    ]
    symbols: list[str] = []
    for pattern in patterns:
        for match in re.finditer(pattern, text):
            name = match.group(1)
            if name not in symbols:
                symbols.append(name)
    return symbols[:20]


def extract_imports(path: Path, text: str) -> list[str]:
    imports: list[str] = []
    patterns = [
        r"from\s+['\"]([^'\"]+)['\"]",
        r"import\(\s*['\"]([^'\"]+)['\"]\s*\)",
        r"require\(\s*['\"]([^'\"]+)['\"]\s*\)",
    ]
    for pattern in patterns:
        for match in re.finditer(pattern, text):
            target = resolve_import(path, match.group(1))
            if target and target not in imports:
                imports.append(target)
    return imports


def build_fallback_graph() -> dict:
    files = sorted(path for path in ROOT.rglob("*") if should_scan(path))
    nodes = []
    edges = []
    for path in files:
        relative = path.relative_to(ROOT).as_posix()
        node_id = f"file:{relative}"
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            text = path.read_text(encoding="utf-8", errors="replace")

        nodes.append({
            "id": node_id,
            "type": classify(path),
            "path": relative,
            "symbols": extract_symbols(text),
        })

        for target in extract_imports(path, text):
            edges.append({
                "source": node_id,
                "target": target,
                "type": "imports",
            })

    return {
        "schemaVersion": "hfk-codebase-graph/v1",
        "version": "5.2.0-alpha",
        "generatedAt": date.today().isoformat(),
        "generator": "scripts/generate_codebase_graph.py fallback scanner",
        "graphify": {
            "preferredCli": "graphify",
            "package": "graphifyy",
            "fallbackUsed": True,
            "note": "Install Graphify to refresh with tree-sitter extraction.",
        },
        "protectedPathsExcluded": sorted(PROTECTED_DIRS),
        "readFirst": [
            "STATE.json",
            "codebase-graph.json",
            "docs/CODEX_RULES.md",
            "docs/VERSIONING.md",
            "docs/AI_HANDOFF.md",
            "docs/PHASE_LOG.md",
            "docs/WORKFLOW.md",
        ],
        "nodes": nodes,
        "edges": edges,
    }


def try_graphify() -> dict | None:
    if not shutil.which("graphify"):
        return None

    completed = subprocess.run(["graphify", ".", "--no-viz"], cwd=ROOT, capture_output=True, text=True)
    if completed.returncode != 0:
        return None

    for output in GRAPHIFY_OUTPUTS:
        if output.exists():
            graph = json.loads(output.read_text(encoding="utf-8"))
            return {
                "schemaVersion": "hfk-codebase-graph/v1",
                "version": "5.2.0-alpha",
                "generatedAt": date.today().isoformat(),
                "generator": "graphify CLI",
                "graphify": {
                    "preferredCli": "graphify",
                    "package": "graphifyy",
                    "fallbackUsed": False,
                    "source": output.relative_to(ROOT).as_posix(),
                },
                "readFirst": [
                    "STATE.json",
                    "codebase-graph.json",
                    "docs/CODEX_RULES.md",
                    "docs/VERSIONING.md",
                    "docs/AI_HANDOFF.md",
                    "docs/PHASE_LOG.md",
                    "docs/WORKFLOW.md",
                ],
                "graph": graph,
            }
    return None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--fallback-only", action="store_true")
    args = parser.parse_args()

    graph = None
    if not args.fallback_only:
        graph = try_graphify()

    if graph is None and not args.fallback_only:
        print("Graphify CLI not available or did not produce graph output; writing degraded fallback graph.")

    if graph is None:
        graph = build_fallback_graph()

    OUTPUT.write_text(json.dumps(graph, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(ROOT).as_posix()}")


if __name__ == "__main__":
    main()
