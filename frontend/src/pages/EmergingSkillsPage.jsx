import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import { Loader2, TrendingUp, Star } from 'lucide-react'
import ScrollToTop from '../components/ScrollToTop'

function EmergingSkillsPage() {
  const [emergingSkills, setEmergingSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    loadEmergingSkills()
  }, [])

  const loadEmergingSkills = async () => {
    try {
      setLoading(true)
      // Use different minClusterSize based on refresh count to get variety
      const minClusterSize = Math.max(2, 4 - (refreshCount % 3))
      const data = await apiService.getEmergingSkills(minClusterSize)
      
      // If we have skills, shuffle them and take up to 15 for variety
      let skills = data.emerging_skills || []
      if (skills.length > 0) {
        // Shuffle the skills for variety on refresh
        skills = skills.sort(() => Math.random() - 0.5)
        // Take up to 15 skills to show more variety
        skills = skills.slice(0, 15)
      }
      
      setEmergingSkills(skills)
    } catch (err) {
      setError('Failed to load emerging skills. Please try again.')
      console.error('Error loading emerging skills:', err)
    } finally {
      setLoading(false)
    }
  }

  const getConfidenceColor = (score) => {
    if (score >= 0.7) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    if (score >= 0.4) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
  }

  const getTrendColor = (trend) => {
    if (trend === 'High Growth') return 'text-green-600 dark:text-green-400'
    if (trend === 'Growing') return 'text-yellow-600 dark:text-yellow-400'
    return 'text-blue-600 dark:text-blue-400'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Emerging Skills Detection</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Discover emerging skills using NLP and machine learning clustering
        </p>

        {/* Error Message */}
        {error && (
          <div className="card mb-8 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {emergingSkills.map((skill, index) => (
            <div key={index} className="card water-effect shine-effect">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-primary-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{skill.skill}</h3>
                </div>
                {index < 3 && <Star className="text-yellow-500 fill-yellow-500" size={20} />}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Confidence Score</span>
                    <span className="text-sm font-medium">{skill.confidence_score.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getConfidenceColor(skill.confidence_score)}`}
                      style={{ width: `${skill.confidence_score * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Frequency:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.frequency}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Trend:</span>
                  <span className={`text-sm font-medium ${getTrendColor(skill.trend)}`}>
                    {skill.trend}
                  </span>
                </div>

                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor(skill.confidence_score)}`}>
                  {skill.confidence_score >= 0.7 ? 'High Confidence' : 
                   skill.confidence_score >= 0.4 ? 'Medium Confidence' : 'Emerging'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {emergingSkills.length === 0 && !loading && (
          <div className="card text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No emerging skills found. Please try again later.</p>
          </div>
        )}

        {/* Refresh Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setRefreshCount(prev => prev + 1)
              loadEmergingSkills()
            }}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Loading...
              </span>
            ) : (
              'Refresh Skills'
            )}
          </button>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

export default EmergingSkillsPage

