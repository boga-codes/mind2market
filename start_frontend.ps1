# PowerShell script to start frontend server
Write-Host "Starting Frontend Server..." -ForegroundColor Green

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontendPath = Join-Path $scriptPath "frontend"

if (-not (Test-Path (Join-Path $frontendPath "package.json"))) {
    Write-Host "Error: package.json not found in frontend directory" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location $frontendPath
npm run dev

