import React, { useState } from 'react'
import apiService from '../services/api'
import { Loader2, BookOpen, Briefcase, Target, Clock, ExternalLink } from 'lucide-react'
import SkillAutocomplete from '../components/SkillAutocomplete'
import ScrollToTop from '../components/ScrollToTop'

function RoadmapPage() {
  const [skill, setSkill] = useState('Python')
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedStage, setExpandedStage] = useState(null)

  const handleGenerateRoadmap = async () => {
    if (!skill) return

    setLoading(true)
    setError(null)
    
    // Scroll to top when generating
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      const data = await apiService.getSkillRoadmap(skill)
      setRoadmap(data)
      setExpandedStage(0) // Expand first stage by default
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.')
      console.error('Roadmap error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Beginner') return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    if (difficulty === 'Intermediate') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Skill Learning Roadmap</h1>

        {/* Suggested Skills */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {['Python', 'Java', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'Machine Learning', 'SQL', 'TypeScript', 'Angular', 'Vue.js'].map((suggestedSkill) => (
              <button
                key={suggestedSkill}
                onClick={() => {
                  setSkill(suggestedSkill)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium btn-animated water-effect ${
                  skill === suggestedSkill
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg scale-105 pulse-glow'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-900/30 dark:hover:to-primary-800/30 hover:text-primary-700 dark:hover:text-primary-300'
                }`}
              >
                {suggestedSkill}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="card water-effect mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Generate Learning Roadmap</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Skill:
              </label>
              <SkillAutocomplete
                value={skill}
                onChange={setSkill}
                placeholder="Enter skill name"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleGenerateRoadmap}
                disabled={loading || !skill}
                className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Generating...
                  </span>
                ) : (
                  'Generate Roadmap'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card mb-8 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Roadmap Results */}
        {roadmap && (
          <>
            {/* Summary Card */}
            <div className="card mb-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800 water-effect shine-effect">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {roadmap.skill} Learning Roadmap
                  </h2>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span>Total: {roadmap.total_hours} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={20} />
                      <span>{roadmap.learning_stages?.length || 0} stages</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Stages */}
            <div className="card water-effect mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen size={28} className="text-primary-600" />
                Learning Stages
              </h3>
              <div className="space-y-4">
                {roadmap.learning_stages?.map((stage, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedStage(expandedStage === index ? null : index)}
                      className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 flex items-center justify-between transition-all duration-200 water-effect rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-primary-600">{index + 1}</span>
                        <div className="text-left">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{stage.stage}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stage.hours} hours</p>
                        </div>
                      </div>
                      <span className="text-gray-500">{expandedStage === index ? '−' : '+'}</span>
                    </button>
                    {expandedStage === index && (
                      <div className="px-6 py-4 bg-white dark:bg-gray-900">
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                          {stage.topics?.map((topic, topicIndex) => (
                            <li key={topicIndex}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="card water-effect mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Learning Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmap.resources?.map((resource, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg water-effect shine-effect bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${
                        resource.type === 'YouTube' ? 'bg-red-100 dark:bg-red-900/30 text-red-800' :
                        resource.type === 'Documentation' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800'
                      }`}>
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{resource.description}</p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 text-sm"
                    >
                      Visit <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="card water-effect mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Briefcase size={28} className="text-primary-600" />
                Hands-on Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roadmap.projects?.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg water-effect shine-effect bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Paths */}
            <div className="card water-effect">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Career Paths</h3>
              <div className="space-y-4">
                {roadmap.career_paths?.map((path, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg water-effect shine-effect bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{path.role}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{path.description}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {path.required_skills?.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

export default RoadmapPage

