import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Rocket, FileText, BarChart3, Lightbulb, Sparkles, ArrowRight } from 'lucide-react'
import ScrollToTop from '../components/ScrollToTop'

function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-16 h-16 text-yellow-400 mx-auto" />
              </motion.div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Mind2Market
              </h1>
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed"
              >
                Discover skills. Predict demand. Design your career path.
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dashboard"
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="buttonHover"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/resume-analyzer"
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300"
                >
                  <span className="flex items-center">
                    <FileText className="mr-2 w-5 h-5" />
                    Analyze Your Resume
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            Powerful Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 size={48} className="text-blue-600" />}
              title="Market Analytics"
              description="Comprehensive analysis of job market trends, skill frequency, and location-wise demand patterns."
              delay={0.1}
              to="/dashboard"
            />
            <FeatureCard
              icon={<TrendingUp size={48} className="text-green-600" />}
              title="Skill Forecasting"
              description="Predict future skill demand using advanced forecasting models. Plan your learning journey."
              delay={0.2}
              to="/forecast"
            />
            <FeatureCard
              icon={<Lightbulb size={48} className="text-yellow-600" />}
              title="Emerging Skills"
              description="Discover emerging skills using NLP and machine learning. Stay ahead of the curve."
              delay={0.3}
              to="/emerging-skills"
            />
            <FeatureCard
              icon={<Target size={48} className="text-red-600" />}
              title="Skill Roadmap"
              description="Get personalized learning roadmaps with stages, resources, projects, and career paths."
              delay={0.4}
              to="/roadmap"
            />
            <FeatureCard
              icon={<FileText size={48} className="text-purple-600" />}
              title="Resume Analyzer"
              description="Analyze your resume and see how it matches with job requirements. Get personalized recommendations."
              delay={0.5}
              to="/resume-analyzer"
            />
            <FeatureCard
              icon={<Rocket size={48} className="text-indigo-600" />}
              title="Career Planning"
              description="Plan your career path based on market data and emerging trends. Make informed decisions."
              delay={0.6}
              to="/roadmap"
            />
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl font-bold mb-6 text-white"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ready to Boost Your Career?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Start analyzing job market trends today and make data-driven career decisions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl hover:bg-white/30 transition-all duration-300"
            >
              <span className="flex items-center">
                Explore Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
    
    {/* Scroll to Top Button */}
    <ScrollToTop />
    </>
  )
}

function FeatureCard({ icon, title, description, delay, to }) {
  const CardContent = () => (
    <motion.div
      className="group relative card text-center cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <motion.div
        className="flex justify-center mb-6 relative z-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl group-hover:shadow-lg transition-shadow duration-300">
          {icon}
        </div>
      </motion.div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 relative z-10 leading-relaxed">
        {description}
      </p>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}

export default LandingPage

