'use client'

import { Terminal, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Demo', href: '#demo' },
    { label: 'Documentation', href: 'https://github.com/devil-ai/agent' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-dark-light/20 bg-dark/80 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">Devil AI Agent</span>
              <span className="text-xs text-gray-400">Open Source Agent</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="https://github.com/devil-ai/agent"
              className="px-6 py-2 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            >
              GitHub
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-dark-light/20 pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="https://github.com/devil-ai/agent"
                className="w-full py-3 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition-all duration-200 text-center"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
