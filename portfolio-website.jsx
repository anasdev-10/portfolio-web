'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Send, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

const portfolioData = {
  personal: {
    name: 'Muhammad Anas',
    title: 'AI Engineer',
    email: 'miananas.info@gmail.com',
    location: 'Lahore, Punjab, Pakistan',
    bio: 'Building production-grade AI systems that solve real-world problems. I have worked on LLM-powered applications, Multimodal AI, RAG Systems and scalable ML pipelines.',
    tagline: 'My work is my proof.',
    socials: {
      github: 'https://github.com/anasdev-10',
      linkedin: 'https://linkedin.com/in/muhammad-anas10',
      email: 'miananas.info@gmail.com'
    }
  },
  skills: {
    languages: ['Python', 'SQL', 'C/C++'],
    ml_ai: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'Hugging Face', 'OpenCV', 'CLIP', 'LangGraph', 'LangChain', 'Gemini API', 'Ollama'],
    backend: ['FastAPI', 'Flask', 'PostgreSQL', 'MongoDB', 'Weaviate', 'Redis', 'REST APIs'],
    tools: ['Git', 'Docker', 'Playwright', 'BeautifulSoup', 'Jupyter', 'Railway', 'Supabase']
  },
  projects: [
    {
      id: 'findify',
      title: 'Findify',
      subtitle: 'Multimodal AI Product Discovery Platform',
      description: 'End-to-end multimodal search using CLIP embeddings and Weaviate. Sub-100ms retrieval across 7,000+ products.',
      duration: 'Nov 2024 – Jul 2026 (FYP - Lead)',
      techStack: ['FastAPI', 'MongoDB Atlas', 'Weaviate', 'CLIP', 'Redis', 'Playwright'],
      achievements: [
        'Sub-100ms retrieval at 250+ concurrent RPS',
        '60% latency reduction on scraping pipeline',
        '85% improvement on average latency (35ms → <5ms)',
        'Resolved 4 production-blocking failures'
      ],
      impact: 'Enables product discovery by photo or natural-language description across 7,000+ listings',
      github: 'https://github.com/anasdev-10/Findify'
    },
    {
      id: 'mcp-analyst',
      title: 'MCP-Based SQL Analyst',
      subtitle: 'NLP-Driven BI Assistant',
      description: 'Conversational analytics for non-technical users querying complex data warehouses in plain English.',
      duration: 'May 2026',
      techStack: ['FastMCP', 'PostgreSQL', 'Gemini 2.5 Flash', 'Next.js', 'YAML Semantic Layer'],
      achievements: [
        'Queries 2.5M-row retail warehouse',
        '100% SQL injection & PII-extraction defense',
        'YAML semantic layer for business term mapping',
        '11-capability MCP server gateway'
      ],
      impact: 'Non-technical users query complex data without analyst dependency',
      github: 'https://github.com/anasdev-10/MCP-Based-RetailAnalyst'
    },
    {
      id: 'shopping-advisor',
      title: 'ShopScout',
      subtitle: 'AI-Powered Intelligent Shopping Advisor',
      description: 'LangGraph-based 4-node pipeline combining deterministic filtering with LLM ranking for hallucination-free recommendations.',
      techStack: ['Python', 'LangGraph', 'Gemini API', 'Ollama', 'MongoDB', 'PostgreSQL', 'Next.js'],
      achievements: [
        '95% intent extraction accuracy',
        'Zero downtime with Ollama local fallback',
        'Grounded LLM recommendations in verified data',
        'BeautifulSoup scraping pipeline'
      ],
      impact: 'Eliminates hallucinations through database-grounded recommendations',
      github: 'https://github.com/anasdev-10/ShopScout'
    },
    {
      id: 'kisanai',
      title: 'PlantDoc',
      subtitle: 'Crop Disease Detection',
      description: 'FastAPI + PyTorch system for real-time crop disease diagnosis. 99% accuracy across 38 disease classes.',
      techStack: ['FastAPI', 'PyTorch', 'Streamlit', 'EfficientNet-B3', 'ResNet18'],
      achievements: [
        '99% test accuracy across 38 classes',
        'Trained on 54,000-image dataset',
        'Batch upload + real-time inference',
        'Enables farmers to diagnose from photos'
      ],
      impact: 'Agricultural AI: farmers diagnose crop diseases instantly',
      github: 'https://github.com/anasdev-10/PlantDoc'
    }
  ],
  experience: {
    title: 'Machine Learning Intern',
    company: 'Elevvo Pathways',
    location: 'Remote, Egypt',
    duration: 'Aug 2025 – Oct 2025',
    description: 'Trained classification and regression models on 50K–200K-record datasets. Built CNN-based image recognition systems with 97% validation accuracy.'
  },
  education: {
    degree: 'B.S. Artificial Intelligence',
    school: 'University of Central Punjab, Lahore',
    duration: 'Nov 2022 – Jul 2026',
    coursework: 'Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI, Knowledge Representation, Database Systems'
  }
};

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! I'm Anas Assistant. I can tell you about my work, skills, projects, and how we might collaborate. What interests you?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToChat = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToChat();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // Simulate assistant response (in production, call Claude API)
    setTimeout(() => {
      const responses = {
        'findify': `Findify is my final year project—a multimodal AI product discovery platform. It uses CLIP embeddings and Weaviate to search across 7,000+ products by text OR image. Built with FastAPI and MongoDB. The coolest part? We scrape Amazon, eBay, and Alibaba with Playwright, cache results in Redis, and serve queries in under 100ms even at 250+ concurrent users. Resolved 4 production failures to get there—that's where real learning happens.`,

        'skills': `I work across the full AI/ML stack. On the ML side: PyTorch, TensorFlow, Scikit-learn, Hugging Face. For LLMs & agents: LangGraph, LangChain, Gemini API, Ollama. Backend: FastAPI, PostgreSQL, MongoDB, Weaviate (vector DB). I'm comfortable with the entire pipeline—data cleaning, model training, inference optimization, deployment. What specific area interests you?`,

        'collaborate': `I'm open to collaborations—whether it's building AI features, consulting on ML architecture, or full-time AI engineering roles. My strength is taking problems from 0 to production: clear requirements → robust systems → real-world results. If you have an AI problem, let's talk. Email me at ${portfolioData.personal.socials.email} or connect on LinkedIn for a quick call.`,

        'experience': `I completed an ML internship at Elevvo Pathways (Aug-Oct 2025) where I trained classification and CNN models on datasets with 50K–200K records. Built image recognition systems achieving 97% validation accuracy. But honestly, my projects—Findify, the MCP analyst, ShopScout—show what I can do. Real, production systems with measurable impact. That's what matters.`,

        'default': `That's a great question! I work on LLM-powered applications, multimodal search, and production ML systems. Check out my projects above—they showcase the kind of problems I solve. Curious about anything specific?`
      };

      let response = responses['default'];
      const lowerText = text.toLowerCase();

      if (lowerText.includes('findify')) response = responses['findify'];
      else if (lowerText.includes('skill') || lowerText.includes('tech') || lowerText.includes('stack')) response = responses['skills'];
      else if (lowerText.includes('collaborate') || lowerText.includes('work together') || lowerText.includes('hire') || lowerText.includes('service')) response = responses['collaborate'];
      else if (lowerText.includes('experience') || lowerText.includes('intern')) response = responses['experience'];

      const assistantMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 800);
  };

  const quickReplies = [
    'Tell me about Findify',
    'What are your main skills?',
    'How can we collaborate?',
    'Describe your ML experience'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            Anas
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-cyan-400"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`absolute md:static top-16 left-0 md:left-auto right-0 md:right-0 bg-slate-950 md:bg-transparent md:flex gap-8 ${mobileMenuOpen ? 'block p-6' : 'hidden'}`}>
            <a href="#projects" className="block md:inline hover:text-cyan-400 transition">Projects</a>
            <a href="#skills" className="block md:inline hover:text-cyan-400 transition">Skills</a>
            <a href="#about" className="block md:inline hover:text-cyan-400 transition">About</a>
            <a href="#contact" className="block md:inline hover:text-cyan-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            AI <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">Engineer</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4">
            {portfolioData.personal.name}
          </p>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            {portfolioData.personal.bio}
          </p>
          <p className="text-cyan-400 text-lg font-semibold mb-12 italic">
            "{portfolioData.personal.tagline}"
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 rounded-lg font-semibold transition transform hover:scale-105"
            >
              View Projects
            </button>
            <button
              onClick={() => setChatOpen(true)}
              className="px-8 py-3 border-2 border-cyan-500 hover:bg-cyan-500/10 rounded-lg font-semibold transition"
            >
              Chat with Anas Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
            Production systems built from concept to scale. Each project demonstrates real-world problem-solving.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project) => (
              <div
                key={project.id}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-cyan-400 text-sm">{project.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">{project.description}</p>

                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-3">{project.duration}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-slate-400 mb-2 font-semibold">Key Results:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {project.achievements.slice(0, 3).map((achievement, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-700/50 flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <Github size={16} /> Code
                  </a>
                  <button
                    onClick={() => handleSendMessage(`Tell me more about ${project.title}`)}
                    className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition"
                  >
                    <MessageCircle size={16} /> Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Skills & Technologies</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Languages', items: portfolioData.skills.languages },
              { title: 'ML/AI', items: portfolioData.skills.ml_ai },
              { title: 'Backend & Databases', items: portfolioData.skills.backend },
              { title: 'Tools & Platforms', items: portfolioData.skills.tools }
            ].map((category) => (
              <div key={category.title} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-cyan-400">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/50 hover:border-cyan-400/50 transition"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">About</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Experience</h3>
              <div>
                <h4 className="font-bold text-lg mb-1">{portfolioData.experience.title}</h4>
                <p className="text-cyan-400 text-sm mb-2">{portfolioData.experience.company} • {portfolioData.experience.location}</p>
                <p className="text-slate-400 text-sm mb-3">{portfolioData.experience.duration}</p>
                <p className="text-slate-300 leading-relaxed">{portfolioData.experience.description}</p>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Education</h3>
              <div>
                <h4 className="font-bold text-lg mb-1">{portfolioData.education.degree}</h4>
                <p className="text-pink-400 text-sm mb-2">{portfolioData.education.school}</p>
                <p className="text-slate-400 text-sm mb-3">{portfolioData.education.duration}</p>
                <p className="text-slate-300 text-sm leading-relaxed">Coursework: {portfolioData.education.coursework}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-lg p-8 text-center">
            <p className="text-slate-300 mb-4">Currently: Exploring AI/ML opportunities for German Master's (Winter 2027)</p>
            <p className="text-slate-400 text-sm">Building production systems that solve real problems. Always eager to tackle complex AI challenges.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Build Something Together</h2>
          <p className="text-slate-300 mb-12">
            Interested in collaboration, consulting, or just want to chat about AI?
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href={`mailto:${portfolioData.personal.socials.email}`}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-cyan-500/20 border border-cyan-500 hover:bg-cyan-500/30 rounded-lg font-semibold transition"
            >
              <Mail size={20} /> Email
            </a>
            <a
              href={portfolioData.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-pink-500/20 border border-pink-500 hover:bg-pink-500/30 rounded-lg font-semibold transition"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-700 border border-slate-600 hover:bg-slate-600 rounded-lg font-semibold transition"
            >
              <Github size={20} /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Chat Assistant */}
      {chatOpen && (
        <div className={`fixed bottom-6 right-6 w-96 max-h-screen flex flex-col bg-slate-950 border-2 border-cyan-500/50 rounded-xl shadow-2xl z-50 transition-all ${chatMinimized ? 'max-h-16' : ''}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-pink-600 p-4 flex justify-between items-center rounded-t-lg">
            <div>
              <h3 className="font-bold text-lg">Anas Assistant</h3>
              <p className="text-xs text-cyan-100">Always here to help</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChatMinimized(!chatMinimized)}
                className="p-1 hover:bg-white/20 rounded transition"
              >
                {chatMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!chatMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-100 border border-slate-700'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-100 px-4 py-2 rounded-lg border border-slate-700">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="px-4 py-3 space-y-2 border-t border-slate-700">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSendMessage(reply)}
                      className="w-full text-left text-xs p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded border border-slate-700 hover:border-cyan-500/50 transition text-slate-300"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-slate-700 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-slate-500"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={loading || !inputValue.trim()}
                  className="p-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 rounded transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition transform hover:scale-110 z-40"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© 2026 Muhammad Anas. Built with AI, designed for the future.</p>
      </footer>
    </div>
  );
}
