'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import EmptyState from '@/components/EmptyState'
import ThemeToggle from '@/components/ThemeToggle'
import { Message } from '@/types'
import { sendMessage, getHistory } from '@/lib/api-utils'

// Generate UUID v4
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Load sidebar state from localStorage
    const savedSidebarState = localStorage.getItem('sidebarOpen')
    if (savedSidebarState !== null) {
      setSidebarOpen(savedSidebarState === 'true')
    }
  }, [])

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen))
  }, [sidebarOpen])

  // Load session from URL on mount
  useEffect(() => {
    const urlSessionId = searchParams.get('session')
    if (urlSessionId) {
      setSessionId(urlSessionId)
      loadSession(urlSessionId)
    }
  }, [searchParams])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    // Generate UUID for this request
    const requestId = generateUUID()
    setCurrentRequestId(requestId)

    const userMessage: Message = {
      id: `${Date.now()}-user-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Send message with current session_id and request_id
      const data = await sendMessage(content, sessionId || undefined, requestId)
      
      // Always update session ID from backend response
      if (data.session_id) {
        setSessionId(data.session_id)
        updateSessionInUrl(data.session_id)
      }
      
      const assistantMessage: Message = {
        id: data.request_id || `${Date.now()}-assistant`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        requestId: data.request_id
      }

      setMessages(prev => [...prev, assistantMessage])
      setCurrentRequestId(null) // Clear current request ID after response
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: `${Date.now()}-error-${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
      setCurrentRequestId(null)
    } finally {
      setIsLoading(false)
    }
  }

  const loadSession = async (sessionIdToLoad: string) => {
    setSessionId(sessionIdToLoad)
    setIsLoading(true)
    try {
      const history = await getHistory(sessionIdToLoad)
      // Convert API messages to frontend Message format with unique IDs
      const convertedMessages: Message[] = history.messages.map((msg, index) => {
        // Use timestamp + index + role to ensure uniqueness
        const uniqueId = msg.metadata?.request_id 
          ? `${msg.metadata.request_id}-${msg.role}-${index}`
          : `${sessionIdToLoad}-${msg.timestamp}-${index}-${msg.role}`
        
        return {
          id: uniqueId,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: msg.timestamp,
          requestId: msg.metadata?.request_id
        }
      })
      setMessages(convertedMessages)
    } catch (error) {
      console.error('Failed to load session history:', error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  const updateSessionInUrl = (newSessionId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('session', newSessionId)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleNewChat = () => {
    setMessages([])
    setSessionId(null)
    window.location.href = '/'
  }

  const handleSessionClick = async (sessionIdToLoad: string) => {
    updateSessionInUrl(sessionIdToLoad)
    await loadSession(sessionIdToLoad)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar 
        messages={messages} 
        onNewChat={handleNewChat}
        onSessionClick={handleSessionClick}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top bar with menu and theme toggle */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ThemeToggle />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto px-4 pt-12 pb-32">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <EmptyState onSuggestionClick={handleSuggestionClick} />
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => {
                  // Check if this is the last message and we're loading
                  const isLastMessage = index === messages.length - 1
                  const isActive = isLoading && isLastMessage && message.role === 'assistant' && message.requestId === currentRequestId
                  
                  return (
                    <ChatMessage 
                      key={message.id} 
                      message={message}
                      isActive={isActive}
                      requestId={isActive ? currentRequestId : undefined}
                    />
                  )
                })}
                {isLoading && currentRequestId && (
                  <ChatMessage
                    message={{
                      id: `temp-${currentRequestId}`,
                      role: 'assistant',
                      content: '',
                      timestamp: new Date().toISOString(),
                      requestId: currentRequestId
                    }}
                    isActive={true}
                    requestId={currentRequestId}
                  />
                )}
                {isLoading && !currentRequestId && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-foreground">A</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
        
        {/* Chat input at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm ">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}

