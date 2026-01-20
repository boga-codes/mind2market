from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from api import routes_v1, routes_v2, resume_routes

app = FastAPI(title="Mind2Market")

# -------------------------
# API ROUTES
# -------------------------
app.include_router(routes_v1.router, prefix="/api/v1")
app.include_router(routes_v2.router, prefix="/api/v2")
app.include_router(resume_routes.router, prefix="/api")

# -------------------------
# FRONTEND SERVING
# -------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"

# Serve static assets
app.mount(
    "/assets",
    StaticFiles(directory=FRONTEND_DIST / "assets"),
    name="assets",
)

# Serve React index.html
@app.get("/")
def serve_frontend():
    return FileResponse(FRONTEND_DIST / "index.html")


# React router support (VERY IMPORTANT)
@app.get("/{path:path}")
def serve_react_routes(path: str):
    return FileResponse(FRONTEND_DIST / "index.html")

