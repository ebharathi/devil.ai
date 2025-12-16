'use client'

import { Message } from '@/types'
import { useState, useEffect, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { getToolCalls, ToolCall } from '@/lib/api-utils'
import ToolCalls from './ToolCalls'

interface ChatMessageProps {
  message: Message
  isActive?: boolean
  requestId?: string | null
}

export default function ChatMessage({ message, isActive = false, requestId }: ChatMessageProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const effectiveRequestId = requestId || message.requestId

  const fetchToolCalls = useCallback(async () => {
    if (!effectiveRequestId) return

    try {
      setLoadingLogs(true)
      const data = await getToolCalls(effectiveRequestId)
      setToolCalls(data.tool_calls || [])
      if (isActive) {
        setShowLogs(true) // Auto-show logs when active
      }
    } catch (error) {
      console.error('Failed to fetch tool calls:', error)
    } finally {
      setLoadingLogs(false)
    }
  }, [effectiveRequestId, isActive])

  // Auto-poll when isActive is true
  useEffect(() => {
    if (isActive && effectiveRequestId) {
      // Fetch immediately
      fetchToolCalls()
      
      // Start polling every 1 second
      pollingIntervalRef.current = setInterval(() => {
        fetchToolCalls()
      }, 1000)

      // Auto-show logs
      setShowLogs(true)

      return () => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current)
          pollingIntervalRef.current = null
        }
      }
    } else {
      // Stop polling when not active
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
    }
  }, [isActive, effectiveRequestId, fetchToolCalls])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSeeLogs = async () => {
    if (!effectiveRequestId) return
    
    if (showLogs) {
      setShowLogs(false)
      return
    }

    // If not already fetched, fetch now
    if (toolCalls.length === 0) {
      await fetchToolCalls()
    }
    setShowLogs(true)
  }

  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-4xl">
          <div className="bg-muted rounded-2xl px-6 py-4 inline-block">
            <p className="text-foreground whitespace-pre-wrap break-words text-base leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-4xl w-full flex gap-4">
        <div className="flex-1">
          <div className="rounded-2xl px-6 py-4">
            {message.content ? (
              <div className="prose prose-invert dark:prose-invert max-w-none">
                <ReactMarkdown
                components={{
                  code: ({ className, children, ...rest }) => {
                    const match = /language-(\w+)/.exec(className || '')

                    if (!match) {
                      return (
                        <code
                          className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground"
                          {...rest}
                        >
                          {children}
                        </code>
                      )
                    }

                    return (
                      <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto my-3">
                        <code className={className} {...rest}>
                          {children}
                        </code>
                      </pre>
                    )
                  },
                  p: ({ children }) => (
                    <p className="mb-3 last:mb-0 text-foreground leading-relaxed text-base">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-3 space-y-1 text-foreground">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-3 space-y-1 text-foreground">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4 text-foreground">{children}</li>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-3 text-foreground">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mb-2 text-foreground">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mb-2 text-foreground">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground my-2">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
            ) : isActive ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-3 mt-2 px-2">
            <button
              onClick={copyToClipboard}
              className="p-1.5 hover:bg-muted rounded transition-colors"
              title={isCopied ? 'Copied!' : 'Copy Message'}
            >
              {isCopied ? (
                <svg
                  className="w-4 h-4 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>

            {effectiveRequestId && (
              <button
                onClick={handleSeeLogs}
                disabled={loadingLogs}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {loadingLogs ? 'Loading...' : showLogs ? (isActive ? 'Live logs' : 'Hide logs') : 'See logs'}
                {isActive && <span className="ml-1 animate-pulse">●</span>}
              </button>
            )}
          </div>

          {showLogs && effectiveRequestId && (
            <div className="mt-2 px-2">
              <ToolCalls toolCalls={toolCalls} requestId={effectiveRequestId} isActive={isActive} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
