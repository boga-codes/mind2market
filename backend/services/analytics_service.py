"""
Analytics service for job market data analysis
"""

import pandas as pd
from typing import List, Dict, Any, Optional
from collections import Counter
from utils.data_loader import get_all_jobs

class AnalyticsService:
    """Service for analyzing job market data"""
    
    def __init__(self):
        self.jobs_df = get_all_jobs()
    
    def get_top_skills(self, limit: int = 20) -> List[Dict[str, Any]]:
        """Get top skills by frequency"""
        if self.jobs_df.empty:
            return self._get_default_skills(limit)
        
        all_skills = []
        
        # Extract skills from various columns
        if 'skills' in self.jobs_df.columns:
            for skills_str in self.jobs_df['skills'].dropna():
                if isinstance(skills_str, str):
                    skills = [s.strip() for s in skills_str.split(',')]
                    all_skills.extend(skills)
        
        if 'description' in self.jobs_df.columns:
            from utils.data_loader import extract_skills_from_description
            for desc in self.jobs_df['description'].dropna():
                skills = extract_skills_from_description(str(desc))
                all_skills.extend(skills)
        
        # Count skills
        skill_counts = Counter(all_skills)
        total = sum(skill_counts.values())
        
        top_skills = []
        for skill, count in skill_counts.most_common(limit):
            top_skills.append({
                "skill": skill,
                "count": count,
                "percentage": round((count / total * 100) if total > 0 else 0, 2)
            })
        
        return top_skills if top_skills else self._get_default_skills(limit)
    
    def get_skills_by_location(self, limit_per_location: int = 10) -> List[Dict[str, Any]]:
        """Get skills grouped by location"""
        if self.jobs_df.empty:
            return []
        
        location_skills = []
        
        if 'location' in self.jobs_df.columns:
            locations = self.jobs_df['location'].dropna().unique()
            
            for location in locations:
                location_df = self.jobs_df[self.jobs_df['location'] == location]
                skills = []
                
                for skills_str in location_df['skills'].dropna() if 'skills' in location_df.columns else []:
                    if isinstance(skills_str, str):
                        skills.extend([s.strip() for s in skills_str.split(',')])
                
                skill_counts = Counter(skills)
                top_skills = [
                    {"skill": skill, "count": count, "percentage": round(count / len(skills) * 100 if skills else 0, 2)}
                    for skill, count in skill_counts.most_common(limit_per_location)
                ]
                
                location_skills.append({
                    "location": str(location),
                    "skills": top_skills
                })
        
        return location_skills if location_skills else []
    
    def get_role_skill_distribution(self, role: Optional[str] = None) -> Dict[str, Any]:
        """Get skill distribution by role"""
        if self.jobs_df.empty:
            return {"roles": [], "skills": {}}
        
        df = self.jobs_df
        if role and 'title' in df.columns:
            df = df[df['title'].str.contains(role, case=False, na=False)]
        
        # Group by role/title and extract skills
        role_skills = {}
        
        if 'title' in df.columns:
            for _, row in df.iterrows():
                job_title = str(row.get('title', 'Unknown'))
                skills = []
                
                if 'skills' in row and pd.notna(row['skills']):
                    skills.extend([s.strip() for s in str(row['skills']).split(',')])
                
                if job_title not in role_skills:
                    role_skills[job_title] = []
                role_skills[job_title].extend(skills)
        
        # Convert to format for frontend
        result = {
            "roles": list(role_skills.keys()),
            "skills": {role: dict(Counter(skills)) for role, skills in role_skills.items()}
        }
        
        return result
    
    def _get_default_skills(self, limit: int) -> List[Dict[str, Any]]:
        """Return default skills when no data available"""
        default_skills = [
            "Python", "JavaScript", "Java", "React", "SQL", "AWS", "Docker",
            "Git", "HTML", "CSS", "TypeScript", "Node.js", "MongoDB", "PostgreSQL",
            "Machine Learning", "Data Science", "Linux", "Kubernetes", "CI/CD", "REST API"
        ]
        return [
            {"skill": skill, "count": (limit - i) * 10, "percentage": round((limit - i) * 5, 2)}
            for i, skill in enumerate(default_skills[:limit])
        ]

