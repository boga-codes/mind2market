import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import apiService from '../services/api'
import { Loader2, MapPin } from 'lucide-react'
import ScrollToTop from '../components/ScrollToTop'

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, type = 'bar' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        </div>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400 capitalize">
              {entry.dataKey === 'count' ? 'Jobs' : entry.dataKey === 'percentage' ? 'Percentage' : entry.dataKey}:
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              {entry.dataKey === 'percentage'
                ? `${entry.value.toFixed(2)}%`
                : entry.value.toLocaleString()
              }
            </span>
          </div>
        ))}
        {type === 'location' && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin size={12} />
              <span>Location-specific data</span>
            </div>
          </div>
        )}
      </div>
    )
  }
  return null
}

function Dashboard() {
  const [topSkills, setTopSkills] = useState([])
  const [locationSkills, setLocationSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [skills, locations] = await Promise.all([
        apiService.getTopSkills(20),
        apiService.getSkillsByLocation(10)
      ])
      setTopSkills(skills)
      setLocationSkills(locations)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLocationSkills = selectedLocation
    ? locationSkills.find(loc => loc.location === selectedLocation)?.skills || []
    : []

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
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Job Market Dashboard</h1>

        {/* Top Skills Chart */}
        <div className="card water-effect mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Top Skills in Demand</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topSkills.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="skill"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="count"
                fill="url(#skillGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Percentage Chart */}
        <div className="card water-effect mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Skill Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={topSkills.slice(0, 15)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="skill"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip content={<CustomTooltip type="line" />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Location Filter */}
        {locationSkills.length > 0 && (
          <div className="card water-effect mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="text-blue-600" size={24} />
              Skills by Location
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Select Location:
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field max-w-xs"
              >
                <option value="">All Locations</option>
                {locationSkills
                  .sort((a, b) => {
                    // Prioritize India locations
                    const indiaLocations = ['Bangalore, India', 'Mumbai, India', 'Delhi, India', 'Hyderabad, India']
                    const aIsIndia = indiaLocations.some(loc => a.location.includes(loc.split(',')[0]))
                    const bIsIndia = indiaLocations.some(loc => b.location.includes(loc.split(',')[0]))

                    if (aIsIndia && !bIsIndia) return -1
                    if (!aIsIndia && bIsIndia) return 1
                    return a.location.localeCompare(b.location)
                  })
                  .map((loc) => (
                    <option key={loc.location} value={loc.location}>
                      {loc.location}
                    </option>
                  ))}
              </select>
            </div>

            {filteredLocationSkills.length > 0 && (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredLocationSkills.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="skill"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip content={<CustomTooltip type="location" />} />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="url(#locationGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="locationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )}

        {/* Top Skills Table */}
        <div className="card water-effect">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Top Skills Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 text-gray-700 dark:text-gray-300">Rank</th>
                  <th className="text-left p-3 text-gray-700 dark:text-gray-300">Skill</th>
                  <th className="text-left p-3 text-gray-700 dark:text-gray-300">Count</th>
                  <th className="text-left p-3 text-gray-700 dark:text-gray-300">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {topSkills.slice(0, 20).map((skill, index) => (
                  <tr
                    key={skill.skill}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{skill.skill}</td>
                    <td className="p-3">{skill.count}</td>
                    <td className="p-3">{skill.percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

export default Dashboard

