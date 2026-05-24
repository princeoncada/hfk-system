# generate-codebase-graph.ps1 - Builds the committed codebase graph artifact.
# Usage: .\scripts\generate-codebase-graph.ps1
# Usage with local scanner only: .\scripts\generate-codebase-graph.ps1 -FallbackOnly

param(
  [switch]$FallbackOnly
)

$ErrorActionPreference = "Stop"

$args = @()
if ($FallbackOnly) {
  $args += "--fallback-only"
}

python "$PSScriptRoot\generate_codebase_graph.py" @args
