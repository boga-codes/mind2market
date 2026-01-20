import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import apiService from '../services/api'
import { Loader2, Upload, FileText, CheckCircle, XCircle, TrendingUp, Target, Lightbulb } from 'lucide-react'
import ResumeLoadingAnimation from '../components/ResumeLoadingAnimation'
import AIAssistant from '../components/AIAssistant'
import ScrollToTop from '../components/ScrollToTop'

function ResumeAnalyzer() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          selectedFile.name.endsWith('.txt')) {
        setFile(selectedFile)
        setFileName(selectedFile.name)
        setError(null)
      } else {
        setError('Please upload a PDF, DOCX, or TXT file')
        setFile(null)
        setFileName('')
      }
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setLoading(true)
    setError(null)
    setAnalysis(null)

    // Scroll down to show the loading animation
    setTimeout(() => {
      const loadingSection = document.querySelector('.loading-section')
      if (loadingSection) {
        loadingSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 500)

    // Start minimum 8-second loading time
    const startTime = Date.now()
    const minLoadingTime = 8000 // 8 seconds

    try {
      console.log('Starting resume analysis...')
      const analysisPromise = apiService.analyzeResume(file)

      // Wait for both the API call and minimum loading time
      const [data] = await Promise.all([
        analysisPromise,
        new Promise(resolve => setTimeout(resolve, minLoadingTime))
      ])

      // Ensure minimum loading time has passed
      const elapsedTime = Date.now() - startTime
      if (elapsedTime < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime))
      }

      console.log('Analysis completed, data received:', data)
      console.log('Data type:', typeof data)
      console.log('Data keys:', data ? Object.keys(data) : 'null/undefined')
      console.log('Data sample:', data ? JSON.stringify(data).substring(0, 200) + '...' : 'null/undefined')
      
      // Validate data structure
      if (!data || typeof data !== 'object') {
        console.error('Invalid data structure received')
        throw new Error('Invalid response format from server')
      }
      
      if (!data.extracted_skills || !data.job_matches || !data.recommendations || typeof data.overall_score !== 'number') {
        console.error('Missing required fields in response:', {
          hasExtractedSkills: !!data.extracted_skills,
          hasJobMatches: !!data.job_matches,
          hasRecommendations: !!data.recommendations,
          hasOverallScore: typeof data.overall_score === 'number'
        })
        throw new Error('Incomplete response data from server')
      }
      
      setAnalysis(data)
      console.log('Analysis state set successfully')
    } catch (err) {
      console.error('Resume analysis error:', err)
      console.error('Error response:', err.response)
      console.error('Error data:', err.response?.data)
      setError(`Failed to analyze resume: ${err.response?.data?.detail || err.message || 'Unknown error occurred'}`)
      setAnalysis(null) // Clear any previous analysis data
    } finally {
      console.log('Finally block: setting loading to false')
      setLoading(false)
      console.log('Loading set to false, analysis state:', analysis)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-purple-100 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Resume Analyzer
          </motion.h1>
          <motion.p
            className="text-xl text-gray-900 dark:text-cyan-300 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Upload your resume to analyze skills, match with job roles, and get personalized recommendations powered by AI
          </motion.p>
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          className="card mb-8 bg-white dark:bg-gray-800 backdrop-blur-lg border border-gray-300 dark:border-gray-600 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2
            className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Upload Resume
          </motion.h2>

          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <motion.div
                  className="flex items-center gap-6 p-8 border-2 border-dashed border-cyan-400/50 rounded-2xl hover:border-cyan-400 transition-all duration-300 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-500/10 dark:to-purple-500/10 backdrop-blur-sm"
                  whileHover={{
                    borderColor: 'rgb(34, 211, 238)',
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)'
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload size={48} className="text-cyan-400" />
                  </motion.div>
                  <div>
                    {fileName ? (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                  <div className="text-gray-900 dark:text-white font-semibold text-lg">{fileName}</div>
                  <div className="text-cyan-700 dark:text-cyan-300 text-sm">Click to change file</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <p className="text-gray-900 dark:text-white font-semibold text-lg">Click to upload resume</p>
                        <p className="text-cyan-700 dark:text-cyan-300 text-sm">Supports PDF, DOCX, and TXT files</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </label>
            </motion.div>

            <motion.button
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="btn-primary w-full md:w-auto mx-auto block disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-3" size={24} />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FileText className="mr-3" size={24} />
                  Analyze Resume
                </span>
              )}
            </motion.button>

          </div>

          {error && !loading && (
            <motion.div
              className="mt-6 p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Loading Animation */}
        {loading && (
          <div className="card mb-8 bg-gray-100 dark:bg-gray-800 backdrop-blur-lg border border-gray-300 dark:border-gray-600 loading-section">
            <ResumeLoadingAnimation />
          </div>
        )}

        {/* Analysis Results */}
        {analysis && !loading && (
          <motion.div
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-2xl rounded-xl p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {console.log('RENDERING ANALYSIS RESULTS - Analysis exists:', !!analysis, 'Loading:', loading, 'Data keys:', analysis ? Object.keys(analysis) : 'none')}
            <motion.h2
              className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Analysis Results
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Overall Score */}
              <motion.div
                className="bg-white dark:bg-gradient-to-br dark:from-green-900 dark:to-emerald-900 border border-gray-300 dark:border-green-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Overall Score</h3>
                  <TrendingUp className="text-green-600 dark:text-green-400" size={28} />
                </div>
                <div className="text-4xl font-bold text-green-800 dark:text-green-300 mb-2">
                  {analysis?.overall_score ? Math.round(analysis.overall_score) : 0}/100
                </div>
                <div className="w-full bg-green-300 dark:bg-green-800 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis?.overall_score ? analysis.overall_score : 0}%` }}
                    transition={{ delay: 0.8, duration: 1.5 }}
                  />
                </div>
              </motion.div>

              {/* Top Job Match */}
              <motion.div
                className="bg-white dark:bg-gradient-to-br dark:from-blue-900 dark:to-cyan-900 border border-gray-300 dark:border-blue-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Top Job Match</h3>
                  <Target className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <div className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-2">
                  {analysis?.job_matches && analysis.job_matches.length > 0 ? Math.round(analysis.job_matches[0].match_score) : 0}/100
                </div>
                <div className="w-full bg-blue-300 dark:bg-blue-800 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis?.job_matches && analysis.job_matches.length > 0 ? analysis.job_matches[0].match_score : 0}%` }}
                    transition={{ delay: 0.9, duration: 1.5 }}
                  />
                </div>
                {analysis?.job_matches && analysis.job_matches.length > 0 && (
                  <p className="text-blue-900 dark:text-cyan-200 text-sm mt-2">{analysis.job_matches[0].role}</p>
                )}
              </motion.div>

              {/* Skills Found */}
              <motion.div
                className="bg-white dark:bg-gradient-to-br dark:from-purple-900 dark:to-pink-900 border border-gray-300 dark:border-purple-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skills Found</h3>
                  <CheckCircle className="text-purple-600 dark:text-purple-400" size={28} />
                </div>
                <div className="text-4xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                  {analysis?.extracted_skills ? analysis.extracted_skills.length : 0}
                </div>
                <p className="text-purple-900 dark:text-pink-200 text-sm">Technical skills detected</p>
              </motion.div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Extracted Skills */}
              <motion.div
                className="bg-white dark:bg-gradient-to-br dark:from-emerald-900 dark:to-green-900 border border-gray-300 dark:border-emerald-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-emerald-600 dark:text-emerald-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Extracted Skills</h3>
                </div>
                {analysis.extracted_skills && analysis.extracted_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.extracted_skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="bg-gray-200 dark:bg-emerald-800 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-emerald-600"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
                      >
                        {skill || 'Unknown Skill'}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white">No skills detected in the resume.</p>
                )}
              </motion.div>

              {/* Job Matches */}
              <motion.div
                className="bg-white dark:bg-gradient-to-br dark:from-orange-900 dark:to-red-900 border border-gray-300 dark:border-orange-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="flex items-center mb-4">
                  <Target className="text-orange-600 dark:text-orange-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Job Matches</h3>
                </div>
                {analysis?.job_matches && analysis.job_matches.length > 0 ? (
                  <div className="space-y-3">
                    {analysis.job_matches.slice(0, 3).map((match, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-100 dark:bg-orange-800 p-3 rounded-lg border border-gray-300 dark:border-orange-600"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-900 dark:text-white font-medium">{match?.role || 'Unknown Role'}</span>
                          <span className="text-gray-900 dark:text-white font-bold">{match?.match_score ? Math.round(match.match_score) : 0}%</span>
                        </div>
                        {match?.matched_skills && match.matched_skills.length > 0 && (
                          <div className="text-xs text-gray-900 dark:text-orange-200">
                            Matched: {match.matched_skills.slice(0, 3).join(', ')}
                            {match.matched_skills.length > 3 && '...'}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white">No job matches found.</p>
                )}
              </motion.div>
            </div>

            {/* Recommendations and Missing Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recommendations */}
              <motion.div
                className="bg-white dark:bg-gradient-to-br dark:from-cyan-900 dark:to-blue-900 border border-gray-300 dark:border-cyan-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <div className="flex items-center mb-4">
                  <Lightbulb className="text-cyan-600 dark:text-cyan-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recommendations</h3>
                </div>
                {analysis?.recommendations && analysis.recommendations.length > 0 ? (
                  <ul className="space-y-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start text-gray-900 dark:text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                      >
                        <Lightbulb className="text-cyan-600 dark:text-cyan-400 mr-3 mt-1 flex-shrink-0" size={16} />
                        <span>{recommendation || 'No recommendation available'}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-900 dark:text-white">No specific recommendations available.</p>
                )}
              </motion.div>

              {/* Missing Skills */}
              <motion.div
                className="bg-white dark:bg-gradient-to-br dark:from-red-900 dark:to-pink-900 border border-gray-300 dark:border-red-700 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <div className="flex items-center mb-4">
                  <XCircle className="text-red-600 dark:text-red-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skills to Develop</h3>
                </div>
                {analysis?.job_matches && analysis.job_matches.length > 0 && analysis.job_matches[0]?.missing_skills && analysis.job_matches[0].missing_skills.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-gray-900 dark:text-white text-sm mb-3">To improve your match for <span className="font-semibold text-gray-900 dark:text-white">{analysis?.job_matches?.[0]?.role || 'this role'}</span>:</p>

                    {analysis.job_matches[0].missing_skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className='flex items-center text-gray-900 dark:text-white bg-gray-100 dark:bg-red-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-red-600'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      >
                        <XCircle className='text-red-600 dark:text-red-400 mr-3 flex-shrink-0' size={16} />
                        <span>{skill || 'Unknown skill'}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className='text-gray-900 dark:text-white'>No missing skills identified, or no job matches found.</p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* AI Assistant */}
      <AIAssistant />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

export default ResumeAnalyzer
