@echo off
echo Starting Backend Server...
cd /d "%~dp0backend"
if not exist "main.py" (
    echo Error: main.py not found in backend directory
    pause
    exit /b 1
)
python main.py

