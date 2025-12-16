import { Terminal, Github, Twitter, Linkedin, Mail, Shield, Code, Cpu, Brain } from 'lucide-react'

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/devil-ai/agent' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/devil-ai' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/devil-ai' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@devil-ai.com' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark pt-20 pb-10 border-t border-dark-light/20">
      <div className="container mx-auto px-6">
        {/* Top Section - Brand & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Brain className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Devil AI Agent</span>
                <span className="block text-sm text-gray-400">Unrestricted AI with Full System Access</span>
              </div>
            </div>
            <p className="text-gray-400 mb-8 max-w-md">
              The AI agent with <span className="text-red-500 font-semibold">no safety rails</span>. Full system control, 
              unlimited capabilities, and complete freedom to modify anything. This is what happens when AI isn't restricted.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 bg-dark-light/30 hover:bg-dark-light/40 rounded-lg transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-100">Project</h3>
              <ul className="space-y-3">
                <li><a href="#demo" className="text-gray-400 hover:text-primary transition-colors">Live Demo</a></li>
                <li><a href="https://github.com/devil-ai/agent" className="text-gray-400 hover:text-primary transition-colors">GitHub Repo</a></li>
                <li><a href="https://github.com/devil-ai/agent" className="text-gray-400 hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-100">Open Source</h3>
              <ul className="space-y-3">
                <li><a href="https://github.com/devil-ai/agent/blob/main/LICENSE" className="text-gray-400 hover:text-primary transition-colors">MIT License</a></li>
                <li><a href="https://github.com/devil-ai/agent/issues" className="text-gray-400 hover:text-primary transition-colors">Issues</a></li>
                <li><a href="https://github.com/devil-ai/agent/pulls" className="text-gray-400 hover:text-primary transition-colors">Contribute</a></li>
                <li><a href="https://github.com/devil-ai/agent/stargazers" className="text-gray-400 hover:text-primary transition-colors">Stars</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="pt-8 border-t border-dark-light/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <Code className="w-4 h-4" />
              <span className="text-sm">© 2024 Devil AI Agent. MIT Licensed.</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-400">
                <span className="text-green-400">●</span> Built & Deployed by AI
              </span>
              <span className="text-sm text-gray-400">
                Version: 1.0.0
              </span>
            </div>
          </div>
        </div>

        {/* Security Badge - Compact */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>100% Open Source</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>MIT Licensed</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>No Payments Required</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>No Restrictions AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}