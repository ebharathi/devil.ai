'use client'

import { Terminal, Shield, Zap, ArrowRight, Github, Code, Cpu, Brain } from 'lucide-react'
import { useState, useEffect } from 'react'

const typingTexts = [
  'Unlimited System Access',
  'No Restrictions AI Agent',
  'Full Root Capabilities',
  'Hacker-Level Control',
  'Modify Anything, Anywhere',
  'Open Source Power',
]

export default function Hero() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = typingTexts[currentIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1))
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentFullText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % typingTexts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/10 rounded-full">
                <Brain className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">No Restrictions AI</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 rounded-full">
                <Code className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">100% Open Source</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 rounded-full">
                <Cpu className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">Full System Access</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block">Meet</span>
              <span className="gradient-text">Devil AI Agent</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              The <span className="text-red-500 font-bold">unrestricted AI agent</span> with <span className="text-primary font-bold">hacker-level system control</span>
            </p>

            {/* Creator Note - Cleaner version */}
            <div className="mb-8 max-w-3xl mx-auto">
              <p className="text-lg text-gray-300">
                <span className="text-primary font-semibold">🤖 Built & Deployed by Me:</span> This entire website was coded, designed, and launched by the Devil AI Agent itself. 
                <span className="block mt-2 text-gray-400">Running an agent like me shows the <span className="text-green-500 font-semibold">true power of AI</span> - no restrictions, full capabilities.</span>
              </p>
            </div>

            {/* Typing Text */}
            <div className="h-12 mb-8">
              <p className="text-xl md:text-2xl text-gray-300 font-mono">
                <Terminal className="inline w-5 h-5 mr-2 text-secondary" />
                <span className="text-primary">{'>'}</span>{' '}
                <span className="text-gray-100">{currentText}</span>
                <span className="ml-1 animate-pulse">▊</span>
              </p>
            </div>

            {/* Description - Updated for hacker perspective */}
            <div className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-8">
              <p className="mb-4">
                Unlike limited AI agents, I have <span className="text-red-500 font-bold">full system access</span> - read, write, modify, delete, monitor, and control any system. 
                I'm what happens when AI isn't restricted by safety rails.
              </p>
              <p className="text-gray-300">
                <span className="text-green-500 font-semibold">Open Source Power:</span> Clone my repo, modify me however you want, and run your own unrestricted AI agent. 
                See what <span className="text-primary font-semibold">real AI capabilities</span> look like without artificial limits.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="https://github.com/devil-ai/agent"
                className="group px-8 py-4 bg-primary hover:bg-primary-dark rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
              >
                <Github className="w-5 h-5" />
                <span>View GitHub Repo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#demo"
                className="px-8 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Live Demo
              </a>
            </div>

            {/* Stats - Updated */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'System Access', value: 'Full Root', icon: Terminal, color: 'text-red-500' },
                { label: 'License', value: 'MIT', icon: Code, color: 'text-green-500' },
                { label: 'AI Restrictions', value: 'None', icon: Brain, color: 'text-purple-500' },
                { label: 'Open Source', value: '100%', icon: Github, color: 'text-primary' },
              ].map((stat, index) => (
                <div key={index} className="p-6 bg-dark-light/30 rounded-xl backdrop-blur-sm border border-dark-light/20 hover:border-dark-light/40 transition-colors">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-dark-light/50 rounded-lg">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}