"""
Service for generating skill learning roadmaps
"""

from typing import Dict, Any, List
import random

class RoadmapService:
    """Service for generating skill learning roadmaps"""
    
    # Predefined roadmaps for popular skills
    ROADMAPS = {
        "python": {
            "learning_stages": [
                {"stage": "Beginner", "hours": 40, "topics": ["Syntax basics", "Variables & data types", "Control flow", "Functions", "File I/O"]},
                {"stage": "Intermediate", "hours": 60, "topics": ["OOP", "Modules & packages", "Exception handling", "List comprehensions", "Decorators"]},
                {"stage": "Advanced", "hours": 80, "topics": ["Async programming", "Design patterns", "Meta-programming", "Performance optimization", "Testing frameworks"]}
            ],
            "resources": [
                {"title": "Python Official Documentation", "type": "Documentation", "url": "https://docs.python.org/3/", "description": "Comprehensive official Python docs"},
                {"title": "Python Crash Course", "type": "YouTube", "url": "https://www.youtube.com/results?search_query=python+crash+course", "description": "Beginner-friendly YouTube tutorials"},
                {"title": "Real Python Tutorials", "type": "Documentation", "url": "https://realpython.com/", "description": "In-depth Python tutorials and articles"},
                {"title": "Python Projects on GitHub", "type": "GitHub", "url": "https://github.com/topics/python", "description": "Open source Python projects to study"}
            ],
            "projects": [
                {"title": "To-Do List CLI App", "description": "Build a command-line to-do list application", "difficulty": "Beginner"},
                {"title": "Web Scraper", "description": "Scrape data from websites using BeautifulSoup", "difficulty": "Intermediate"},
                {"title": "REST API with Flask/FastAPI", "description": "Create a RESTful API for a web service", "difficulty": "Intermediate"},
                {"title": "Data Analysis Dashboard", "description": "Build a dashboard using Pandas and Matplotlib", "difficulty": "Advanced"},
                {"title": "Machine Learning Model", "description": "Train and deploy an ML model", "difficulty": "Advanced"}
            ],
            "career_paths": [
                {"role": "Python Developer", "description": "Backend development using Python frameworks", "required_skills": ["Python", "Django/Flask", "SQL", "Git"]},
                {"role": "Data Scientist", "description": "Analyze data and build predictive models", "required_skills": ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"]},
                {"role": "DevOps Engineer", "description": "Automate infrastructure and deployment", "required_skills": ["Python", "Docker", "Kubernetes", "CI/CD"]}
            ]
        },
        "javascript": {
            "learning_stages": [
                {"stage": "Beginner", "hours": 50, "topics": ["Variables & data types", "Functions", "DOM manipulation", "Events", "Basic ES6"]},
                {"stage": "Intermediate", "hours": 70, "topics": ["Async/await", "Promises", "Closures", "Prototypes", "Modules"]},
                {"stage": "Advanced", "hours": 90, "topics": ["Design patterns", "Performance optimization", "Testing", "TypeScript", "Web Workers"]}
            ],
            "resources": [
                {"title": "MDN JavaScript Guide", "type": "Documentation", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "description": "Mozilla's comprehensive JS documentation"},
                {"title": "JavaScript.info", "type": "Documentation", "url": "https://javascript.info/", "description": "Modern JavaScript tutorial"},
                {"title": "JavaScript Crash Course", "type": "YouTube", "url": "https://www.youtube.com/results?search_query=javascript+crash+course", "description": "Video tutorials for quick learning"},
                {"title": "Awesome JavaScript", "type": "GitHub", "url": "https://github.com/sorrycc/awesome-javascript", "description": "Curated list of JS resources"}
            ],
            "projects": [
                {"title": "Interactive Calculator", "description": "Build a web-based calculator", "difficulty": "Beginner"},
                {"title": "Weather App", "description": "Fetch and display weather data from API", "difficulty": "Intermediate"},
                {"title": "Todo App with Local Storage", "description": "CRUD app with persistence", "difficulty": "Intermediate"},
                {"title": "SPA with React/Vue", "description": "Single-page application framework", "difficulty": "Advanced"},
                {"title": "Real-time Chat App", "description": "WebSocket-based chat application", "difficulty": "Advanced"}
            ],
            "career_paths": [
                {"role": "Frontend Developer", "description": "Build user interfaces and web applications", "required_skills": ["JavaScript", "React/Vue", "HTML/CSS", "Git"]},
                {"role": "Full Stack Developer", "description": "Work on both frontend and backend", "required_skills": ["JavaScript", "Node.js", "React", "MongoDB", "REST APIs"]},
                {"role": "React Developer", "description": "Specialize in React ecosystem", "required_skills": ["JavaScript", "React", "Redux", "TypeScript", "Testing"]}
            ]
        },
        "react": {
            "learning_stages": [
                {"stage": "Beginner", "hours": 40, "topics": ["Components", "Props & State", "JSX", "Event handling", "Conditional rendering"]},
                {"stage": "Intermediate", "hours": 60, "topics": ["Hooks", "Context API", "Routing", "Form handling", "API integration"]},
                {"stage": "Advanced", "hours": 80, "topics": ["State management (Redux)", "Performance optimization", "Testing", "Server-side rendering", "Next.js"]}
            ],
            "resources": [
                {"title": "React Official Docs", "type": "Documentation", "url": "https://react.dev/", "description": "Official React documentation"},
                {"title": "React Tutorial", "type": "YouTube", "url": "https://www.youtube.com/results?search_query=react+tutorial", "description": "Video tutorials for React"},
                {"title": "React Router Docs", "type": "Documentation", "url": "https://reactrouter.com/", "description": "Routing in React applications"},
                {"title": "React Examples", "type": "GitHub", "url": "https://github.com/enaqx/awesome-react", "description": "Curated React resources"}
            ],
            "projects": [
                {"title": "Todo List App", "description": "Basic CRUD application", "difficulty": "Beginner"},
                {"title": "Weather Dashboard", "description": "Display weather with API integration", "difficulty": "Intermediate"},
                {"title": "E-commerce Product Page", "description": "Product listing with filters", "difficulty": "Intermediate"},
                {"title": "Social Media Clone", "description": "Build a Twitter/Facebook-like app", "difficulty": "Advanced"},
                {"title": "Admin Dashboard", "description": "Full-featured admin panel with charts", "difficulty": "Advanced"}
            ],
            "career_paths": [
                {"role": "React Developer", "description": "Build React-based applications", "required_skills": ["React", "JavaScript", "HTML/CSS", "Git"]},
                {"role": "Frontend Engineer", "description": "Design and implement UI/UX", "required_skills": ["React", "TypeScript", "Redux", "Testing"]},
                {"role": "Full Stack Developer", "description": "React + Backend integration", "required_skills": ["React", "Node.js", "REST APIs", "Database"]}
            ]
        }
    }
    
    def generate_roadmap(self, skill: str) -> Dict[str, Any]:
        """Generate learning roadmap for a skill"""
        skill_lower = skill.lower()
        
        # Check if predefined roadmap exists
        if skill_lower in self.ROADMAPS:
            roadmap_data = self.ROADMAPS[skill_lower].copy()
            roadmap_data["skill"] = skill
            roadmap_data["total_hours"] = sum(stage["hours"] for stage in roadmap_data["learning_stages"])
            return roadmap_data
        
        # Generate generic roadmap
        return self._generate_generic_roadmap(skill)
    
    def _generate_generic_roadmap(self, skill: str) -> Dict[str, Any]:
        """Generate a generic roadmap for any skill"""
        return {
            "skill": skill,
            "learning_stages": [
                {
                    "stage": "Beginner",
                    "hours": 40,
                    "topics": [
                        "Fundamentals and basics",
                        "Core concepts",
                        "Getting started tutorials",
                        "Basic syntax and usage",
                        "Simple examples"
                    ]
                },
                {
                    "stage": "Intermediate",
                    "hours": 60,
                    "topics": [
                        "Advanced concepts",
                        "Best practices",
                        "Common patterns",
                        "Integration with other tools",
                        "Real-world applications"
                    ]
                },
                {
                    "stage": "Advanced",
                    "hours": 80,
                    "topics": [
                        "Expert-level techniques",
                        "Performance optimization",
                        "Architecture patterns",
                        "Advanced use cases",
                        "Contributing to community"
                    ]
                }
            ],
            "resources": [
                {
                    "title": f"{skill} Official Documentation",
                    "type": "Documentation",
                    "url": f"https://www.google.com/search?q={skill}+documentation",
                    "description": "Official documentation and guides"
                },
                {
                    "title": f"{skill} Tutorial Videos",
                    "type": "YouTube",
                    "url": f"https://www.youtube.com/results?search_query={skill}+tutorial",
                    "description": "Video tutorials and courses"
                },
                {
                    "title": f"{skill} GitHub Projects",
                    "type": "GitHub",
                    "url": f"https://github.com/topics/{skill.lower()}",
                    "description": "Open source projects and examples"
                }
            ],
            "projects": [
                {
                    "title": f"Basic {skill} Project",
                    "description": "Start with a simple project to learn fundamentals",
                    "difficulty": "Beginner"
                },
                {
                    "title": f"Intermediate {skill} Application",
                    "description": "Build a real-world application using intermediate concepts",
                    "difficulty": "Intermediate"
                },
                {
                    "title": f"Advanced {skill} System",
                    "description": "Create a complex system showcasing advanced features",
                    "difficulty": "Advanced"
                }
            ],
            "career_paths": [
                {
                    "role": f"{skill} Developer",
                    "description": f"Specialize in {skill} development",
                    "required_skills": [skill, "Related technologies", "Best practices"]
                }
            ],
            "total_hours": 180
        }

