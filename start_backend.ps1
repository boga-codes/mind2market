# PowerShell script to start backend server
Write-Host "Starting Backend Server..." -ForegroundColor Green

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath "backend"

if (-not (Test-Path (Join-Path $backendPath "main.py"))) {
    Write-Host "Error: main.py not found in backend directory" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location $backendPath
python main.py

