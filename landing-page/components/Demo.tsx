'use client'

import { Terminal, Play, Pause, RotateCcw, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

const demoCommands = [
  {
    command: 'devil-agent --scan --vulnerabilities',
    output: 'Scanning system for vulnerabilities...\n✓ Kernel version: 6.11.0-29-generic (secure)\n✓ Firewall status: Active (iptables)\n✓ Open ports: 22(SSH), 80(HTTP), 443(HTTPS)\n✓ Critical vulnerabilities found: 0\n✓ Security score: 92/100',
    description: 'System vulnerability scan',
  },
  {
    command: 'devil-agent --monitor --resources',
    output: 'System Resource Monitoring:\nCPU: 24% (4 cores, 8 threads)\nRAM: 3.2GB/15.6GB (21%)\nDisk: 235GB/457GB (51%)\nNetwork: 1.2MB/s ↓ 0.8MB/s ↑\nTemperature: 45°C\nUptime: 7 days, 3 hours',
    description: 'Real-time system monitoring',
  },
  {
    command: 'devil-agent --analyze --logs /var/log/syslog',
    output: 'Log Analysis Results:\n✓ 12,847 entries processed\n✓ 3 security events detected\n✓ 0 critical errors\n✓ Last attack attempt: 2 days ago\n✓ Recommended action: Update firewall rules',
    description: 'Security log analysis',
  },
  {
    command: 'devil-agent --automate --backup /home/user/data',
    output: 'Automated Backup Process:\n✓ Creating backup archive...\n✓ Compressing 4.2GB of data\n✓ Encrypting with AES-256\n✓ Uploading to secure storage\n✓ Backup completed successfully\n✓ Size: 2.8GB (compressed)\n✓ Time: 45 seconds',
    description: 'Automated backup process',
  },
]

export default function Demo() {
  const [activeCommand, setActiveCommand] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveCommand((prev) => (prev + 1) % demoCommands.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(demoCommands[activeCommand].command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setActiveCommand(0)
    setIsPlaying(true)
  }

  return (
    <section id="advanced-capabilities" className="py-20 bg-dark-light/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Advanced Capabilities</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See Devil AI Agent in action with real command examples
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Command Selector */}
            <div className="lg:col-span-1">
              <div className="p-6 bg-dark/50 rounded-2xl border border-dark-light/20">
                <h3 className="text-xl font-bold mb-6 text-gray-100">Available Commands</h3>
                <div className="space-y-3">
                  {demoCommands.map((cmd, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveCommand(index)
                        setIsPlaying(false)
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        activeCommand === index
                          ? 'bg-primary/20 border border-primary/30'
                          : 'bg-dark-light/20 hover:bg-dark-light/30 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Terminal className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-mono text-gray-300">$ {cmd.command.split(' ')[0]}</span>
                        </div>
                        {activeCommand === index && (
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{cmd.description}</p>
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="mt-8 pt-6 border-t border-dark-light/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-lg bg-dark-light/30 hover:bg-dark-light/40 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-gray-300" />
                        ) : (
                          <Play className="w-5 h-5 text-gray-300" />
                        )}
                      </button>
                      <button
                        onClick={handleReset}
                        className="p-2 rounded-lg bg-dark-light/30 hover:bg-dark-light/40 transition-colors"
                      >
                        <RotateCcw className="w-5 h-5 text-gray-300" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-400">
                      {activeCommand + 1} / {demoCommands.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Terminal Display */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-2xl overflow-hidden border border-dark-light/30">
                {/* Terminal Header */}
                <div className="px-6 py-4 bg-dark-light/50 border-b border-dark-light/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">devil-agent — zsh</span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center space-x-2 px-3 py-1 bg-dark-light/30 hover:bg-dark-light/40 rounded-lg text-sm transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono">
                  {/* Command */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <span className="text-green-400">$</span>
                      <span className="ml-2 text-gray-100">{demoCommands[activeCommand].command}</span>
                    </div>
                    <div className="h-1 w-24 bg-primary/50 rounded-full animate-pulse" />
                  </div>

                  {/* Output */}
                  <div className="space-y-2">
                    {demoCommands[activeCommand].output.split('\n').map((line, index) => (
                      <div key={index} className="text-gray-300">
                        {line.startsWith('✓') ? (
                          <span className="text-green-400">{line}</span>
                        ) : line.startsWith('✗') ? (
                          <span className="text-red-400">{line}</span>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Cursor */}
                  <div className="mt-6 flex items-center">
                    <div className="w-3 h-5 bg-primary animate-pulse" />
                    <span className="ml-2 text-gray-500">Ready for next command...</span>
                  </div>
                </div>
              </div>

              {/* Try It Yourself */}
              <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/20">
                <h4 className="text-lg font-semibold mb-3 text-gray-100">Try It Yourself</h4>
                <p className="text-gray-400 mb-4">
                  Want to test Devil AI Agent with your own commands? Start a free trial and get full access.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Enter your command here..."
                    className="flex-1 px-4 py-3 bg-dark/50 border border-dark-light/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                  <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition-colors">
                    Execute
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}