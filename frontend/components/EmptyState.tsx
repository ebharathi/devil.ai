'use client'

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  "What can you help me with?",
  "Show me system information",
  "List files in current directory",
  "Search the web for latest news"
]

export default function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-4xl font-semibold text-foreground mb-4">
          How can I help you today?
        </h1>
        <p className="text-muted-foreground mb-12 text-base">
          I'm your local AI assistant with full system access. Ask me anything or try one of the suggestions below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-3 text-left bg-card hover:bg-muted border border-border rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-foreground">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
