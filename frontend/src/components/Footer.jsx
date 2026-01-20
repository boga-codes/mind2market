import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Mind2Market</h3>
            <p className="text-sm">
              Discover skills. Predict demand. Design your career path.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/forecast" className="hover:text-white transition-colors">Forecast</a></li>
              <li><a href="/emerging-skills" className="hover:text-white transition-colors">Emerging Skills</a></li>
              <li><a href="/roadmap" className="hover:text-white transition-colors">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <p className="text-sm">
              A free, local-first platform for job market analytics and career planning.
              Built with ❤️ for students, job seekers, and professionals.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p className="mb-2">&copy; 2026 Mind2Market. All rights reserved.</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            Designed & Developed by <span className="text-white font-medium">ABHISHEK BOGA & VARSHA REDDY</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

