import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Chat from './components/Chat'
import ParticleBackground from './components/ParticleBackground'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import ForecastPage from './pages/ForecastPage'
import EmergingSkillsPage from './pages/EmergingSkillsPage'
import RoadmapPage from './pages/RoadmapPage'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Page transition wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/forecast" element={<PageTransition><ForecastPage /></PageTransition>} />
        <Route path="/emerging-skills" element={<PageTransition><EmergingSkillsPage /></PageTransition>} />
        <Route path="/roadmap" element={<PageTransition><RoadmapPage /></PageTransition>} />
        <Route path="/resume-analyzer" element={<PageTransition><ResumeAnalyzer /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <Router>
      <ScrollToTop />
      <ParticleBackground />
      <div className="min-h-screen flex flex-col relative">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-grow relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Chat />
      </div>
    </Router>
  )
}

export default App

