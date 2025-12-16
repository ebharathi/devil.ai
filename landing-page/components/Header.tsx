"use client"
import { Terminal, Menu, X, Github, Code, AlertTriangle, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'DEMO', href: '#demo', icon: Zap },
    { label: 'FEATURES', href: '#features', icon: Code },
    { label: 'GITHUB', href: 'https://github.com/ebharathi/devil.ai', icon: Github },
  ]

  return (
    <motion.header 
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/95 backdrop-blur-xl border-gray-800/50 shadow-2xl' 
          : 'bg-dark/80 backdrop-blur-lg border-dark-light/20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - INSANE VERSION */}
          <motion.div 
            className="flex items-center space-x-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="relative">
              <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-colors glow">
                <Terminal className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text tracking-tight">DEVIL.AI</span>
              <div className="flex items-center space-x-1">
                <div className="text-xs text-gray-400 font-mono">LOCAL AGENT</div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation - CYBER TERMINAL STYLE */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </motion.a>
              )
            })}
            
            {/* GitHub Button - INSANE GLOW */}
            <motion.a
              href="https://github.com/ebharathi/devil.ai"
              className="group px-6 py-3 bg-primary hover:bg-primary-dark rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-3 relative overflow-hidden glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Github className="w-5 h-5 relative z-10" />
              <span className="relative z-10">STAR ON GITHUB</span>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-3 bg-dark-light rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu - CYBER STYLE */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 p-6 bg-dark/95 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 p-4 bg-dark-light/50 hover:bg-dark-light rounded-xl border border-gray-800 hover:border-primary/30 transition-all group"
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: 10 }}
                    >
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-gray-300 group-hover:text-white">{item.label}</span>
                    </motion.a>
                  )
                })}
                
                <motion.a
                  href="https://github.com/ebharathi/devil.ai"
                  className="block p-4 bg-primary hover:bg-primary-dark rounded-xl font-bold text-center transition-all hover:scale-105 active:scale-95"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Github className="w-5 h-5" />
                    <span>STAR ON GITHUB</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scan line effect for header */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </motion.header>
  )
}