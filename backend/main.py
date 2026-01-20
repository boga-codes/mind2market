"""
Job Market Analytics & Skill Demand Prediction Platform - Backend
Main FastAPI application entry point
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from typing import Optional, List
import os
import subprocess
import sys
import time
import multiprocessing

from api import routes_v1, routes_v2, resume_routes

# Initialize FastAPI app
app = FastAPI(
    title="Mind2Market API",
    description="API for skill discovery, demand prediction, and career path design",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(routes_v1.router, prefix="/v1", tags=["v1"])
app.include_router(routes_v2.router, prefix="/v2", tags=["v2"])
app.include_router(resume_routes.router, prefix="/resume", tags=["resume"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Mind2Market API - Discover skills. Predict demand. Design your career path.",
        "version": "2.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "job-market-analytics"}

def run_backend():
    """Function to run the backend server in a separate process"""
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="error")

if __name__ == "__main__":
    print("🚀 Starting Mind2Market...")
    
    # Get the project root directory
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    frontend_dir = os.path.join(project_root, "frontend")
    
    frontend_process = None
    backend_process = None
    
    try:
        # Check if npm is available
        subprocess.run("npm --version", check=True, capture_output=True, shell=True)
        
        # Start frontend server
        frontend_process = subprocess.Popen(
            "npm run dev", 
            cwd=frontend_dir,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            shell=True
        )
        
        # Wait a moment for frontend to start
        time.sleep(2)
        
        print("🌐 Frontend running at http://localhost:3000")
        
        # Start backend server in a separate process
        backend_process = multiprocessing.Process(target=run_backend)
        backend_process.start()
        
        print("🔧 Backend running at http://localhost:8000")
        print("Press Ctrl+C to stop both servers")
        
        # Keep the main process alive
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n🛑 Shutting down servers...")
        
    except subprocess.CalledProcessError:
        print("❌ npm is not installed or not in PATH. Please install Node.js and npm.")
        print("💡 Download from: https://nodejs.org/")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error starting servers: {e}")
    finally:
        # Clean up processes
        if frontend_process:
            frontend_process.terminate()
            frontend_process.wait()
        if backend_process:
            backend_process.terminate()
            backend_process.join()
        print("✅ Servers stopped.")

