"""
Utility functions for loading and processing job data
"""

import pandas as pd
import sqlite3
import os
from typing import List, Dict, Any

# Paths to data files
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
JOBS_DB_PATH = os.path.join(DATA_DIR, "jobs.db")
CLEAN_JOBS_CSV = os.path.join(DATA_DIR, "processed", "clean_jobs.csv")

def get_db_connection():
    """Create SQLite database connection"""
    if not os.path.exists(JOBS_DB_PATH):
        return None
    return sqlite3.connect(JOBS_DB_PATH)

def load_clean_jobs() -> pd.DataFrame:
    """Load clean jobs data from CSV"""
    if not os.path.exists(CLEAN_JOBS_CSV):
        return pd.DataFrame()
    
    try:
        df = pd.read_csv(CLEAN_JOBS_CSV)
        return df
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return pd.DataFrame()

def load_jobs_from_db() -> pd.DataFrame:
    """Load jobs from SQLite database"""
    conn = get_db_connection()
    if conn is None:
        return pd.DataFrame()
    
    try:
        query = "SELECT * FROM jobs"
        df = pd.read_sql_query(query, conn)
        conn.close()
        return df
    except Exception as e:
        print(f"Error loading from DB: {e}")
        if conn:
            conn.close()
        return pd.DataFrame()

def get_all_jobs() -> pd.DataFrame:
    """Get all jobs data, preferring CSV over DB"""
    df = load_clean_jobs()
    if df.empty:
        df = load_jobs_from_db()
    return df

def extract_skills_from_description(description: str) -> List[str]:
    """Extract skills from job description text"""
    if pd.isna(description):
        return []
    
    # Common tech skills keywords
    skill_keywords = [
        "python", "java", "javascript", "react", "node", "sql", "aws", "docker",
        "kubernetes", "git", "html", "css", "typescript", "angular", "vue",
        "mongodb", "postgresql", "mysql", "redis", "elasticsearch", "kafka",
        "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
        "data science", "big data", "spark", "hadoop", "tableau", "power bi",
        "agile", "scrum", "ci/cd", "jenkins", "terraform", "ansible", "linux",
        "azure", "gcp", "microservices", "rest api", "graphql", "redux", "webpack"
    ]
    
    description_lower = description.lower()
    found_skills = []
    
    for skill in skill_keywords:
        if skill in description_lower:
            found_skills.append(skill.title())
    
    return list(set(found_skills))

