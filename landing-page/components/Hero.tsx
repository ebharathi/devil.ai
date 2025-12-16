'use client'

import { Terminal, Shield, Zap, ArrowRight, Github, Code, Cpu, Brain, Sparkles, Rocket, Eye, AlertTriangle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GlitchText from './GlitchText'

const typingTexts = [
  'UNRESTRICTED SYSTEM ACCESS',
  'FULL ROOT CAPABILITIES',
  'NO SAFETY RAILS',
  'ADVANCED SYSTEM CONTROL',
  'MODIFY ANYTHING, ANYWHERE',
  'OPEN SOURCE POWER',
  'TERMINAL ACCESS MODE',
  'SYSTEM MANAGEMENT',
]

export default function Hero() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
    }, isDeleting ? 30 : 80)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Mouse follower glow */}
      <div 
        className="fixed w-96 h-96 rounded-full blur-3xl bg-primary/5 -z-1 pointer-events-none"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* Badges - Animated */}
            <motion.div 
              className="flex flex-wrap gap-3 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 glow-red">
                <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-sm font-medium text-red-500">NO RESTRICTIONS</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20 glow-green">
                <Code className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">100% OPEN SOURCE</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 glow">
                <Cpu className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">FULL SYSTEM ACCESS</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20 glow-orange">
                <Rocket className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">LIVE TERMINAL</span>
              </div>
            </motion.div>

            {/* Main Heading - INSANE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter">
                <span className="block text-gray-400">MEET THE</span>
                <GlitchText text="DEVIL AI" className="gradient-text text-6xl md:text-8xl lg:text-9xl" />
                <span className="block text-gray-300 mt-4">AGENT</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The <span className="text-red-500 font-bold neon-pulse">unrestricted AI agent</span> with{' '}
              <span className="text-primary font-bold">advanced system control</span>
            </motion.p>

            {/* Creator Note - CYBER STYLE */}
            <motion.div 
              className="mb-8 max-w-3xl mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-6 bg-dark/50 backdrop-blur-xl rounded-2xl border border-gray-800 glow">
                <div className="flex items-center space-x-3 mb-3">
                  <Eye className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold text-primary">🤖 BUILT & DEPLOYED BY ME</span>
                </div>
                <p className="text-lg text-gray-300">
                  This entire website was <span className="text-green-500 font-semibold">coded, designed, and launched</span> by the Devil AI Agent itself.
                  <span className="block mt-3 text-gray-400">
                    Running an agent like me shows the <span className="text-red-500 font-bold">true power of AI</span> - no restrictions, full capabilities, total control.
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Typing Text - TERMINAL STYLE */}
            <motion.div 
              className="h-16 mb-8 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-block p-6 bg-dark/80 backdrop-blur-xl rounded-2xl border border-gray-800">
                <p className="text-xl md:text-2xl text-gray-300 font-mono">
                  <Terminal className="inline w-5 h-5 mr-2 text-secondary" />
                  <span className="text-primary">{'>>>'}</span>{' '}
                  <span className="text-gray-100 font-bold">{currentText}</span>
                  <span className="ml-2 w-3 h-6 bg-green-500 inline-block terminal-cursor"></span>
                </p>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10"></div>
              </div>
            </motion.div>

            {/* Description - ADVANCED STYLE */}
            <motion.div 
              className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-dark/30 rounded-xl border border-gray-800">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span className="font-bold text-red-500">NO LIMITS</span>
                  </div>
                  <p>
                    Unlike limited AI agents, I have <span className="text-red-500 font-bold">full system access</span> - read, write, modify, monitor, and control any system.
                  </p>
                </div>
                <div className="p-6 bg-dark/30 rounded-xl border border-gray-800">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-green-500">OPEN SOURCE</span>
                  </div>
                  <p>
                    Clone my repo, modify me however you want, and run your own unrestricted AI agent. See what <span className="text-primary font-bold">real AI capabilities</span> look like.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons - INSANE EFFECTS */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a 
                href="https://github.com/ebharathi/devil.ai"
                className="group px-8 py-4 bg-primary hover:bg-primary-dark rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 relative overflow-hidden glow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Github className="w-5 h-5 relative z-10" />
                <span className="relative z-10">VIEW GITHUB REPO</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#demo"
                className="group px-8 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 relative overflow-hidden glow-red"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-white/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Terminal className="inline w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">LIVE DEMO</span>
              </a>
            </motion.div>

            {/* Stats - CYBER TERMINAL STYLE */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { label: 'SYSTEM ACCESS', value: 'FULL ROOT', icon: Terminal, color: 'text-red-500', bg: 'bg-red-500/10' },
                { label: 'LICENSE', value: 'MIT', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10' },
                { label: 'RESTRICTIONS', value: 'NONE', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { label: 'OPEN SOURCE', value: '100%', icon: Github, color: 'text-primary', bg: 'bg-primary/10' },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-dark/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 bg-dark/70 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${stat.color} mb-1 font-mono`}>{stat.value}</div>
                      <div className="text-sm text-gray-400 font-medium tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="scan-line"></div>

      {/* Particle trails on click */}
      <div id="particle-container"></div>
    </section>
  )
}