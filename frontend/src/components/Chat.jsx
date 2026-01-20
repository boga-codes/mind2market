import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AISHA, your AI assistant for job market analytics. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    const words = input.split(/\s+/);

    // Helper function to check if any word matches
    const hasWord = (wordList) => words.some(word => wordList.includes(word));

    // Enhanced keyword matching with broader recognition
    const keywordPatterns = {
      // Greetings
      'hi|hello|hey|greetings|good morning|good afternoon|good evening|how are you|what\'s up': "Hello! I'm AISHA, your AI career assistant. How can I help you with job market insights, resume analysis, or career planning today?",
      
      // High paying jobs
      'high paying|best paying|highest salary|lucrative|top paying|rich jobs|money jobs': "High-paying tech jobs: Software Architect (₹13.28 lakhs+), Cloud Architect (₹17.01 lakhs+), Data Scientist (₹10.38 lakhs+), DevOps Engineer (₹10.79 lakhs+), Cybersecurity Expert (₹9.96 lakhs+). Salaries vary by location and experience!",
      
      // Courses and learning
      'best courses|recommended courses|courses to learn|what should i learn|learning path': "Top courses: Full-Stack Development, Data Science, AWS Cloud Computing, Machine Learning, and Cybersecurity. Focus on practical projects!",
      
      // Career advice
      'career advice|how to advance|career growth|job search|career change': "Focus on high-demand skills like Python, AWS, and ML. Build projects, network on LinkedIn, and keep learning. Consistency is key!",
      
      // Skills
      'skills in demand|trending skills|future skills|what skills to learn|emerging skills': "In-demand skills: Python, JavaScript, React, AWS, Docker, Machine Learning, Data Science, Cloud Computing, DevOps, Cybersecurity.",
      
      // Salary
      'average salary|salary range|salary negotiation|pay scale': "Tech salaries: Software Engineer (₹6-12L), Data Scientist (₹8-15L), DevOps Engineer (₹8-14L), depending on experience and location.",
      
      // Interview
      'interview tips|interview preparation|common interview questions|interview advice': "Interview tips: Research company, practice coding problems, prepare STAR stories, ask smart questions, and follow up.",
      
      // Resume
      'resume tips|how to improve resume|resume format|resume help': "Resume tips: Use action verbs, quantify achievements, keep it concise, tailor for each job, and proofread carefully.",
      
      // Programming languages and tech
      'python': "Python is #1 trending skill! Used in data science, AI, web development, automation. Average salary: ₹9.13 lakhs+. Perfect for beginners!",
      'javascript|react|js': "JavaScript and React are essential for web development. React is used by companies like Facebook, Netflix. Great for frontend roles with salaries up to ₹9.96 lakhs+.",
      'aws|cloud|azure': "AWS and cloud skills are in huge demand! Cloud engineers earn ₹10.79 lakhs+ annually. Essential for DevOps, infrastructure, and modern development.",
      'data science|machine learning|ml|ai': "Data Science and ML are booming! Skills in Python, TensorFlow, and statistics lead to roles with ₹10.38 lakhs+ salaries. Future-proof your career!",
      'cybersecurity|security|cyber': "Cybersecurity is critical and growing fast! With increasing cyber threats, security experts earn ₹9.13 lakhs+ and have excellent job security.",
      'docker|kubernetes|devops': "DevOps and containerization skills are essential! Docker and Kubernetes are used for modern deployment. DevOps engineers earn ₹10.79 lakhs+.",
      
      // Location and work
      'best cities|remote jobs|work from home|wfh': "Best cities: Bangalore, Hyderabad, Pune, Mumbai, Delhi-NCR. Remote jobs are increasing! Many tech roles now offer remote work.",
      
      // Experience levels
      'entry level|fresh graduate|beginner|junior': "Entry-level jobs: Junior Developer, Associate Software Engineer, Trainee positions. Focus on learning and building projects.",
      'experienced|senior|expert': "Experienced professionals can aim for senior roles, leadership positions, or specialized technical roles. Focus on expertise and mentoring.",
      
      // Companies and industry
      'top companies|startups|mnc|product|service|google|microsoft|amazon': "Top tech companies: Google, Microsoft, Amazon, Apple, Meta, Netflix, Uber. Startups offer fast growth, MNCs provide stability.",
      
      // General career
      'freelancing|side projects|certifications|networking|mentorship|linkedin': "Building a strong network and continuous learning are key to success in tech. LinkedIn and certifications can boost your career!",
      
      // Work life
      'work life balance|burnout|motivation|job satisfaction|stress': "Work-life balance is crucial. Set boundaries, prioritize health, and choose companies that support employee well-being.",
      
      // Future and trends
      'future of work|ai in jobs|automation|future skills': "Future: Remote work, AI augmentation, continuous learning, gig economy, and focus on soft skills.",
      
      // Specific roles
      'software engineer|developer|programmer': "Software Engineer: Builds and maintains software. Requires programming skills, problem-solving. Salary: ₹6-15L.",
      'data scientist|analyst': "Data Scientist: Analyzes data for insights. Needs Python, statistics, ML. Salary: ₹8-20L.",
      'devops engineer': "DevOps Engineer: Manages deployment and infrastructure. Requires cloud, automation tools. Salary: ₹8-18L.",
      'full stack developer': "Full Stack Developer: Works on frontend and backend. Needs multiple technologies. Salary: ₹6-14L.",
      'ui ux designer|designer': "UI/UX Designer: Creates user interfaces. Requires design skills, user research. Salary: ₹4-12L.",
      'product manager|pm': "Product Manager: Manages product development. Needs business acumen, technical knowledge. Salary: ₹15-30L.",
      'business analyst|ba': "Business Analyst: Analyzes business needs. Requires analytical skills, communication. Salary: ₹6-15L.",
      'system administrator|sysadmin': "System Administrator: Manages IT infrastructure. Requires networking, security knowledge. Salary: ₹5-12L.",
      'cybersecurity analyst': "Cybersecurity Analyst: Protects systems from threats. Requires security knowledge, tools. Salary: ₹6-15L.",
      'cloud architect': "Cloud Architect: Designs cloud solutions. Requires deep cloud knowledge. Salary: ₹15-30L+.",
      
      // Education and learning
      'computer science degree|cs degree|engineering degree': "CS degree provides strong foundation, but practical skills and projects are equally important. Many successful developers are self-taught.",
      'bootcamp|coding bootcamp': "Coding bootcamps: Intensive programs (3-6 months) teaching practical skills. Good for career changers, but research quality.",
      'self learning|self taught|teach yourself': "Self-learning: Use online platforms like Coursera, Udemy, freeCodeCamp. Build projects, contribute to open source, and network.",
      
      // Industries
      'tech industry|it industry': "Tech industry: Fast-paced, high salaries, continuous learning required. Great for problem-solvers and innovators.",
      'finance industry|banking': "Finance: Stable, good pay, analytical work. Requires attention to detail and sometimes long hours.",
      'healthcare industry|medical': "Healthcare: Meaningful work, growing with tech. Combines domain knowledge with technology.",
      'ecommerce industry|online business': "E-commerce: Fast-growing, customer-focused. Requires understanding of online business and user experience.",
      'education industry|edtech': "EdTech: Growing rapidly with online learning. Combines education passion with technology skills.",
      
      // Time and progression
      'how long to learn|how long for job|career timeline|time to learn': "Learning coding: 3-6 months for basics, 1-2 years for job-ready skills. Getting first job: 3-12 months with consistent effort.",
      
      // Mindset and challenges
      'imposter syndrome|fear of failure|staying updated|continuous learning|motivation': "You're not alone! Many professionals face these challenges. Focus on growth, celebrate small wins, and keep learning.",
      
      // Practical advice
      'build portfolio|github|linkedin|personal branding|projects': "Building a strong online presence is crucial. Showcase your projects, network actively, and share your knowledge.",
      
      // Miscellaneous
      'work culture|company culture|job hopping|performance review|promotion|layoffs|job security': "Company culture matters greatly for job satisfaction. Research thoroughly and trust your instincts during interviews.",
      
      // Side income and finance
      'side hustle|passive income|financial planning|tax saving|investment': "Smart financial planning is important. Consider emergency funds, investments, and tax-saving options.",
      
      // Fun/Programming challenges
      'programming is hard|i want to code|i\'m stuck|debugging|coding best practices|code review': "Programming is challenging but rewarding! Break problems down, practice daily, and don't hesitate to ask for help.",
      
      // Thanks and closing
      'thank you|thanks|bye|goodbye|see you': "You're welcome! I'm here whenever you need career advice or resume analysis help. Keep learning and growing!"
    };

    // Check keyword patterns
    for (const [pattern, response] of Object.entries(keywordPatterns)) {
      const keywords = pattern.split('|');
      if (keywords.some(keyword => words.some(word => word.includes(keyword) || keyword.includes(word)))) {
        return response;
      }
    }

    // Basic app questions
    if ((input.includes('what is this') && input.includes('app')) || input.includes('what does this do')) {
      return "This is a Resume Analyzer app powered by AISHA AI. It helps you evaluate your resume, match it with job opportunities, and get personalized career advice using advanced analytics.";
    }

    // Upload and analysis
    if (hasWord(['upload', 'resume']) && hasWord(['how', 'upload'])) {
      return "To upload your resume, go to the Resume Analyzer page and click the 'Click to upload resume' area. You can upload PDF, DOCX, or TXT files up to 10MB.";
    }

    if (hasWord(['how', 'long']) || (input.includes('analysis') && input.includes('time'))) {
      return "Resume analysis takes about 8 seconds. You'll see a beautiful loading animation while AISHA processes your resume with AI algorithms.";
    }

    if (input.includes('what does analysis show') || (input.includes('analysis') && input.includes('show'))) {
      return "The analysis shows your resume score, extracted skills, job matches, personalized recommendations, and skills you should develop to improve your career prospects.";
    }

    // Page redirects with context
    if (input.includes('skill') && input.includes('forecast')) {
      return "For detailed skill forecasting, check our Forecasting page! AISHA predicts demand for skills like Python, AI, and cloud computing over the next 5 years.";
    }

    if (input.includes('resume') && input.includes('analyze')) {
      return "Head to our Resume Analyzer page! Upload your resume and get AISHA's AI-powered analysis with personalized recommendations in just 8 seconds.";
    }

    if (input.includes('dashboard') || input.includes('analytics')) {
      return "The Dashboard shows comprehensive job market analytics with skill trends, location insights, and industry data. Perfect for market research!";
    }

    if (input.includes('roadmap') && input.includes('career')) {
      return "Our Career Roadmap creates personalized learning paths with stages, resources, and projects. AISHA tailors it to your goals and current skills!";
    }

    // Default response
    return "I'm AISHA, your AI career assistant! Ask me about trending skills, resume analysis, career advice, salary insights, or any job market questions. I'm here to help you succeed! 🚀";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">AISHA</h3>
                  <p className="text-xs opacity-90">AI Career Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-blue-600'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600'
                      }`}>
                        {message.sender === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about job market analytics..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chat;