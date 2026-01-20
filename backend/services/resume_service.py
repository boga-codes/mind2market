"""
Service for analyzing resumes and matching with job requirements
"""

import re
from typing import List, Dict, Any
from collections import Counter
import PyPDF2
import docx
from io import BytesIO

class ResumeAnalysisService:
    """Service for analyzing resumes and matching skills"""
    
    def __init__(self):
        # Common tech skills dictionary
        self.all_skills = [
            "python", "java", "javascript", "react", "node.js", "sql", "aws", "docker",
            "kubernetes", "git", "html", "css", "typescript", "angular", "vue",
            "mongodb", "postgresql", "mysql", "redis", "elasticsearch", "kafka",
            "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
            "data science", "big data", "spark", "hadoop", "tableau", "power bi",
            "agile", "scrum", "ci/cd", "jenkins", "terraform", "ansible", "linux",
            "azure", "gcp", "microservices", "rest api", "graphql", "redux", "webpack",
            "next.js", "django", "flask", "spring", "express", "fastapi", "laravel",
            "flutter", "react native", "swift", "kotlin", "go", "rust", "c++", "c#",
            "php", "ruby", "rails", "nosql", "graphql", "jquery", "bootstrap", "tailwind"
        ]
    
    def analyze_resume(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        """Analyze resume file and extract skills"""
        # Extract text from file
        text = self._extract_text_from_file(file_content, filename)
        
        if not text:
            return {
                "extracted_skills": [],
                "skill_analysis": [],
                "job_matches": [],
                "recommendations": ["Unable to extract text from resume. Please ensure the file is a valid PDF or DOCX."],
                "overall_score": 0.0
            }
        
        # Extract skills from text
        extracted_skills = self._extract_skills_from_text(text)
        
        # Analyze skills
        skill_analysis = self._analyze_skills(extracted_skills)
        
        # Match with job roles
        job_matches = self._match_with_jobs(extracted_skills)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(extracted_skills, job_matches)
        
        # Calculate overall score
        overall_score = self._calculate_overall_score(job_matches)
        
        return {
            "extracted_skills": extracted_skills,
            "skill_analysis": skill_analysis,
            "job_matches": job_matches,
            "recommendations": recommendations,
            "overall_score": round(overall_score, 2)
        }
    
    def _extract_text_from_file(self, file_content: bytes, filename: str) -> str:
        """Extract text from PDF or DOCX file"""
        text = ""
        
        try:
            if filename.lower().endswith('.pdf'):
                pdf_reader = PyPDF2.PdfReader(BytesIO(file_content))
                text = "\n".join([page.extract_text() for page in pdf_reader.pages])
            elif filename.lower().endswith('.docx'):
                doc = docx.Document(BytesIO(file_content))
                text = "\n".join([para.text for para in doc.paragraphs])
            else:
                text = file_content.decode('utf-8', errors='ignore')
        except Exception as e:
            print(f"Error extracting text: {e}")
            return ""
        
        return text.lower()
    
    def _extract_skills_from_text(self, text: str) -> List[str]:
        """Extract skills from resume text"""
        found_skills = []
        text_lower = text.lower()
        
        for skill in self.all_skills:
            if skill.lower() in text_lower:
                found_skills.append(skill.title())
        
        return list(set(found_skills))  # Remove duplicates
    
    def _analyze_skills(self, extracted_skills: List[str]) -> List[Dict[str, Any]]:
        """Analyze extracted skills"""
        analysis = []
        
        for skill in self.all_skills:
            found = skill.title() in extracted_skills
            relevance = 1.0 if found else 0.0
            
            analysis.append({
                "skill": skill.title(),
                "found": found,
                "relevance": relevance
            })
        
        # Sort by found first, then by skill name
        analysis.sort(key=lambda x: (not x['found'], x['skill']))
        
        return analysis[:50]  # Return top 50 most relevant
    
    def _match_with_jobs(self, skills: List[str]) -> List[Dict[str, Any]]:
        """Match resume skills with job roles"""
        # Job role requirements (simplified)
        job_requirements = {
            "Software Engineer": ["python", "javascript", "git", "sql", "react"],
            "Data Scientist": ["python", "machine learning", "sql", "pandas", "scikit-learn"],
            "DevOps Engineer": ["docker", "kubernetes", "aws", "ci/cd", "linux"],
            "Frontend Developer": ["javascript", "react", "html", "css", "typescript"],
            "Backend Developer": ["python", "node.js", "sql", "rest api", "docker"],
            "Full Stack Developer": ["javascript", "react", "node.js", "sql", "git"],
            "Machine Learning Engineer": ["python", "machine learning", "tensorflow", "pytorch", "sql"],
            "Cloud Engineer": ["aws", "docker", "kubernetes", "terraform", "linux"]
        }
        
        job_matches = []
        skills_lower = [s.lower() for s in skills]
        
        for role, required_skills in job_requirements.items():
            matched_skills = [s for s in required_skills if s in skills_lower]
            missing_skills = [s for s in required_skills if s not in skills_lower]
            
            match_score = len(matched_skills) / len(required_skills) * 100 if required_skills else 0
            
            job_matches.append({
                "role": role,
                "match_score": round(match_score, 2),
                "missing_skills": [s.title() for s in missing_skills],
                "matched_skills": [s.title() for s in matched_skills]
            })
        
        # Sort by match score
        job_matches.sort(key=lambda x: x['match_score'], reverse=True)
        
        return job_matches
    
    def _generate_recommendations(self, skills: List[str], job_matches: List[Dict[str, Any]]) -> List[str]:
        """Generate personalized recommendations"""
        recommendations = []
        
        if not skills:
            recommendations.append("No skills detected in resume. Ensure skills are clearly listed in your resume.")
            return recommendations
        
        top_match = job_matches[0] if job_matches else None
        
        if top_match and top_match['match_score'] >= 80:
            recommendations.append(f"Great! Your resume strongly matches {top_match['role']} positions.")
        elif top_match and top_match['match_score'] >= 60:
            recommendations.append(f"Your resume aligns well with {top_match['role']} roles. Consider adding: {', '.join(top_match['missing_skills'][:3])}")
        else:
            recommendations.append("Consider adding more technical skills to improve job match scores.")
        
        if top_match and top_match['missing_skills']:
            recommendations.append(f"To improve your match for {top_match['role']}, focus on: {', '.join(top_match['missing_skills'][:3])}")
        
        if len(skills) < 5:
            recommendations.append("Consider adding more diverse technical skills to increase job opportunities.")
        
        # Skill-specific recommendations
        if not any("python" in s.lower() or "javascript" in s.lower() for s in skills):
            recommendations.append("Adding Python or JavaScript would significantly expand your job opportunities.")
        
        return recommendations
    
    def _calculate_overall_score(self, job_matches: List[Dict[str, Any]]) -> float:
        """Calculate overall resume score"""
        if not job_matches:
            return 0.0
        
        # Average of top 3 job match scores
        top_scores = [m['match_score'] for m in job_matches[:3]]
        avg_score = sum(top_scores) / len(top_scores) if top_scores else 0.0
        
        return avg_score

