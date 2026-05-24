# promote.ps1 — Promotes current alpha version to stable
# Usage: .\scripts\promote.ps1
# Usage with explicit version: .\scripts\promote.ps1 -Version "5.0.0"

param(
  [string]$Version = ""
)

$stateRaw = Get-Content -LiteralPath "STATE.json" -Raw
$state = $stateRaw | ConvertFrom-Json

if ($Version -eq "") {
  $currentVersion = $state.version
  if (-not $currentVersion.EndsWith("-alpha")) {
    Write-Error "Current version '$currentVersion' is not alpha. Nothing to promote."
    exit 1
  }
  $Version = $currentVersion -replace "-alpha$", ""
}

$alphaVersion = "$Version-alpha"
$stableVersion = "$Version-stable"

Write-Host "Promoting $alphaVersion to $stableVersion"

$docFiles = @(
  "docs/VERSIONING.md",
  "docs/AI_HANDOFF.md",
  "docs/PHASE_LOG.md",
  "README.md"
)

foreach ($file in $docFiles) {
  $content = Get-Content -LiteralPath $file -Raw
  $updated = $content -replace [regex]::Escape($alphaVersion), $stableVersion
  Set-Content -LiteralPath $file -Value $updated -Encoding utf8
  Write-Host "  Updated $file"
}

$state.version = $stableVersion
$state.state = "stable"
$state.phase.status = "stable"
$state.lastUpdated = (Get-Date -Format "yyyy-MM-dd")
$state | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath "STATE.json" -Encoding utf8
Write-Host "  Updated STATE.json"

Write-Host ""
Write-Host "Done. Run git status to see changed files."
Write-Host "Commit each file separately, then git push origin master."
