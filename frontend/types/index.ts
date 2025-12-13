export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  requestId?: string
}

export interface ChatSession {
  id: string
  title: string
  lastMessage?: string
  timestamp: string
}

