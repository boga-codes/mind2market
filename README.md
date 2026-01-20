# Job Market Analytics & Skill Demand Prediction Platform (V2)

A comprehensive, production-ready web application for analyzing job market data, predicting skill demand trends, detecting emerging skills, and generating personalized skill roadmaps. Built with React and FastAPI.

## 🎯 Features

### Core Features

1. **Job Market Analytics (V1)**
   - Skill frequency analysis
   - Location-wise skill demand
   - Role-wise skill distribution
   - Interactive charts and tables

2. **Skill Demand Forecasting**
   - Predict future skill demand using Facebook Prophet
   - Customizable time horizons (3, 6, 12, 24 months)
   - Trend analysis in plain English
   - Visual forecast charts

3. **Emerging Skill Detection (V2)**
   - NLP-powered phrase extraction
   - Sentence embeddings using MiniLM
   - Clustering (KMeans)
   - Confidence scoring
   - Export to CSV

4. **Skill Roadmap Generator (V2)**
   - Learning stages (Beginner → Intermediate → Advanced)
   - Estimated learning hours
   - Free learning resources (YouTube, docs, GitHub)
   - Hands-on project ideas
   - Career paths related to the skill

5. **Resume Analyzer**
   - Upload and analyze resumes (PDF, DOCX, TXT)
   - Skill extraction and matching
   - Job role matching with scores
   - Personalized recommendations

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Generate sample data (optional):**

   **Using PowerShell:**
   ```powershell
   .\generate_sample_data.ps1
   ```

   **Using Command Prompt/Batch:**
   ```batch
   generate_sample_data.bat
   ```

   **Or manually:**
   ```bash
   cd backend
   python utils/generate_sample_data.py
   ```

5. **Run the application:**

   **Simple way (starts both frontend and backend):**
   ```bash
   cd backend
   python main.py
   ```
   
   This will automatically start both servers and display the URLs.

   **Or manually start backend:**
   ```bash
   cd backend
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

   Backend will be available at: `http://localhost:8000`
   API docs available at: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**

   **Simple way (use the backend command above which starts both):**
   ```bash
   cd backend
   python main.py
   ```
   
   **Or manually:**
   ```bash
   cd frontend
   npm run dev
   ```
   
   Frontend will be available at: `http://localhost:3000`

## 📁 Project Structure

```
job-market-platform/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── api/                    # API routes
│   │   ├── routes_v1.py        # V1 endpoints (analytics, forecast)
│   │   ├── routes_v2.py        # V2 endpoints (emerging skills, roadmap)
│   │   └── resume_routes.py    # Resume analysis endpoints
│   ├── services/               # Business logic
│   │   ├── analytics_service.py
│   │   ├── forecast_service.py
│   │   ├── emerging_skills_service.py
│   │   ├── roadmap_service.py
│   │   └── resume_service.py
│   ├── models/                 # Pydantic models
│   │   └── schemas.py
│   ├── utils/                  # Utilities
│   │   ├── data_loader.py
│   │   └── generate_sample_data.py
│   └── data/                   # Data files
│       ├── jobs.db             # SQLite database
│       └── processed/
│           └── clean_jobs.csv  # Processed CSV data
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── styles/             # CSS/Tailwind
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── requirements.txt            # Python dependencies
└── README.md
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Health check endpoint

### V1 - Analytics & Forecasting
- `GET /v1/skills/top?limit=20` - Get top skills
- `GET /v1/skills/by-location?limit_per_location=10` - Skills by location
- `GET /v1/skills/forecast?skill=Python&months=6` - Forecast skill demand
- `POST /v1/skills/forecast` - Forecast skill demand (POST)

### V2 - Emerging Skills & Roadmaps
- `GET /v2/skills/emerging?min_cluster_size=3` - Get emerging skills
- `GET /v2/skill/roadmap?skill=Python` - Get skill roadmap

### Resume Analysis
- `POST /resume/analyze` - Analyze resume (multipart/form-data)

## 📊 Example API Calls

### Get Top Skills
```bash
curl http://localhost:8000/v1/skills/top?limit=10
```

### Forecast Skill Demand
```bash
curl "http://localhost:8000/v1/skills/forecast?skill=Python&months=6"
```

### Get Emerging Skills
```bash
curl http://localhost:8000/v2/skills/emerging
```

### Get Skill Roadmap
```bash
curl "http://localhost:8000/v2/skill/roadmap?skill=React"
```

### Analyze Resume
```bash
curl -X POST \
  -F "file=@resume.pdf" \
  http://localhost:8000/resume/analyze
```

## 🎨 UI Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Interactive Charts**: Bar charts, line charts using Recharts
- **Real-time Updates**: Live data fetching and updates
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during data loading

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory (see `.env.example`):

```env
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend Configuration

Update `frontend/src/services/api.js` if your backend runs on a different port:

```javascript
const API_BASE_URL = 'http://localhost:8000'
```

## 📦 Dependencies

### Backend
- FastAPI - Web framework
- Uvicorn - ASGI server
- Pandas - Data processing
- Prophet - Time series forecasting
- Sentence-Transformers - NLP embeddings
- Scikit-learn - Clustering
- PyPDF2 - PDF parsing
- python-docx - DOCX parsing

### Frontend
- React 18 - UI framework
- React Router - Routing
- Tailwind CSS - Styling
- Recharts - Charts
- Axios - HTTP client
- Vite - Build tool

## 🐛 Troubleshooting

### Backend Issues

**Import errors:**
- Ensure you're running from the `backend` directory
- Check that all dependencies are installed: `pip install -r requirements.txt`

**Database errors:**
- Generate sample data: `python utils/generate_sample_data.py`
- Check that `data/jobs.db` or `data/processed/clean_jobs.csv` exists

**Prophet installation issues:**
- On Windows, you may need Visual C++ Build Tools
- Try: `pip install prophet --no-cache-dir`

### Frontend Issues

**CORS errors:**
- Ensure backend CORS is configured for `http://localhost:3000`
- Check that backend is running on port 8000

**API connection errors:**
- Verify backend is running: `http://localhost:8000/health`
- Check `frontend/src/services/api.js` for correct API URL

## 📝 Usage Examples

### Analyzing Job Market Trends

1. Navigate to Dashboard
2. View top skills chart
3. Filter by location
4. Export data if needed

### Forecasting Skill Demand

1. Go to Forecast page
2. Enter skill name (e.g., "Python")
3. Select time horizon (3, 6, 12, or 24 months)
4. Click "Generate Forecast"
5. View forecast chart and trend analysis

### Discovering Emerging Skills

1. Visit Emerging Skills page
2. View AI-detected emerging skills
3. See confidence scores and trends
4. Skills are automatically saved to CSV

### Getting Learning Roadmaps

1. Go to Roadmap page
2. Enter skill name
3. Click "Generate Roadmap"
4. Explore learning stages, resources, and projects
5. View career paths

### Analyzing Your Resume

1. Navigate to Resume Analyzer
2. Upload your resume (PDF, DOCX, or TXT)
3. View extracted skills
4. See job role matches with scores
5. Get personalized recommendations

## 🎓 For Beginners

This platform is designed to be beginner-friendly:

- **No coding required** to use the web interface
- **Clear explanations** for all features
- **Visual charts** for easy understanding
- **Plain English** trend analysis
- **Step-by-step** learning roadmaps

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Facebook Prophet for time series forecasting
- Sentence-Transformers for NLP capabilities
- Recharts for beautiful data visualizations
- The open-source community

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ for students, job seekers, and professionals.**

