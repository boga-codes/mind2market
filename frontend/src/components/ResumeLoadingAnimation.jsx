import React, { useState, useEffect } from 'react'
import { FileText, Search, Target, CheckCircle, Bot, Cpu, Zap, Eye, Brain, Database, Network } from 'lucide-react'
import { motion } from 'framer-motion'

function ResumeLoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [robotState, setRobotState] = useState('scanning')

  const steps = [
    { icon: FileText, text: 'AI Robot scanning your resume...', delay: 0, robotState: 'scanning' },
    { icon: Brain, text: 'Neural network analyzing skills and patterns...', delay: 1500, robotState: 'analyzing' },
    { icon: Database, text: 'Processing data through machine learning algorithms...', delay: 3000, robotState: 'processing' },
    { icon: Network, text: 'Matching with job roles using advanced AI...', delay: 4500, robotState: 'matching' },
    { icon: Target, text: 'Generating personalized insights and recommendations...', delay: 6000, robotState: 'generating' },
  ]

  useEffect(() => {
    const timeouts = []

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index + 1)
        setRobotState(step.robotState)
      }, step.delay + 500)
      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  const RobotAnimation = () => (
    <div className="relative mb-8 w-64 h-64 flex items-center justify-center">
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-cyan-400/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Robot Body */}
      <motion.div
        className="relative z-10"
        animate={robotState === 'scanning' ? { rotate: [0, 3, -3, 0], y: [0, -2, 0] } :
                robotState === 'analyzing' ? { scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] } :
                robotState === 'processing' ? { x: [0, 5, -5, 0], y: [0, -3, 0] } :
                robotState === 'matching' ? { rotate: [0, 360], scale: [1, 1.05, 1] } :
                { y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: robotState === 'matching' ? 2 : 1.5,
          repeat: robotState === 'scanning' || robotState === 'analyzing' ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Robot Head */}
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-2xl relative mb-4 shadow-2xl border border-cyan-300/50"
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 211, 238, 0.3)",
              "0 0 40px rgba(34, 211, 238, 0.6)",
              "0 0 20px rgba(34, 211, 238, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Eyes */}
          <motion.div
            className="absolute top-6 left-6 w-4 h-4 bg-cyan-300 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-6 right-6 w-4 h-4 bg-cyan-300 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          />

          {/* Antenna */}
          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-purple-400 to-cyan-300 rounded-t-full"
            animate={{ height: [24, 28, 24] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 bg-cyan-300 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Mouth/Speaker */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-800 rounded-full overflow-hidden"
            animate={{ scaleX: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <motion.div
              className="w-full h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Robot Body */}
        <motion.div
          className="w-40 h-24 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl relative shadow-xl border border-gray-600"
          animate={{
            boxShadow: [
              "0 0 15px rgba(34, 211, 238, 0.2)",
              "0 0 30px rgba(34, 211, 238, 0.4)",
              "0 0 15px rgba(34, 211, 238, 0.2)"
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {/* Chest Panel */}
          <div className="absolute inset-2 bg-gradient-to-br from-blue-600/80 to-purple-600/80 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-1 p-2 h-full">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-cyan-300 rounded-sm"
                  animate={{
                    opacity: robotState === 'analyzing' || robotState === 'processing' ? [0.3, 1, 0.3] : 0.5,
                    scale: robotState === 'matching' ? [1, 1.3, 1] : robotState === 'processing' ? [1, 1.2, 1] : 1,
                    backgroundColor: robotState === 'generating' ? ['#67e8f9', '#c084fc', '#67e8f9'] : '#67e8f9'
                  }}
                  transition={{
                    duration: robotState === 'processing' ? 0.6 : 0.8,
                    delay: i * 0.08,
                    repeat: robotState === 'analyzing' || robotState === 'processing' ? Infinity : 0
                  }}
                />
              ))}
            </div>
          </div>

          {/* Arms */}
          <motion.div
            className="absolute -left-4 top-8 w-6 h-16 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full origin-top"
            animate={robotState === 'scanning' ? { rotate: [0, 15, -15, 0] } :
                     robotState === 'processing' ? { rotate: [0, 20, -20, 0] } :
                     robotState === 'matching' ? { scale: [1, 1.2, 1] } : {}}
            transition={{
              duration: robotState === 'processing' ? 0.8 : 1,
              repeat: robotState === 'scanning' || robotState === 'processing' ? Infinity : 0
            }}
          />
          <motion.div
            className="absolute -right-4 top-8 w-6 h-16 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full origin-top"
            animate={robotState === 'scanning' ? { rotate: [0, -15, 15, 0] } :
                     robotState === 'processing' ? { rotate: [0, -20, 20, 0] } :
                     robotState === 'matching' ? { scale: [1, 1.2, 1] } : {}}
            transition={{
              duration: robotState === 'processing' ? 0.8 : 1,
              repeat: robotState === 'scanning' || robotState === 'processing' ? Infinity : 0,
              delay: 0.2
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Elements */}
      <motion.div
        className="absolute top-8 left-8"
        animate={{
          y: [0, -12, 0],
          x: [0, 3, 0],
          opacity: [0.5, 1, 0.5],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Cpu size={28} className="text-blue-400 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute top-16 right-8"
        animate={{
          y: [0, -18, 0],
          x: [0, -4, 0],
          opacity: [0.3, 0.9, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }}
      >
        <Zap size={24} className="text-purple-400 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-8"
        animate={{
          y: [0, -15, 0],
          x: [0, 5, 0],
          opacity: [0.4, 0.95, 0.4],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
      >
        <Eye size={26} className="text-cyan-400 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-12"
        animate={{
          y: [0, -10, 0],
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
      >
        <Brain size={22} className="text-pink-400 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-4"
        animate={{
          x: [0, 8, 0],
          opacity: [0.4, 0.8, 0.4],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
      >
        <Database size={20} className="text-green-400 drop-shadow-lg" />
      </motion.div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute inset-0 border-2 border-cyan-400/60 rounded-2xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.8, 0.3],
          borderColor: ['rgba(34, 211, 238, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(34, 211, 238, 0.6)']
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Progress Ring */}
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary Ring */}
      <motion.div
        className="absolute inset-4 border-2 border-transparent border-b-purple-400 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <RobotAnimation />

      {/* Step Progress */}
      <div className="w-full max-w-lg space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep > index
          const isCurrent = currentStep === index + 1

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                isActive
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 shadow-lg'
                  : isCurrent
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 shadow-md'
                  : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className={`flex-shrink-0 ${
                isActive ? 'text-green-600 dark:text-green-400' :
                isCurrent ? 'text-blue-600 dark:text-blue-400' :
                'text-gray-700'
              }`}>
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0 }}
                >
                  <Icon size={24} />
                </motion.div>
              </div>
              <span className={`flex-1 ${
                isActive ? 'text-green-800 dark:text-green-300 font-medium' :
                isCurrent ? 'text-blue-800 dark:text-blue-300 font-medium' :
                'text-gray-900 dark:text-gray-400'
              }`}>
                {step.text}
              </span>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                </motion.div>
              )}
              {isCurrent && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-lg mt-8">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="text-center mt-2 text-sm text-gray-900 dark:text-gray-400">
          Analyzing your resume... {Math.round((currentStep / steps.length) * 100)}%
        </div>
      </div>
    </div>
  )
}

export default ResumeLoadingAnimation

