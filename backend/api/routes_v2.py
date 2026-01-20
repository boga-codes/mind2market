"""
V2 API routes for emerging skills and roadmap generation
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List
from services.emerging_skills_service import EmergingSkillsService
from services.roadmap_service import RoadmapService
from models.schemas import (
    EmergingSkillsResponse, EmergingSkill,
    SkillRoadmapResponse
)

router = APIRouter()
emerging_skills_service = EmergingSkillsService()
roadmap_service = RoadmapService()

@router.get("/skills/emerging", response_model=EmergingSkillsResponse)
async def get_emerging_skills(min_cluster_size: int = Query(default=3, ge=2, le=10)):
    """
    Detect emerging skills from job descriptions
    
    Uses NLP (sentence embeddings) and clustering to identify emerging skills
    - **min_cluster_size**: Minimum cluster size for skill detection (2-10)
    """
    try:
        emerging_skills = emerging_skills_service.detect_emerging_skills(
            min_cluster_size=min_cluster_size
        )
        return {
            "emerging_skills": emerging_skills,
            "total_candidates": len(emerging_skills)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error detecting emerging skills: {str(e)}")

@router.get("/skill/roadmap", response_model=SkillRoadmapResponse)
async def get_skill_roadmap(skill: str = Query(..., description="Skill name for roadmap")):
    """
    Generate learning roadmap for a skill
    
    Returns:
    - Learning stages (Beginner → Intermediate → Advanced)
    - Estimated learning hours
    - Free learning resources (YouTube, docs, GitHub)
    - Hands-on project ideas
    - Career paths related to the skill
    
    - **skill**: Skill name to generate roadmap for
    """
    try:
        roadmap = roadmap_service.generate_roadmap(skill=skill)
        return roadmap
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating roadmap: {str(e)}")

