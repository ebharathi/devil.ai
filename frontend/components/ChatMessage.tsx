'use client'

import { Message } from '@/types'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
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
    <div className="flex justify-center mb-6">
      <div className="max-w-4xl w-full flex gap-4">
     
        <div className="flex-1">
          <div className="rounded-2xl px-6 py-4">
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

            {message.requestId && (
              <span className="text-xs text-muted-foreground">
                ID: {message.requestId}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
