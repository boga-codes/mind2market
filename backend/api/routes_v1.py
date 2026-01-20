"""
V1 API routes for job market analytics
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from services.analytics_service import AnalyticsService
from services.forecast_service import ForecastService
from models.schemas import (
    TopSkill, LocationSkill, SkillForecastRequest, SkillForecastResponse
)

router = APIRouter()
analytics_service = AnalyticsService()
forecast_service = ForecastService()

@router.get("/skills/top", response_model=List[TopSkill])
async def get_top_skills(limit: int = Query(default=20, ge=1, le=100)):
    """
    Get top skills by frequency in job postings
    
    - **limit**: Number of top skills to return (1-100)
    """
    try:
        skills = analytics_service.get_top_skills(limit=limit)
        return skills
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching top skills: {str(e)}")

@router.get("/skills/by-location", response_model=List[LocationSkill])
async def get_skills_by_location(limit_per_location: int = Query(default=10, ge=1, le=50)):
    """
    Get skills grouped by location
    
    - **limit_per_location**: Number of top skills per location (1-50)
    """
    try:
        location_skills = analytics_service.get_skills_by_location(limit_per_location=limit_per_location)
        return location_skills
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching location skills: {str(e)}")

@router.post("/skills/forecast", response_model=SkillForecastResponse)
async def forecast_skill_demand(request: SkillForecastRequest):
    """
    Forecast future demand for a skill
    
    - **skill**: Skill name to forecast
    - **months**: Forecast horizon in months (1-24)
    """
    try:
        forecast = forecast_service.forecast_skill_demand(
            skill=request.skill,
            months=request.months
        )
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error forecasting skill demand: {str(e)}")

@router.get("/skills/forecast", response_model=SkillForecastResponse)
async def forecast_skill_demand_get(
    skill: str = Query(..., description="Skill name to forecast"),
    months: int = Query(default=6, ge=1, le=24, description="Forecast horizon in months")
):
    """
    Forecast future demand for a skill (GET version)
    
    - **skill**: Skill name to forecast
    - **months**: Forecast horizon in months (1-24)
    """
    try:
        forecast = forecast_service.forecast_skill_demand(skill=skill, months=months)
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error forecasting skill demand: {str(e)}")

