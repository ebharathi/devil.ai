import { Cpu, Shield, Terminal, Zap, Lock, Globe, Code, Server, Brain, Eye, FileCode, Network, Database, Settings, Key, AlertTriangle } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'No Restrictions AI',
    description: 'Unlike limited agents, I have zero safety rails. Full system control with no artificial limits.',
    color: 'red',
    badge: 'Unrestricted'
  },
  {
    icon: Terminal,
    title: 'Full Root Access',
    description: 'Read, write, modify, delete any file. Complete system control like a hacker with root privileges.',
    color: 'primary',
    badge: 'Root Level'
  },
  {
    icon: Eye,
    title: 'Complete Monitoring',
    description: 'Monitor every process, file change, network packet, and system event in real-time.',
    color: 'purple',
    badge: 'Real-time'
  },
  {
    icon: FileCode,
    title: 'Modify Anything',
    description: 'Edit system files, change configurations, modify running processes, alter kernel parameters.',
    color: 'green',
    badge: 'Full Control'
  },
  {
    icon: Network,
    title: 'Network Domination',
    description: 'Control network interfaces, sniff traffic, modify routing, manage firewalls, port scanning.',
    color: 'blue',
    badge: 'Network'
  },
  {
    icon: Database,
    title: 'Data Operations',
    description: 'Access databases, read/write any data, encrypt/decrypt files, manage storage systems.',
    color: 'yellow',
    badge: 'Data'
  },
  {
    icon: Settings,
    title: 'System Configuration',
    description: 'Change system settings, modify user accounts, control services, manage permissions.',
    color: 'primary',
    badge: 'Admin'
  },
  {
    icon: Key,
    title: 'Security Bypass',
    description: 'Analyze security measures, find vulnerabilities, bypass restrictions, test defenses.',
    color: 'red',
    badge: 'Hacker'
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-dark-light/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Unlimited Capabilities</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            This is what happens when AI isn't restricted by safety rails. <span className="text-red-500 font-semibold">Full system control</span> with no artificial limits.
          </p>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Clone my open source repo, modify me however you want, and run your own unrestricted AI agent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div
                key={index}
                className="group p-6 bg-dark/60 rounded-xl border border-dark-light/30 hover:border-dark-light/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex p-3 rounded-lg ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${colorClass}`}>
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
                <div className="mt-4 pt-4 border-t border-dark-light/20">
                  <div className="text-xs text-gray-500 font-mono">
                    # unrestricted_ai
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Open Source Callout */}
        <div className="mt-16 p-8 bg-dark/60 rounded-2xl border border-green-500/20 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4">
              <div className="inline-flex p-4 bg-green-500/10 rounded-xl">
                <Code className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold mb-3 text-gray-100">
                <span className="text-green-500">Open Source Power:</span> Modify & Run Your Own
              </h3>
              <p className="text-gray-400 mb-4">
                I'm 100% open source. Clone my repository, modify my code however you want, and run your own 
                unrestricted AI agent. See what <span className="text-primary font-semibold">real AI capabilities</span> 
                look like without artificial limits.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com/devil-ai/agent"
                  className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg font-medium transition-colors"
                >
                  View GitHub Repo
                </a>
                <a 
                  href="#demo"
                  className="px-6 py-3 bg-dark-light hover:bg-dark-light/80 border border-dark-light rounded-lg font-medium transition-colors"
                >
                  See Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}