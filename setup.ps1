# PowerShell script for complete setup
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Job Market Analytics Platform - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Setup Backend
Write-Host "[1/3] Setting up Backend..." -ForegroundColor Yellow
$backendPath = Join-Path $scriptPath "backend"
$requirementsPath = Join-Path $scriptPath "requirements.txt"

if (Test-Path $requirementsPath) {
    Write-Host "Installing Python dependencies..." -ForegroundColor Green
    pip install -r $requirementsPath
} else {
    Write-Host "Warning: requirements.txt not found in parent directory" -ForegroundColor Yellow
}
Write-Host ""

# Setup Frontend
Write-Host "[2/3] Setting up Frontend..." -ForegroundColor Yellow
$frontendPath = Join-Path $scriptPath "frontend"
$packageJsonPath = Join-Path $frontendPath "package.json"

if (Test-Path $packageJsonPath) {
    Write-Host "Installing Node.js dependencies..." -ForegroundColor Green
    Set-Location $frontendPath
    npm install
    Set-Location $scriptPath
} else {
    Write-Host "Error: package.json not found in frontend directory" -ForegroundColor Red
}
Write-Host ""

# Generate Sample Data
Write-Host "[3/3] Generating Sample Data..." -ForegroundColor Yellow
$generateScriptPath = Join-Path $backendPath "utils\generate_sample_data.py"

if (Test-Path $generateScriptPath) {
    Write-Host "Generating sample data..." -ForegroundColor Green
    Set-Location $backendPath
    python utils\generate_sample_data.py
    Set-Location $scriptPath
} else {
    Write-Host "Warning: Sample data generator not found" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run .\start_backend.ps1 (in a new terminal)" -ForegroundColor White
Write-Host "  2. Run .\start_frontend.ps1 (in another terminal)" -ForegroundColor White
Write-Host "  3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to exit"

