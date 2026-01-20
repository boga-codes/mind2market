@echo off
echo Starting Frontend Server...
cd /d "%~dp0frontend"
if not exist "package.json" (
    echo Error: package.json not found in frontend directory
    pause
    exit /b 1
)
npm run dev

