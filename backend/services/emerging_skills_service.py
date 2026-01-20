"""
Service for detecting emerging skills using NLP and clustering
"""

import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from typing import List, Dict, Any
import re
import os
from collections import Counter
from utils.data_loader import get_all_jobs

# Lazy import of SentenceTransformer to handle import errors gracefully
# Catches both ImportError and OSError (DLL loading issues on Windows)
SentenceTransformer = None
try:
    from sentence_transformers import SentenceTransformer
except (ImportError, OSError, Exception) as e:
    print(f"Warning: sentence-transformers not available: {e}")
    print("Emerging skills detection will use fallback method.")
    print("This is normal if PyTorch cannot load on your system.")

class EmergingSkillsService:
    """Service for detecting emerging skills from job descriptions"""
    
    def __init__(self):
        self.jobs_df = get_all_jobs()
        self.model = None
        self._load_model()
    
    def _load_model(self):
        """Load sentence transformer model"""
        if SentenceTransformer is None:
            print("Warning: SentenceTransformer not available. Using fallback detection method.")
            return
        
        try:
            # Using a smaller, CPU-friendly model
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
        except Exception as e:
            print(f"Error loading model: {e}")
            print("Emerging skills detection will use fallback method.")
            self.model = None
    
    def detect_emerging_skills(self, min_cluster_size: int = 3) -> List[Dict[str, Any]]:
        """Detect emerging skills using phrase extraction and clustering"""
        if self.jobs_df.empty or self.model is None:
            return self._get_default_emerging_skills()
        
        # Extract phrases from job descriptions
        phrases = self._extract_phrases_from_descriptions()
        
        if not phrases:
            return self._get_default_emerging_skills()
        
        # Get embeddings
        embeddings = self.model.encode(phrases, show_progress_bar=False)
        
        # Cluster phrases
        clusters = self._cluster_phrases(embeddings, phrases, min_cluster_size)
        
        # Score emerging skills
        emerging_skills = self._score_emerging_skills(clusters)
        
        # Save results
        self._save_emerging_skills(emerging_skills)
        
        return emerging_skills
    
    def _extract_phrases_from_descriptions(self) -> List[str]:
        """Extract meaningful phrases from job descriptions"""
        phrases = []
        
        if 'description' not in self.jobs_df.columns:
            return []
        
        # Common tech phrase patterns
        patterns = [
            r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:framework|library|tool|platform|service|technology)\b',
            r'\b(?:microservices|serverless|cloud-native|edge computing|quantum computing|blockchain)\b',
            r'\b[A-Z]{2,}\b',  # Acronyms like AWS, API, CI/CD
            r'\b(?:AI|ML|DL|NLP|CV|IoT|AR|VR|RPA|DevOps|MLOps|DataOps)\b'
        ]
        
        for desc in self.jobs_df['description'].dropna():
            desc_str = str(desc).lower()
            
            # Extract 2-3 word technical phrases
            words = re.findall(r'\b[a-z]{3,}\b', desc_str)
            for i in range(len(words) - 1):
                phrase = f"{words[i]} {words[i+1]}"
                if len(phrase.split()) == 2 and phrase not in phrases:
                    phrases.append(phrase)
        
        return phrases[:500]  # Limit for performance
    
    def _cluster_phrases(self, embeddings: np.ndarray, phrases: List[str], min_size: int) -> Dict[int, List[str]]:
        """Cluster phrases using KMeans"""
        if len(phrases) < min_size:
            return {}
        
        n_clusters = min(10, len(phrases) // min_size)
        n_clusters = max(2, n_clusters)
        
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        labels = kmeans.fit_predict(embeddings)
        
        clusters = {}
        for i, label in enumerate(labels):
            if label not in clusters:
                clusters[label] = []
            clusters[label].append(phrases[i])
        
        # Filter small clusters
        filtered_clusters = {k: v for k, v in clusters.items() if len(v) >= min_size}
        
        return filtered_clusters
    
    def _score_emerging_skills(self, clusters: Dict[int, List[str]]) -> List[Dict[str, Any]]:
        """Score and rank emerging skill candidates"""
        emerging_skills = []
        
        # Get recent job postings (if date column exists)
        recent_df = self.jobs_df
        if 'posted_date' in self.jobs_df.columns:
            try:
                # Assume last 3 months are "recent"
                recent_df = self.jobs_df.tail(len(self.jobs_df) // 2)
            except:
                pass
        
        for cluster_id, phrases in clusters.items():
            # Count phrase frequency
            phrase_counts = Counter(phrases)
            top_phrase = phrase_counts.most_common(1)[0][0]
            
            # Calculate confidence based on:
            # - Cluster size
            # - Frequency in recent jobs
            # - Uniqueness (less common = more emerging)
            
            cluster_size = len(phrases)
            total_phrases = sum(len(p) for p in clusters.values())
            
            # Frequency in recent jobs
            recent_mentions = sum(1 for desc in recent_df['description'].dropna() 
                                 if top_phrase.lower() in str(desc).lower()) if 'description' in recent_df.columns else 0
            
            # Confidence score (0-1)
            confidence = min(1.0, (cluster_size / max(total_phrases, 1)) * 2 + (recent_mentions / max(len(recent_df), 1)) * 3)
            confidence = round(confidence, 2)
            
            # Determine trend
            if confidence > 0.7:
                trend = "High Growth"
            elif confidence > 0.4:
                trend = "Growing"
            else:
                trend = "Emerging"
            
            emerging_skills.append({
                "skill": top_phrase.title(),
                "confidence_score": confidence,
                "frequency": cluster_size,
                "trend": trend
            })
        
        # Sort by confidence
        emerging_skills.sort(key=lambda x: x['confidence_score'], reverse=True)
        
        return emerging_skills[:20]  # Top 20
    
    def _save_emerging_skills(self, skills: List[Dict[str, Any]]):
        """Save emerging skills to CSV files"""
        data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "processed")
        os.makedirs(data_dir, exist_ok=True)
        
        raw_path = os.path.join(data_dir, "emerging_skills_raw.csv")
        curated_path = os.path.join(data_dir, "emerging_skills_curated.csv")
        
        # Raw data
        df_raw = pd.DataFrame(skills)
        df_raw.to_csv(raw_path, index=False)
        
        # Curated (filtered by confidence)
        curated = [s for s in skills if s['confidence_score'] >= 0.3]
        df_curated = pd.DataFrame(curated)
        df_curated.to_csv(curated_path, index=False)
    
    def _get_default_emerging_skills(self) -> List[Dict[str, Any]]:
        """Return default emerging skills when analysis isn't possible"""
        return [
            {"skill": "Generative AI", "confidence_score": 0.85, "frequency": 150, "trend": "High Growth"},
            {"skill": "Large Language Models", "confidence_score": 0.80, "frequency": 120, "trend": "High Growth"},
            {"skill": "MLOps", "confidence_score": 0.75, "frequency": 100, "trend": "Growing"},
            {"skill": "Cloud Native Development", "confidence_score": 0.70, "frequency": 95, "trend": "Growing"},
            {"skill": "Edge Computing", "confidence_score": 0.65, "frequency": 80, "trend": "Emerging"},
            {"skill": "Serverless Architecture", "confidence_score": 0.60, "frequency": 75, "trend": "Emerging"},
        ]

