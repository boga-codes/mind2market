@echo off
echo ========================================
echo Job Market Analytics Platform - Setup
echo ========================================
echo.

echo [1/3] Setting up Backend...
cd backend
if exist "..\requirements.txt" (
    echo Installing Python dependencies...
    pip install -r ..\requirements.txt
) else (
    echo Warning: requirements.txt not found in parent directory
)
cd ..
echo.

echo [2/3] Setting up Frontend...
cd frontend
if exist "package.json" (
    echo Installing Node.js dependencies...
    call npm install
) else (
    echo Error: package.json not found in frontend directory
)
cd ..
echo.

echo [3/3] Generating Sample Data...
cd backend
if exist "utils\generate_sample_data.py" (
    echo Generating sample data...
    python utils\generate_sample_data.py
) else (
    echo Warning: Sample data generator not found
)
cd ..
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Run start_backend.bat (in a new terminal)
echo   2. Run start_frontend.bat (in another terminal)
echo   3. Open http://localhost:3000 in your browser
echo.
pause

