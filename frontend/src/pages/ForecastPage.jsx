import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import apiService from '../services/api'
import { Loader2, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import SkillAutocomplete from '../components/SkillAutocomplete'
import ScrollToTop from '../components/ScrollToTop'

function ForecastPage() {
  const [skill, setSkill] = useState('Python')
  const [months, setMonths] = useState(6)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleForecast = async () => {
    if (!skill) return

    setLoading(true)
    setError(null)
    
    // Scroll to top when generating forecast
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      const data = await apiService.forecastSkillDemand(skill, months)
      setForecast(data)
    } catch (err) {
      setError('Failed to generate forecast. Please try again.')
      console.error('Forecast error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getTrendIcon = (change) => {
    if (change > 5) return <TrendingUp className="text-green-500" size={24} />
    if (change < -5) return <TrendingDown className="text-red-500" size={24} />
    return <Minus className="text-gray-500" size={24} />
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Skill Demand Forecasting</h1>

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
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Select Skill and Time Horizon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Skill:
              </label>
              <SkillAutocomplete
                value={skill}
                onChange={setSkill}
                placeholder="Enter skill name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Time Horizon (months):
              </label>
              <select
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="input-field"
              >
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
                <option value={24}>24 months</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleForecast}
                disabled={loading || !skill}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Forecasting...
                  </span>
                ) : (
                  'Generate Forecast'
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

        {/* Forecast Results */}
        {forecast && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 water-effect shine-effect">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Current Demand</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {forecast.current_demand.toFixed(1)}
                </p>
              </div>
              <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 water-effect shine-effect">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Predicted Demand</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {forecast.predicted_demand.toFixed(1)}
                </p>
              </div>
              <div className="card water-effect shine-effect">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Change</h3>
                <div className="flex items-center gap-2">
                  {getTrendIcon(forecast.change_percentage)}
                  <p className={`text-3xl font-bold ${
                    forecast.change_percentage > 0 ? 'text-green-600' : 
                    forecast.change_percentage < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {forecast.change_percentage > 0 ? '+' : ''}{forecast.change_percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Forecast Chart */}
            <div className="card water-effect mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Forecast for {forecast.skill}
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={forecast.forecast_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="predicted" stroke="#2563eb" strokeWidth={2} name="Predicted" />
                  <Line type="monotone" dataKey="lower_bound" stroke="#94a3b8" strokeDasharray="5 5" name="Lower Bound" />
                  <Line type="monotone" dataKey="upper_bound" stroke="#94a3b8" strokeDasharray="5 5" name="Upper Bound" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Trend Explanation */}
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800 water-effect shine-effect">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Trend Analysis</h3>
              <p className="text-gray-700 dark:text-gray-300">{forecast.trend}</p>
            </div>
          </>
        )}
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

export default ForecastPage

