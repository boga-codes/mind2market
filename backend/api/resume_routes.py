"""
API routes for resume analysis
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from services.resume_service import ResumeAnalysisService
from models.schemas import ResumeAnalysisResponse

router = APIRouter()
resume_service = ResumeAnalysisService()

@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Analyze resume and match with job requirements
    
    Accepts PDF or DOCX files. Returns:
    - Extracted skills
    - Skill analysis
    - Job matches with scores
    - Personalized recommendations
    - Overall match score
    """
    try:
        # Validate file type
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        if not (file.filename.lower().endswith('.pdf') or 
                file.filename.lower().endswith('.docx') or
                file.filename.lower().endswith('.txt')):
            raise HTTPException(
                status_code=400, 
                detail="Invalid file type. Please upload a PDF, DOCX, or TXT file."
            )
        
        # Read file content
        file_content = await file.read()
        
        if len(file_content) == 0:
            raise HTTPException(status_code=400, detail="File is empty")
        
        # Analyze resume
        analysis = resume_service.analyze_resume(file_content, file.filename)
        
        return analysis
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing resume: {str(e)}")

