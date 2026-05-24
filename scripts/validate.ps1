$ErrorActionPreference = "Continue"
$dash = [char]0x2014

$passCount = 0
$failCount = 0

function Pass-Check {
  param([string]$Description)
  $script:passCount += 1
  Write-Host "PASS : $Description"
}

function Fail-Check {
  param(
    [string]$Description,
    [string]$Detail = ""
  )
  $script:failCount += 1
  if ($Detail -ne "") {
    Write-Host "FAIL : $Description $dash $Detail"
  } else {
    Write-Host "FAIL : $Description"
  }
}

$step1Label = "fix-mojibake.ps1 $dash idempotent repair complete"
try {
  $step1Output = .\scripts\fix-mojibake.ps1 2>&1
  if ($LASTEXITCODE -eq 0) {
    Pass-Check $step1Label
  } else {
    Fail-Check $step1Label (($step1Output | Out-String).Trim())
  }
} catch {
  Fail-Check $step1Label $_.Exception.Message
}

$step2Label = "Mojibake scan $dash docs/ README.md CLAUDE.md scripts/"
$badSequences = @(
  ([string]([char]0x00E2) + [string]([char]0x20AC)),
  ([string]([char]0x00C3) + [string]([char]0x00D7)),
  ([string]([char]0x00E2) + [string]([char]0x2020)),
  ([string]([char]0x00E2) + [string]([char]0x20AC) + [string]([char]0x02DC)),
  ([string]([char]0x00E2) + [string]([char]0x20AC) + [string]([char]0x2122)),
  ([string]([char]0x00E2) + [string]([char]0x20AC) + [string]([char]0x0153))
)
$scanFiles = @()
$scanFiles += Get-ChildItem -LiteralPath "docs" -Recurse -File | Where-Object { $_.Extension -in ".md", ".ps1" }
$scanFiles += Get-Item -LiteralPath "README.md"
$scanFiles += Get-Item -LiteralPath "CLAUDE.md"
$scanFiles += Get-ChildItem -LiteralPath "scripts" -Recurse -File | Where-Object { $_.Extension -in ".md", ".ps1" }
$matches = $scanFiles | Select-String -Pattern $badSequences
if (($null -eq $matches) -or ($matches.Count -eq 0)) {
  Pass-Check $step2Label
} else {
  $files = $matches | Select-Object -ExpandProperty Path -Unique
  Fail-Check $step2Label ("$($matches.Count) matches in " + (($files | ForEach-Object { Split-Path -Leaf $_ }) -join ", "))
}

$step3Label = "npm run type-check"
$typeCheckOutput = npm run type-check 2>&1
if ($LASTEXITCODE -eq 0) {
  Pass-Check $step3Label
} else {
  Fail-Check $step3Label (($typeCheckOutput | Out-String).Trim())
}

$step4Label = "npm run build"
$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
  Pass-Check $step4Label
} else {
  $tail = $buildOutput | Select-Object -Last 40
  Fail-Check $step4Label (($tail | Out-String).Trim())
}

$totalCount = $passCount + $failCount
if ($failCount -eq 0) {
  Write-Host "OVERALL PASS ($passCount/$totalCount checks passed)"
} else {
  Write-Host "OVERALL FAIL ($passCount/$totalCount checks passed, $failCount failed)"
  exit 1
}
