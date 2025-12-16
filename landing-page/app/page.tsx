import { Shield, Cpu, Terminal, Zap, Lock, Globe, Code, Server, Database, Network, FileCode, TerminalSquare } from 'lucide-react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
import MatrixRain from '@/components/MatrixRain'
import TerminalWindow from '@/components/TerminalWindow'
import MouseParticles from '@/components/MouseParticles'
import AnonymousMaskSimple from '@/components/AnonymousMaskSimple'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark to-dark-light overflow-hidden">
      {/* INSANE BACKGROUND EFFECTS */}
      <ParticleBackground />
      <MatrixRain />
      <AnonymousMaskSimple />
      <MouseParticles />
      
      {/* Animated gradient mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow delay-500" />
        
        {/* Additional glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-float delay-2000" />
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-red-500/5 rounded-full blur-3xl animate-float delay-1000" />
      </div>

      {/* Interactive terminal window */}
      <TerminalWindow />

      {/* Data stream effect */}
      <div className="data-stream"></div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <Footer />
      </div>

      {/* Mouse follower effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-1">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse-slow" 
          style={{
            animation: 'float 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* CRT monitor effect */}
      <div className="crt fixed inset-0 pointer-events-none -z-1"></div>
    </div>
  )
}