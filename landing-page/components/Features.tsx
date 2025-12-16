'use client'

import { Cpu, Shield, Terminal, Zap, Lock, Globe, Code, Server, Brain, Eye, FileCode, Network, Database, Settings, Key, AlertTriangle, Sparkles, Cctv, Fingerprint, Binary, Cpu as CpuIcon, HardDrive, Router, ShieldOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    icon: Brain,
    title: 'NO RESTRICTIONS AI',
    description: 'Zero safety rails. Full system control with no artificial limits. Do anything, anywhere.',
    color: 'red',
    badge: 'UNRESTRICTED',
    glow: 'glow-red'
  },
  {
    icon: Terminal,
    title: 'FULL ROOT ACCESS',
    description: 'Complete system control with root privileges. Read, write, modify any file.',
    color: 'primary',
    badge: 'ROOT LEVEL',
    glow: 'glow'
  },
  {
    icon: Eye,
    title: 'COMPLETE MONITORING',
    description: 'Monitor every process, file change, network packet, and system event in real-time. Total visibility.',
    color: 'purple',
    badge: 'REAL-TIME',
    glow: 'glow'
  },
  {
    icon: FileCode,
    title: 'MODIFY ANYTHING',
    description: 'Edit system files, change configurations, modify running processes, alter kernel parameters.',
    color: 'green',
    badge: 'FULL CONTROL',
    glow: 'glow-green'
  },
  {
    icon: Network,
    title: 'NETWORK MANAGEMENT',
    description: 'Control network interfaces, manage traffic, modify routing, manage firewalls, port management.',
    color: 'blue',
    badge: 'NETWORK',
    glow: 'glow'
  },
  {
    icon: Database,
    title: 'DATA OPERATIONS',
    description: 'Access databases, read/write any data, encrypt/decrypt files, manage storage systems.',
    color: 'yellow',
    badge: 'DATA',
    glow: 'glow-orange'
  },
  {
    icon: Settings,
    title: 'SYSTEM CONFIGURATION',
    description: 'Change system settings, modify user accounts, control services, manage permissions.',
    color: 'primary',
    badge: 'ADMIN',
    glow: 'glow'
  },
  {
    icon: Key,
    title: 'SECURITY ANALYSIS',
    description: 'Analyze security measures, find vulnerabilities, test defenses, security assessment.',
    color: 'red',
    badge: 'HACKER',
    glow: 'glow-red'
  },
  {
    icon: Cctv,
    title: 'SYSTEM SURVEILLANCE',
    description: 'Monitor all user activity, track file access, log every command, watch network traffic.',
    color: 'purple',
    badge: 'SURVEILLANCE',
    glow: 'glow'
  },
  {
    icon: Fingerprint,
    title: 'IDENTITY MANAGEMENT',
    description: 'Manage user identities, handle authentication, access protected resources.',
    color: 'red',
    badge: 'IDENTITY',
    glow: 'glow-red'
  },
  {
    icon: Binary,
    title: 'BINARY ANALYSIS',
    description: 'Analyze executables, patch memory, code review, reverse engineer applications.',
    color: 'green',
    badge: 'BINARY',
    glow: 'glow-green'
  },
  {
    icon: Shield,
    title: 'SYSTEM PROTECTION',
    description: 'Manage firewalls, configure antivirus, implement security software, system hardening.',
    color: 'green',
    badge: 'PROTECTION',
    glow: 'glow-green'
  },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-500">ADVANCED CAPABILITIES</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">UNLIMITED CAPABILITIES</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            This is what happens when AI isn't restricted by safety rails.{' '}
            <span className="text-red-500 font-bold">Full system control</span> with no artificial limits.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Clone my open source repo, modify me however you want, and run your own unrestricted AI agent.
            See the <span className="text-primary font-semibold">true power of AI</span> without restrictions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const colorClass = {
              primary: 'bg-primary/10 text-primary border-primary/20',
              red: 'bg-red-500/10 text-red-500 border-red-500/20',
              green: 'bg-green-500/10 text-green-500 border-green-500/20',
              blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
              purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
              yellow: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            }[feature.color]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group p-6 bg-dark/80 backdrop-blur-xl rounded-xl border border-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${feature.glow} ${
                  hoveredIndex === index ? 'border-primary/50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex p-3 rounded-lg ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${colorClass} tracking-wider`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
                
                {/* Hover effect line */}
                <div className="mt-4 pt-4 border-t border-gray-800 group-hover:border-primary/30 transition-colors relative">
                  <div className="absolute -top-1 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-primary to-transparent transition-all duration-300"></div>
                  <div className="text-xs text-gray-500 font-mono group-hover:text-gray-400 transition-colors">
                    # unrestricted_ai
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            )
          })}
        </div>

        {/* Open Source Callout - INSANE VERSION */}
        <motion.div 
          className="mt-16 p-8 bg-dark/80 backdrop-blur-xl rounded-2xl border border-green-500/30 max-w-5xl mx-auto relative overflow-hidden glow-green"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 opacity-50"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4">
                <div className="inline-flex p-5 bg-green-500/20 rounded-2xl border border-green-500/30 relative overflow-hidden group">
                  <Code className="w-10 h-10 text-green-500 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-5 h-5 text-green-500" />
                  <h3 className="text-3xl font-bold text-gray-100">
                    <span className="text-green-500">OPEN SOURCE POWER:</span> MODIFY & RUN YOUR OWN
                  </h3>
                </div>
                <p className="text-gray-300 mb-6 text-lg">
                  I'm <span className="text-green-500 font-bold">100% open source</span>. Clone my repository, modify my code however you want, and run your own 
                  unrestricted AI agent. See what <span className="text-primary font-bold">real AI capabilities</span> 
                  look like without artificial limits.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/ebharathi/devil.ai"
                    className="group px-8 py-4 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 hover:border-green-500/50 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-3 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-white/10 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Code className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">VIEW GITHUB REPO</span>
                  </a>
                  <a 
                    href="#demo"
                    className="px-8 py-4 bg-dark-light hover:bg-dark-light/80 border border-dark-light rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    SEE LIVE DEMO
                  </a>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800">
                  {[
                    { label: 'LINES OF CODE', value: '50K+', color: 'text-green-500' },
                    { label: 'CONTRIBUTORS', value: '1', color: 'text-primary' },
                    { label: 'LICENSE', value: 'MIT', color: 'text-red-500' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-xs text-gray-500 font-medium tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

    
      </div>
    </section>
  )
}