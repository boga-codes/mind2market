import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m AISHA, your AI assistant. I can help you with questions about resume analysis, job market trends, and career advice. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Predefined Q&A database
  const qaDatabase = {
    // Greetings
    'hi': 'Hello! How can AISHA help you with your career and resume analysis today?',
    'hello': 'Hi there! I\'m AISHA, here to assist you with resume analysis, job market insights, and career advice. What would you like to know?',
    'hey': 'Hey! AISHA is ready to explore your career options? Ask me about resume analysis, skills, or job market trends!',
    'good morning': 'Good morning! Ready to boost your career today? Let\'s analyze your resume or discuss job market trends!',
    'good afternoon': 'Good afternoon! How can I help you with your career goals this afternoon?',
    'good evening': 'Good evening! Evenings are great for career planning. What would you like to discuss?',
    'how are you': 'I\'m doing great, thanks for asking! I\'m here and ready to help you with your career journey. How can I assist you today?',
    'what\'s up': 'Not much, just here to help you succeed in your career! What\'s on your mind?',
    
    // Basic App Questions
    'what is this': 'This is a Resume Analyzer app that helps you evaluate your resume, match it with job opportunities, and get personalized career advice using advanced AI.',
    'what does this app do': 'This app analyzes your resume, provides job market insights, forecasts skill demand, and gives personalized career recommendations.',
    'how does this work': 'Upload your resume, and our AI will analyze it in seconds, showing your skills, job matches, and recommendations for improvement.',
    'what can you do': 'I can analyze resumes, provide career advice, share job market trends, suggest high-paying roles, and help with skill development.',
    
    // High Paying Jobs
    'high paying jobs': 'High-paying tech jobs include: Software Architect (₹13.28L+), Cloud Architect (₹17.01L+), Data Scientist (₹10.38L+), DevOps Engineer (₹10.79L+), Cybersecurity Expert (₹9.96L+).',
    'best paying jobs': 'Top paying roles: Cloud Solutions Architect, Data Scientist, DevOps Engineer, Software Architect, and Cybersecurity Consultant.',
    'highest salary jobs': 'Highest paying tech jobs: Cloud Architect (₹17.01L+), Software Architect (₹13.28L+), DevOps Engineer (₹10.79L+), Data Scientist (₹10.38L+).',
    'lucrative careers': 'Lucrative tech careers: AI/ML Engineer, Cloud Architect, Data Scientist, DevOps Engineer, and Full-Stack Developer with modern skills.',
    'top paying roles': 'Top paying roles: Software Architect, Cloud Engineer, Data Scientist, DevOps Engineer, and Cybersecurity Specialist.',
    
    // Best Courses
    'best courses': 'Top courses: Full-Stack Development, Data Science, AWS Cloud Computing, Machine Learning, and Cybersecurity. Focus on practical projects!',
    'recommended courses': 'Recommended: Python for Data Science, AWS Solutions Architect, React Development, Machine Learning, and DevOps with Docker & Kubernetes.',
    'courses to learn': 'Essential courses: Python Programming, Web Development (MERN Stack), Cloud Computing (AWS/Azure), Data Science, and Machine Learning.',
    'what should i learn': 'Learn: Python, JavaScript, AWS, React, Machine Learning, Docker, and Cybersecurity. Start with fundamentals and build projects.',
    'learning path': 'Suggested learning path: 1) Programming basics (Python), 2) Web development, 3) Database skills, 4) Cloud computing, 5) Specialization in your interest area.',
    
    // Career Advice
    'career advice': 'Focus on high-demand skills like Python, AWS, and ML. Build projects, network on LinkedIn, and keep learning. Consistency is key!',
    'how to advance career': 'Advance by: learning new skills, building a portfolio, networking, taking certifications, and staying updated with industry trends.',
    'career growth': 'Career growth tips: Continuous learning, skill diversification, networking, mentorship, and taking on challenging projects.',
    'job search tips': 'Job search: Update resume, network on LinkedIn, apply to 10+ jobs weekly, prepare for interviews, and follow up.',
    'career change': 'For career change: Identify transferable skills, get relevant certifications, network in target industry, and start with entry-level roles.',
    
    // Skills Questions
    'skills in demand': 'In-demand skills: Python, JavaScript, React, AWS, Docker, Machine Learning, Data Science, Cloud Computing, DevOps, Cybersecurity.',
    'trending skills': 'Trending: AI/ML, Python, Cloud Computing, React, Data Science, Blockchain, IoT, and Advanced Analytics.',
    'future skills': 'Future skills: AI/ML, Quantum Computing, Edge Computing, Blockchain, Augmented Reality, and Advanced Cybersecurity.',
    'what skills to learn': 'Learn: Python, JavaScript, AWS, React, Machine Learning, Docker, Git, and SQL. Focus on practical application.',
    
    // Salary Questions
    'average salary': 'Tech salaries: Software Engineer (₹6-12L), Data Scientist (₹8-15L), DevOps Engineer (₹8-14L), depending on experience and location.',
    'salary range': 'Salary ranges: Entry-level (₹3-6L), Mid-level (₹6-12L), Senior-level (₹12-25L+). Location and skills significantly impact pay.',
    'salary negotiation': 'Negotiate salary by researching market rates, highlighting achievements, considering total compensation, and being confident.',
    
    // Interview Questions
    'interview tips': 'Interview tips: Research company, practice coding problems, prepare STAR stories, ask smart questions, and follow up.',
    'interview preparation': 'Prepare: Review resume, practice common questions, research company, prepare questions, and mock interviews.',
    'common interview questions': 'Common questions: Tell me about yourself, Why this company, What are your strengths, Describe a challenge you overcame.',
    
    // Resume Questions
    'resume tips': 'Resume tips: Use action verbs, quantify achievements, keep it concise, tailor for each job, and proofread carefully.',
    'how to improve resume': 'Improve resume: Add relevant skills, quantify achievements, update with current tech, use clear formatting, and get feedback.',
    'resume format': 'Best format: Clean, professional, 1-2 pages, clear sections, and ATS-friendly. Use PDF format for submission.',
    
    // Programming Languages
    'python': 'Python is #1 trending skill! Used in data science, AI, web development, automation. Average salary: ₹9.13L+. Perfect for beginners!',
    'javascript': 'JavaScript is essential for web development. Used for frontend and backend (Node.js). Great for interactive websites and apps.',
    'react': 'React is a popular JavaScript library for building user interfaces. Widely used by companies like Facebook and Netflix.',
    'java': 'Java is versatile for enterprise applications, Android development, and large systems. Still highly relevant in many industries.',
    'aws': 'AWS is the leading cloud platform. Skills in AWS are crucial for cloud computing and DevOps roles.',
    'docker': 'Docker is essential for containerization and modern DevOps. Helps deploy and scale applications efficiently.',
    'machine learning': 'Machine Learning is booming! Learn Python, TensorFlow, and statistics for roles in AI and data science.',
    'data science': 'Data Science combines statistics, programming, and domain knowledge. High demand with salaries up to ₹15L+.',
    
    // Location Questions
    'best cities for jobs': 'Best cities: Bangalore, Hyderabad, Pune, Mumbai, Delhi-NCR. Bangalore has the highest concentration of tech jobs.',
    'remote jobs': 'Remote jobs are increasing! Many tech roles now offer remote work. Look for companies with remote-first policies.',
    'work from home': 'Work from home is common in tech. Companies like Google, Amazon, and many startups offer remote positions.',
    
    // Experience Questions
    'entry level jobs': 'Entry-level jobs: Junior Developer, Associate Software Engineer, Trainee positions. Focus on learning and building projects.',
    'fresh graduate': 'Fresh graduates: Start with entry-level roles, internships, or training programs. Build skills through projects and certifications.',
    'experienced professionals': 'Experienced pros: Look for senior roles, leadership positions, or specialized technical roles. Focus on expertise and mentoring.',
    
    // Company Questions
    'top companies': 'Top tech companies: Google, Microsoft, Amazon, Apple, Meta, Netflix, Uber, and many Indian unicorns like Flipkart, Swiggy.',
    'startups vs mnc': 'Startups: Fast-paced, learning opportunities, equity. MNCs: Stability, better pay, structured growth. Choose based on your preferences.',
    'product vs service': 'Product companies focus on building products, service companies provide consulting. Product roles often have more impact and learning.',
    
    // Additional General Questions
    'freelancing': 'Freelancing: Build portfolio, use platforms like Upwork, set competitive rates, deliver quality work, and network.',
    'side projects': 'Side projects: Build portfolio, learn new skills, network, and potentially monetize. Great for career growth!',
    'certifications': 'Valuable certifications: AWS Certified Solutions Architect, Google Cloud Professional, CISSP, PMP, and language-specific certs.',
    'networking': 'Networking: LinkedIn, industry events, meetups, conferences, alumni groups. Build genuine connections.',
    'mentorship': 'Find mentors through LinkedIn, company programs, or professional networks. Learn from experienced professionals.',
    'work life balance': 'Work-life balance: Set boundaries, prioritize health, learn to say no, and choose companies that support it.',
    'burnout': 'Avoid burnout: Take breaks, exercise, maintain hobbies, set realistic goals, and seek help when needed.',
    'motivation': 'Stay motivated: Set small goals, celebrate wins, learn continuously, network, and remember your why.',
    'job satisfaction': 'Job satisfaction comes from meaningful work, good culture, growth opportunities, and work-life balance.',
    'future of work': 'Future: Remote work, AI augmentation, continuous learning, gig economy, and focus on soft skills.',
    'ai in jobs': 'AI will augment jobs, not replace them. Learn to work with AI tools and focus on uniquely human skills.',
    'automation': 'Automation will change many jobs. Focus on skills that complement AI: creativity, problem-solving, emotional intelligence.',
    
    // Specific Role Questions
    'software engineer': 'Software Engineer: Builds and maintains software. Requires programming skills, problem-solving. Salary: ₹6-15L.',
    'data scientist': 'Data Scientist: Analyzes data for insights. Needs Python, statistics, ML. Salary: ₹8-20L.',
    'devops engineer': 'DevOps Engineer: Manages deployment and infrastructure. Requires cloud, automation tools. Salary: ₹8-18L.',
    'full stack developer': 'Full Stack Developer: Works on frontend and backend. Needs multiple technologies. Salary: ₹6-14L.',
    'ui ux designer': 'UI/UX Designer: Creates user interfaces. Requires design skills, user research. Salary: ₹4-12L.',
    'product manager': 'Product Manager: Manages product development. Needs business acumen, technical knowledge. Salary: ₹15-30L.',
    'business analyst': 'Business Analyst: Analyzes business needs. Requires analytical skills, communication. Salary: ₹6-15L.',
    'system administrator': 'System Administrator: Manages IT infrastructure. Requires networking, security knowledge. Salary: ₹5-12L.',
    'cybersecurity analyst': 'Cybersecurity Analyst: Protects systems from threats. Requires security knowledge, tools. Salary: ₹6-15L.',
    'cloud architect': 'Cloud Architect: Designs cloud solutions. Requires deep cloud knowledge. Salary: ₹15-30L+.',
    
    // Education Questions
    'computer science degree': 'CS degree provides strong foundation, but practical skills and projects are equally important. Many successful developers are self-taught.',
    'bootcamp vs degree': 'Bootcamps: Fast, practical, expensive. Degree: Comprehensive, time-consuming, theoretical. Choose based on your learning style and timeline.',
    'self learning': 'Self-learning: Use online platforms like Coursera, Udemy, freeCodeCamp. Build projects, contribute to open source, and network.',
    'coding bootcamp': 'Coding bootcamps: Intensive programs (3-6 months) teaching practical skills. Good for career changers, but research quality.',
    
    // Industry Questions
    'tech industry': 'Tech industry: Fast-paced, high salaries, continuous learning required. Great for problem-solvers and innovators.',
    'finance industry': 'Finance: Stable, good pay, analytical work. Requires attention to detail and sometimes long hours.',
    'healthcare industry': 'Healthcare: Meaningful work, growing with tech. Combines domain knowledge with technology.',
    'ecommerce industry': 'E-commerce: Fast-growing, customer-focused. Requires understanding of online business and user experience.',
    'education industry': 'EdTech: Growing rapidly with online learning. Combines education passion with technology skills.',
    
    // Time-based Questions
    'how long to learn coding': 'Learning coding: 3-6 months for basics, 1-2 years for job-ready skills. Depends on dedication and practice.',
    'how long for job': 'Getting first job: 3-12 months with consistent effort, building projects, and networking.',
    'career timeline': 'Career timeline: 0-2 years (junior), 2-5 years (mid-level), 5+ years (senior/lead). Continuous learning required.',
    
    // Motivation and Mindset
    'imposter syndrome': 'Imposter syndrome is common. Remember your achievements, focus on growth, and seek support from mentors.',
    'fear of failure': 'Failure is learning. Every expert was once a beginner. Embrace failures as stepping stones.',
    'staying updated': 'Stay updated: Follow tech blogs, attend conferences, take courses, join communities, and experiment with new technologies.',
    'continuous learning': 'Continuous learning: Read books, take courses, attend webinars, build projects, and teach others.',
    
    // Practical Questions
    'build portfolio': 'Build portfolio: GitHub projects, personal website, blog, open source contributions, and case studies.',
    'github importance': 'GitHub: Showcase projects, collaborate, learn from others, and demonstrate coding skills to employers.',
    'linkedin optimization': 'LinkedIn: Professional photo, detailed summary, showcase projects, engage with content, and network actively.',
    'personal branding': 'Personal branding: Consistent online presence, share knowledge, build network, and establish expertise.',
    
    // Miscellaneous
    'work culture': 'Good work culture: Open communication, work-life balance, growth opportunities, inclusive environment, and supportive management.',
    'company culture': 'Company culture: Research Glassdoor reviews, talk to current employees, and trust your instincts during interviews.',
    'job hopping': 'Job hopping: Can be good for growth and salary, but too frequent can raise concerns. 1-3 years per role is generally good.',
    'performance review': 'Performance reviews: Set goals, track progress, seek feedback, and discuss career growth with managers.',
    'promotion': 'Promotion: Exceed expectations, take ownership, develop skills, network internally, and express interest in growth.',
    'layoffs': 'Handle layoffs: Stay positive, update resume, network, learn new skills, and consider freelance while job hunting.',
    'job security': 'Job security: Develop in-demand skills, build network, stay updated, and maintain good performance.',
    'side hustle': 'Side hustles: Freelancing, blogging, YouTube, creating digital products. Can supplement income and build skills.',
    'passive income': 'Passive income: Dividend stocks, rental property, online courses, affiliate marketing, or creating digital products.',
    'financial planning': 'Financial planning: Emergency fund (6 months expenses), invest in mutual funds, plan for retirement, and manage debt.',
    'tax saving': 'Tax saving: Use 80C deductions, HRA, LTA, invest in ELSS, and plan investments strategically.',
    
    // Fun/Engaging Questions
    'favorite programming language': 'As an AI, I don\'t have personal preferences, but I love helping people learn any programming language that suits their goals!',
    'best programming language': 'The "best" language depends on your goals. Python for beginners, JavaScript for web, Java for enterprise, etc.',
    'programming is hard': 'Programming can be challenging, but it\'s like learning any new skill. Break it down, practice daily, and be patient with yourself.',
    'i want to code': 'That\'s awesome! Start with Python or JavaScript. Use free resources like freeCodeCamp, Codecademy, or CS50. Build small projects!',
    'i\'m stuck': 'Getting stuck is normal! Break problems into smaller parts, use debugging tools, search documentation, and ask for help in communities.',
    'debugging tips': 'Debugging: Use print statements, debugger tools, read error messages carefully, isolate the problem, and test incrementally.',
    'coding best practices': 'Best practices: Write readable code, use meaningful names, add comments, test thoroughly, and follow language conventions.',
    'code review': 'Code review: Check for bugs, improve readability, ensure best practices, suggest optimizations, and share knowledge.',
    
    // Closing/Help Questions
    'thank you': 'You\'re welcome! I\'m here whenever you need career advice or resume analysis help. Keep learning and growing!',
    'thanks': 'My pleasure! Don\'t hesitate to ask if you have more questions about your career journey.',
    'bye': 'Goodbye! Remember, your career success is just a question away. Come back anytime!',
    'goodbye': 'See you later! Keep working towards your career goals. AISHA is always here to help!',
    'see you': 'See you soon! Don\'t forget to upload your resume for analysis when you\'re ready.',
    
    // Default fallback
    'default': 'I\'m AISHA, your AI career assistant! Ask me about trending skills, resume analysis, career advice, salary insights, or any job market questions. I\'m here to help you succeed! 🚀'
  }

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim()
    const words = message.split(/\s+/)
    
    // Check for exact matches first
    if (qaDatabase[message]) {
      return qaDatabase[message]
    }
    
    // Check for partial matches (more flexible)
    for (const [key, value] of Object.entries(qaDatabase)) {
      if (message.includes(key) || key.split(/\s+/).some(word => message.includes(word))) {
        return value
      }
    }
    
    // Enhanced keyword matching with broader categories
    const keywordResponses = {
      // Greetings
      'hi|hello|hey|greetings|good morning|good afternoon|good evening': 'Hello! How can AISHA help you with your career and resume analysis today?',
      
      // High paying jobs
      'high paying|best paying|highest salary|lucrative|top paying|rich jobs': 'High-paying tech jobs include: Software Architect (₹13.28L+), Cloud Architect (₹17.01L+), Data Scientist (₹10.38L+), DevOps Engineer (₹10.79L+), Cybersecurity Expert (₹9.96L+).',
      
      // Courses and learning
      'best courses|recommended courses|courses to learn|what should i learn|learning path': 'Top courses: Full-Stack Development, Data Science, AWS Cloud Computing, Machine Learning, and Cybersecurity. Focus on practical projects!',
      
      // Career advice
      'career advice|how to advance|career growth|job search': 'Focus on high-demand skills like Python, AWS, and ML. Build projects, network on LinkedIn, and keep learning. Consistency is key!',
      
      // Skills
      'skills in demand|trending skills|future skills|what skills to learn': 'In-demand skills: Python, JavaScript, React, AWS, Docker, Machine Learning, Data Science, Cloud Computing, DevOps, Cybersecurity.',
      
      // Salary
      'average salary|salary range|salary negotiation': 'Tech salaries: Software Engineer (₹6-12L), Data Scientist (₹8-15L), DevOps Engineer (₹8-14L), depending on experience and location.',
      
      // Interview
      'interview tips|interview preparation|common interview questions': 'Interview tips: Research company, practice coding problems, prepare STAR stories, ask smart questions, and follow up.',
      
      // Resume
      'resume tips|how to improve resume|resume format': 'Resume tips: Use action verbs, quantify achievements, keep it concise, tailor for each job, and proofread carefully.',
      
      // Programming languages
      'python|javascript|react|java|aws|docker|machine learning|data science': 'That\'s a great skill to learn! It\'s highly in-demand in the job market. Would you like specific resources or career advice for this technology?',
      
      // Location
      'best cities|remote jobs|work from home': 'Best cities: Bangalore, Hyderabad, Pune, Mumbai, Delhi-NCR. Remote jobs are increasing! Many tech roles now offer remote work.',
      
      // Experience levels
      'entry level|fresh graduate|experienced': 'Entry-level jobs: Junior Developer, Associate Software Engineer, Trainee positions. Focus on learning and building projects.',
      
      // Companies
      'top companies|startups|mnc|product|service': 'Top tech companies: Google, Microsoft, Amazon, Apple, Meta, Netflix, Uber. Choose based on your preferences for pace and culture.',
      
      // General career
      'freelancing|side projects|certifications|networking|mentorship': 'That\'s a great career move! Building a strong network and continuous learning are key to success in tech.',
      
      // Work life
      'work life balance|burnout|motivation|job satisfaction': 'Work-life balance is crucial. Set boundaries, prioritize health, and choose companies that support employee well-being.',
      
      // Future
      'future of work|ai in jobs|automation': 'Future: Remote work, AI augmentation, continuous learning, gig economy, and focus on soft skills.',
      
      // Specific roles
      'software engineer|data scientist|devops engineer|full stack developer|ui ux designer|product manager|business analyst|system administrator|cybersecurity analyst|cloud architect': 'That\'s an excellent career path! It requires specific skills and offers great growth opportunities. Would you like details about salary, required skills, or how to get started?',
      
      // Education
      'computer science degree|bootcamp|self learning|coding bootcamp': 'CS degree provides strong foundation, but practical skills and projects are equally important. Many successful developers are self-taught.',
      
      // Industries
      'tech industry|finance industry|healthcare industry|ecommerce industry|education industry': 'Each industry has unique opportunities. Tech offers high growth, finance provides stability, healthcare combines purpose with technology.',
      
      // Time
      'how long to learn|how long for job|career timeline': 'Learning coding: 3-6 months for basics, 1-2 years for job-ready skills. Getting first job: 3-12 months with consistent effort.',
      
      // Mindset
      'imposter syndrome|fear of failure|staying updated|continuous learning': 'You\'re not alone! Many professionals face these challenges. Focus on growth, celebrate small wins, and keep learning.',
      
      // Practical
      'build portfolio|github|linkedin|personal branding': 'Building a strong online presence is crucial. Showcase your projects, network actively, and share your knowledge.',
      
      // Miscellaneous
      'work culture|company culture|job hopping|performance review|promotion|layoffs|job security': 'Company culture matters greatly for job satisfaction. Research thoroughly and trust your instincts during interviews.',
      
      // Side income
      'side hustle|passive income|financial planning|tax saving': 'Smart financial planning is important. Consider emergency funds, investments, and tax-saving options.',
      
      // Fun/Programming
      'favorite programming|best programming|programming is hard|i want to code|i\'m stuck|debugging|coding best practices|code review': 'Programming is challenging but rewarding! Break problems down, practice daily, and don\'t hesitate to ask for help.',
      
      // Thanks/Goodbye
      'thank you|thanks|bye|goodbye|see you': 'You\'re welcome! I\'m here whenever you need career advice or resume analysis help. Keep learning and growing!'
    }
    
    // Check keyword patterns
    for (const [pattern, response] of Object.entries(keywordResponses)) {
      const keywords = pattern.split('|')
      if (keywords.some(keyword => words.some(word => word.includes(keyword) || keyword.includes(word)))) {
        return response
      }
    }
    
    // Check for specific word matches in message
    const specificWords = {
      'resume': 'I can help you with resume analysis, optimization, and improvement strategies. Try asking about "resume analysis" or "improve resume score".',
      'skill': 'Skills are crucial for career success. Ask about "skills in demand", "skill matching", or "emerging skills".',
      'job': 'Job market insights are available. Try "job market forecast" or "career transition advice".',
      'interview': 'Interview preparation is key. Ask about "interview preparation" or "interview tips".',
      'salary': 'Salary negotiation is important. Try asking about "salary negotiation tips".',
      'network': 'Networking can open many doors. Ask about "networking effectively".',
      'course': 'Learning new skills is essential. Ask about "best courses" or "recommended courses".',
      'career': 'Career planning is important. Ask about "career advice" or "career growth".',
      'company': 'Company choice matters. Ask about "top companies" or "company culture".',
      'remote': 'Remote work is growing. Ask about "remote jobs" or "work from home".',
      'startup': 'Startups offer growth opportunities. Ask about "startups vs MNC" for more details.',
      'freelance': 'Freelancing provides flexibility. Ask about "freelancing" for tips.',
      'certification': 'Certifications boost credibility. Ask about "certifications" for recommendations.',
      'portfolio': 'A strong portfolio is essential. Ask about "build portfolio" for guidance.',
      'motivation': 'Staying motivated is key. Ask about "motivation" or "burnout" for advice.',
      'balance': 'Work-life balance matters. Ask about "work life balance" for tips.',
      'future': 'The future of work is evolving. Ask about "future of work" or "ai in jobs".',
      'learning': 'Continuous learning is crucial. Ask about "continuous learning" or "staying updated".',
      'experience': 'Experience matters. Ask about "entry level jobs" or "experienced professionals".',
      'industry': 'Different industries offer different opportunities. Ask about specific industries.',
      'degree': 'Education provides foundation. Ask about "computer science degree" or "bootcamp vs degree".',
      'project': 'Projects showcase skills. Ask about "side projects" or "build portfolio".',
      'github': 'GitHub is essential for developers. Ask about "github importance" for details.',
      'linkedin': 'LinkedIn is key for networking. Ask about "linkedin optimization".',
      'culture': 'Company culture affects satisfaction. Ask about "work culture" or "company culture".',
      'promotion': 'Career advancement is important. Ask about "promotion" or "performance review".',
      'security': 'Job security varies by industry. Ask about "job security" for insights.',
      'planning': 'Financial planning is wise. Ask about "financial planning" or "tax saving".'
    }
    
    for (const [word, response] of Object.entries(specificWords)) {
      if (message.includes(word)) {
        return response
      }
    }
    
    // Default response
    return 'I\'m AISHA, your AI career assistant! Ask me about trending skills, resume analysis, career advice, salary insights, or any job market questions. I\'m here to help you succeed! 🚀'
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage)
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">AISHA</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your AI Career Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${message.type === 'user' ? 'ml-2 mr-0' : ''}`}>
                      {message.type === 'user' ? (
                        <User size={16} className="text-blue-600" />
                      ) : (
                        <Bot size={16} className="text-purple-600" />
                      )}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start max-w-[80%]">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about careers, resumes, skills..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIAssistant