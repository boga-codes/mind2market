"""
Pydantic models for request/response validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# V1 Analytics Models
class TopSkill(BaseModel):
    skill: str
    count: int
    percentage: float

class LocationSkill(BaseModel):
    location: str
    skills: List[TopSkill]

class SkillForecastRequest(BaseModel):
    skill: str
    months: int = Field(default=6, ge=1, le=24, description="Forecast horizon in months")

class SkillForecastResponse(BaseModel):
    skill: str
    forecast_data: List[Dict[str, Any]]
    trend: str
    current_demand: float
    predicted_demand: float
    change_percentage: float

# V2 Emerging Skills Models
class EmergingSkill(BaseModel):
    skill: str
    confidence_score: float
    frequency: int
    trend: str

class EmergingSkillsResponse(BaseModel):
    emerging_skills: List[EmergingSkill]
    total_candidates: int

# V2 Roadmap Models
class LearningStage(BaseModel):
    stage: str  # Beginner, Intermediate, Advanced
    hours: int
    topics: List[str]

class LearningResource(BaseModel):
    title: str
    type: str  # YouTube, Documentation, GitHub
    url: str
    description: str

class ProjectIdea(BaseModel):
    title: str
    description: str
    difficulty: str  # Beginner, Intermediate, Advanced

class CareerPath(BaseModel):
    role: str
    description: str
    required_skills: List[str]

class SkillRoadmapResponse(BaseModel):
    skill: str
    learning_stages: List[LearningStage]
    resources: List[LearningResource]
    projects: List[ProjectIdea]
    career_paths: List[CareerPath]
    total_hours: int

# Resume Analysis Models
class ResumeAnalysisRequest(BaseModel):
    filename: Optional[str] = None

class ResumeSkill(BaseModel):
    skill: str
    found: bool
    relevance: float

class JobMatch(BaseModel):
    role: str
    match_score: float
    missing_skills: List[str]
    matched_skills: List[str]

class ResumeAnalysisResponse(BaseModel):
    extracted_skills: List[str]
    skill_analysis: List[ResumeSkill]
    job_matches: List[JobMatch]
    recommendations: List[str]
    overall_score: float

