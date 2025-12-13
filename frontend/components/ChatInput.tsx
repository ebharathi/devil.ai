'use client'

import { useState, KeyboardEvent, useRef, useEffect } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input)
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full">
      <div className="bg-muted border border-border shadow-xl rounded-2xl p-6 focus-within:border-foreground/20 transition-colors">
        <div className="flex items-end gap-4">
          <textarea
            autoFocus
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Agent..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground resize-none outline-none max-h-40 overflow-y-auto text-lg leading-relaxed"
            style={{ minHeight: '32px' }}
          />
          
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="p-3 bg-foreground text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-opacity flex-shrink-0"
            title="Send (Enter)"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
