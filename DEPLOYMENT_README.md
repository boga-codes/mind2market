# 🚀 FREE Deployment Guide - Job Market Analytics Platform

## 📋 Overview
Deploy your full-stack application completely FREE using Vercel + Render!

## 🎯 Architecture
- **Frontend**: React + Vite → Vercel (Free)
- **Backend**: FastAPI → Render (Free)
- **Database**: CSV files (GitHub hosted)

---

## 📦 Step 1: Prepare Your Code

### 1.1 Update API Configuration
Your code is already configured! The frontend will automatically use the deployed backend URL.

### 1.2 Test Locally First
```bash
# Backend
cd backend
pip install -r requirements.txt
python main.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🚀 Step 2: Deploy Backend (Render)

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (FREE)

### 2.2 Deploy Backend
1. Click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `job-market-backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python start.py`
4. Add Environment Variable:
   - **Key**: `ENVIRONMENT`
   - **Value**: `production`
5. Click **"Create Web Service"**

### 2.3 Get Backend URL
After deployment, copy the URL: `https://your-app-name.onrender.com`

---

## 🎨 Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (FREE)

### 3.2 Deploy Frontend
1. Click **"New Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-render-app.onrender.com` (your backend URL)
5. Click **"Deploy"**

### 3.3 Update API Routes
After deployment, update the `vercel.json` in your frontend folder:

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-render-app.onrender.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🔄 Step 4: Update & Redeploy

### 4.1 Update Backend URL in Frontend
If your Render URL changes, update the environment variable in Vercel:
1. Go to Vercel Dashboard
2. Your project → Settings → Environment Variables
3. Update `VITE_API_URL`

### 4.2 Redeploy
```bash
# Push changes to GitHub
git add .
git commit -m "Deploy to production"
git push origin main

# Vercel auto-deploys
# Render auto-deploys (or manual redeploy)
```

---

## 🌐 Step 5: Access Your App

Your app will be live at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-app.onrender.com`

Share the frontend URL with everyone! 🎉

---

## 🛠 Troubleshooting

### Backend Issues
```bash
# Check Render logs
# Go to Render Dashboard → Your Service → Logs
```

### Frontend Issues
```bash
# Check Vercel logs
# Go to Vercel Dashboard → Your Project → Functions/Edge Functions
```

### CORS Issues
Update CORS in `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API Connection Issues
1. Verify `VITE_API_URL` in Vercel
2. Check Render service is running
3. Check API endpoints: `https://your-render-app.onrender.com/docs`

---

## 💡 Pro Tips

1. **Custom Domain**: Add free domain from Vercel
2. **Analytics**: Use Vercel Analytics (free)
3. **Monitoring**: Check Render/Vercel dashboards
4. **Backup**: Your data is safe in GitHub

---

## 🎯 Free Limits

- **Vercel**: 100GB bandwidth/month, unlimited static sites
- **Render**: 750 hours/month, 1GB RAM, 1GB disk
- **GitHub**: Unlimited public repositories

Your app will handle thousands of users! 🚀

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://docs.render.com
- FastAPI Docs: https://fastapi.tiangolo.com

Happy deploying! 🎉