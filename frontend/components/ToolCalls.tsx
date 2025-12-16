'use client'

import { ToolCall } from '@/lib/api-utils/types'
import { useState } from 'react'

interface ToolCallsProps {
  toolCalls: ToolCall[]
  requestId: string
  isActive?: boolean
}

export default function ToolCalls({ toolCalls, requestId, isActive = false }: ToolCallsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  if (!toolCalls || toolCalls.length === 0) {
    if(isActive) return null;
    return (
      <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          No tool calls found.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="text-xs text-muted-foreground mb-2">
        {toolCalls.length} tool call{toolCalls.length !== 1 ? 's' : ''} executed
      </div>
      {toolCalls.map((call, index) => (
        <div
          key={index}
          className="bg-muted rounded-lg border border-border overflow-hidden"
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/80 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 text-left">
              <div className="w-2 h-2 rounded-full bg-foreground/20 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">
                  {call.tool_name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {call.input.length > 60 ? `${call.input.substring(0, 60)}...` : call.input}
                </div>
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
                expandedIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          {expandedIndex === index && (
            <div className="px-4 pb-4 space-y-3 border-t border-border">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Input:</div>
                <pre className="text-xs text-foreground bg-background p-2 rounded border border-border whitespace-pre-wrap break-words overflow-x-auto">
                  {call.input}
                </pre>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">Output:</div>
                <pre className="text-xs text-foreground bg-background p-2 rounded border border-border whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                  {call.output}
                </pre>
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(call.timestamp).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

