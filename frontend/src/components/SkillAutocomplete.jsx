import React, { useState, useEffect, useRef } from 'react'
import apiService from '../services/api'
import { Search, ChevronDown } from 'lucide-react'

function SkillAutocomplete({ value, onChange, placeholder = "Enter skill name", className = "" }) {
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Expanded popular skills fallback
  const popularSkills = [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP',
    'React', 'Angular', 'Vue.js', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'CI/CD',
    'Machine Learning', 'Data Science', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn',
    'Git', 'HTML', 'CSS', 'Tailwind CSS', 'REST API', 'GraphQL', 'Microservices',
    'Linux', 'DevOps', 'Agile', 'Scrum', 'Tableau', 'Power BI', 'Apache Spark', 'Hadoop'
  ]

  useEffect(() => {
    const loadSuggestions = async () => {
      if (value.length < 1) {
        setSuggestions(popularSkills.slice(0, 10))
        return
      }

      setLoading(true)
      try {
        const topSkills = await apiService.getTopSkills(50)
        const filtered = topSkills
          .map(s => s.skill)
          .filter(skill => 
            skill.toLowerCase().includes(value.toLowerCase()) &&
            skill.toLowerCase() !== value.toLowerCase()
          )
          .slice(0, 10)
        
        setSuggestions(filtered.length > 0 ? filtered : popularSkills.filter(s => 
          s.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10))
      } catch (error) {
        // Fallback to popular skills
        setSuggestions(popularSkills.filter(s => 
          s.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10))
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(loadSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    onChange(e.target.value)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
    if (suggestions.length === 0) {
      setSuggestions(popularSkills.slice(0, 10))
    }
  }

  const handleSelect = (skill) => {
    onChange(skill)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input-field pl-10 pr-10 w-full"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isOpen && (suggestions.length > 0 || loading) && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading suggestions...
            </div>
          ) : (
            <ul className="py-2">
              {suggestions.map((skill, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(skill)}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default SkillAutocomplete

