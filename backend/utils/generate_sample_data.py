"""
Script to generate sample job data for development
"""

import pandas as pd
import sqlite3
import os
from datetime import datetime, timedelta
import random

# Sample data - Expanded global locations
LOCATIONS = [
    # North America
    "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Boston, MA", "Toronto, Canada",
    "Vancouver, Canada", "Chicago, IL", "Remote (US)",
    # Europe
    "London, UK", "Berlin, Germany", "Amsterdam, Netherlands", "Paris, France", "Dublin, Ireland",
    "Stockholm, Sweden", "Remote (Europe)",
    # Asia Pacific
    "Bangalore, India", "Mumbai, India", "Delhi, India", "Hyderabad, India", "Singapore",
    "Sydney, Australia", "Melbourne, Australia", "Tokyo, Japan", "Remote (APAC)",
    # Middle East
    "Dubai, UAE", "Tel Aviv, Israel", "Remote (MENA)"
]
ROLES = ["Software Engineer", "Data Scientist", "DevOps Engineer", "Frontend Developer", "Backend Developer", "ML Engineer"]
SKILLS_SETS = {
    "Software Engineer": ["Python", "JavaScript", "React", "SQL", "Git", "AWS"],
    "Data Scientist": ["Python", "Machine Learning", "SQL", "Pandas", "Scikit-learn", "TensorFlow"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform"],
    "Frontend Developer": ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Git"],
    "Backend Developer": ["Python", "Node.js", "SQL", "REST API", "Docker", "PostgreSQL"],
    "ML Engineer": ["Python", "Machine Learning", "TensorFlow", "PyTorch", "SQL", "AWS"]
}

def generate_sample_jobs(n=100):
    """Generate sample job postings"""
    jobs = []
    base_date = datetime.now() - timedelta(days=180)
    
    for i in range(n):
        role = random.choice(ROLES)
        location = random.choice(LOCATIONS)
        skills_list = SKILLS_SETS.get(role, SKILLS_SETS["Software Engineer"])
        
        # Add some random skills
        all_skills = skills_list + random.sample([
            "Docker", "Git", "SQL", "AWS", "JavaScript", "Python", "React", 
            "MongoDB", "PostgreSQL", "CI/CD", "Linux", "HTML", "CSS"
        ], random.randint(2, 5))
        
        posted_date = base_date + timedelta(days=random.randint(0, 180))
        
        job = {
            "id": i + 1,
            "title": role,
            "company": f"Company {random.randint(1, 50)}",
            "location": location,
            "skills": ", ".join(all_skills[:6]),
            "description": f"We are looking for a {role} with experience in {', '.join(all_skills[:3])}. Strong background in software development required.",
            "posted_date": posted_date.strftime("%Y-%m-%d"),
            "salary_min": random.randint(80, 150) * 1000,
            "salary_max": random.randint(150, 250) * 1000
        }
        jobs.append(job)
    
    return jobs

def create_database():
    """Create SQLite database with sample data"""
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
    os.makedirs(data_dir, exist_ok=True)
    
    db_path = os.path.join(data_dir, "jobs.db")
    conn = sqlite3.connect(db_path)
    
    # Create table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY,
            title TEXT,
            company TEXT,
            location TEXT,
            skills TEXT,
            description TEXT,
            posted_date TEXT,
            salary_min INTEGER,
            salary_max INTEGER
        )
    """)
    
    # Generate and insert sample data
    jobs = generate_sample_jobs(100)
    df = pd.DataFrame(jobs)
    df.to_sql("jobs", conn, if_exists="replace", index=False)
    
    conn.close()
    print(f"Database created at {db_path}")

def create_csv():
    """Create CSV file with sample data"""
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "processed")
    os.makedirs(data_dir, exist_ok=True)
    
    csv_path = os.path.join(data_dir, "clean_jobs.csv")
    jobs = generate_sample_jobs(100)
    df = pd.DataFrame(jobs)
    df.to_csv(csv_path, index=False)
    print(f"CSV created at {csv_path}")

if __name__ == "__main__":
    print("Generating sample data...")
    create_database()
    create_csv()
    print("Sample data generation complete!")

