import React from 'react'
import { Code, Database, TrendingUp, Users, Book, Zap } from 'lucide-react'
import ScrollToTop from '../components/ScrollToTop'

function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Mind2Market</h1>

        {/* Introduction */}
        <div className="card water-effect mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Welcome to Mind2Market</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Discover skills. Predict demand. Design your career path. Our comprehensive platform helps students, job seekers, and professionals make
            data-driven career decisions with AI-powered insights.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Built with ❤️ for the community. All features are free, local-first, and require no paid APIs or cloud
            dependencies.
          </p>
        </div>

        {/* Features */}
        <div className="card water-effect mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Key Features</h2>
          <div className="space-y-4">
            <FeatureItem
              icon={<Database size={24} className="text-primary-600" />}
              title="Market Analytics"
              description="Comprehensive analysis of job market data with skill frequency, location-wise demand, and role distribution."
            />
            <FeatureItem
              icon={<TrendingUp size={24} className="text-primary-600" />}
              title="Skill Forecasting"
              description="Predict future skill demand using Facebook Prophet. Get trend insights and plan your learning journey."
            />
            <FeatureItem
              icon={<Zap size={24} className="text-primary-600" />}
              title="Emerging Skills Detection"
              description="AI-powered detection of emerging skills using NLP (sentence embeddings) and clustering algorithms."
            />
            <FeatureItem
              icon={<Book size={24} className="text-primary-600" />}
              title="Learning Roadmaps"
              description="Personalized skill learning roadmaps with stages, estimated hours, resources, and project ideas."
            />
            <FeatureItem
              icon={<Users size={24} className="text-primary-600" />}
              title="Resume Analyzer"
              description="Analyze your resume, match with job roles, and get personalized recommendations for skill improvement."
            />
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card water-effect mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Backend</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Python 3.10+</li>
                <li>• FastAPI</li>
                <li>• SQLite / Pandas</li>
                <li>• Facebook Prophet (Forecasting)</li>
                <li>• Sentence-Transformers (NLP)</li>
                <li>• Scikit-learn (Clustering)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Frontend</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• React 18</li>
                <li>• Tailwind CSS</li>
                <li>• Recharts (Visualizations)</li>
                <li>• Axios (API Calls)</li>
                <li>• React Router</li>
                <li>• Vite</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="card water-effect mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Who Can Use This Platform?</h2>
          <div className="space-y-4">
            <UseCase
              title="Students"
              description="Discover which skills are in demand and plan your learning path accordingly."
            />
            <UseCase
              title="Job Seekers"
              description="Analyze your resume, identify skill gaps, and improve your job match scores."
            />
            <UseCase
              title="Career Changers"
              description="Explore emerging skills and get roadmap guidance for transitioning careers."
            />
            <UseCase
              title="Professionals"
              description="Stay updated with market trends and forecast skill demand for career growth."
            />
            <UseCase
              title="Recruiters & HR"
              description="Understand skill trends and demand patterns for better hiring strategies."
            />
          </div>
        </div>

        {/* Principles */}
        <div className="card water-effect bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Principles</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">✓</span>
              <span><strong>Free & Open:</strong> No paid APIs, no subscription fees, completely free to use</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">✓</span>
              <span><strong>Local-First:</strong> Runs entirely on your machine, no cloud dependency required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">✓</span>
              <span><strong>CPU-Friendly:</strong> Optimized for CPU-only machines, no GPU required</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">✓</span>
              <span><strong>User-Friendly:</strong> Clean UI, accessible design, beginner-to-expert friendly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">✓</span>
              <span><strong>Privacy-Focused:</strong> Your data stays on your machine</span>
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            <Code className="inline-block mr-2" size={20} />
            Built with modern web technologies
          </p>
          <p>&copy; 2026 Mind2Market. All rights reserved.</p>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function UseCase({ title, description }) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default AboutPage

