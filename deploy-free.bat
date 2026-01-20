@echo off
echo ========================================
echo 🚀 FREE Deployment Setup
echo Job Market Analytics Platform
echo ========================================
echo.

echo 📋 Prerequisites Check:
echo - GitHub repository created and pushed
echo - Vercel account: https://vercel.com
echo - Render account: https://render.com
echo.

echo 🎯 Deployment Steps:
echo.
echo 1. BACKEND DEPLOYMENT (Render):
echo   - Go to https://render.com
echo   - New → Web Service
echo   - Connect GitHub repo
echo   - Runtime: Python 3
echo   - Build: pip install -r requirements.txt
echo   - Start: python start.py
echo   - Environment: ENVIRONMENT=production
echo.

echo 2. FRONTEND DEPLOYMENT (Vercel):
echo   - Go to https://vercel.com
echo   - New Project
echo   - Import GitHub repo
echo   - Root: frontend
echo   - Framework: Vite
echo   - Env Var: VITE_API_URL=https://your-render-url.onrender.com
echo.

echo 3. UPDATE CORS (after backend deploys):
echo   - Copy Render URL
echo   - Update VITE_API_URL in Vercel
echo   - Update CORS_ORIGINS in backend/main.py
echo.

echo 🌐 Your app will be live at:
echo Frontend: https://your-project.vercel.app
echo Backend:  https://your-app.onrender.com
echo.

echo 📚 Full guide: DEPLOYMENT_README.md
echo.
pause