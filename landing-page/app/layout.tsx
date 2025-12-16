import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devil AI Agent - Open Source Agent',
  description: 'Meet Devil AI Agent - Your cybersecurity expert with full system access capabilities. Read, write, modify, monitor, and secure any system with AI-powered automation.',
  keywords: ['AI Agent', 'Cybersecurity', 'System Access', 'Automation', 'DevOps', 'Security'],
  openGraph: {
    type: 'website',
    title: 'Devil AI Agent - Open Source Agent',
    description: 'AI-powered cybersecurity agent with full system access capabilities',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devil AI Agent - Open Source Agent',
    description: 'AI-powered cybersecurity agent with full system access capabilities',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0F172A" />
      </head>
      <body className={`${inter.className} bg-dark min-h-screen`}>
        {children}
      </body>
    </html>
  )
}