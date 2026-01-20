/**
 * API service for communicating with backend
 */

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API methods
export const apiService = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/health')
    return response.data
  },

  // V1 - Analytics
  getTopSkills: async (limit = 20) => {
    const response = await api.get(`/v1/skills/top?limit=${limit}`)
    return response.data
  },

  getSkillsByLocation: async (limitPerLocation = 10) => {
    const response = await api.get(`/v1/skills/by-location?limit_per_location=${limitPerLocation}`)
    return response.data
  },

  forecastSkillDemand: async (skill, months = 6) => {
    const response = await api.get(`/v1/skills/forecast?skill=${encodeURIComponent(skill)}&months=${months}`)
    return response.data
  },

  // V2 - Emerging Skills
  getEmergingSkills: async (minClusterSize = 3) => {
    const response = await api.get(`/v2/skills/emerging?min_cluster_size=${minClusterSize}`)
    return response.data
  },

  // V2 - Roadmap
  getSkillRoadmap: async (skill) => {
    const response = await api.get(`/v2/skill/roadmap?skill=${encodeURIComponent(skill)}`)
    return response.data
  },

  // Resume Analysis
  analyzeResume: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}

export default apiService

