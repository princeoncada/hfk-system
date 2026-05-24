# fix-mojibake.ps1 — Runs the repository mojibake repair helper.
# Usage: .\scripts\fix-mojibake.ps1

$ErrorActionPreference = "Stop"

python "$PSScriptRoot\fix_mojibake.py"
