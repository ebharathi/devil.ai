export interface Session {
  session_id: string
  last_message: string
}

export interface SessionsResponse {
  sessions: Session[]
}

export interface QueryRequest {
  query: string
  session_id?: string
}

export interface QueryResponse {
  response: string
  session_id: string
  request_id: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  metadata?: {
    request_id?: string
  }
}

export interface HistoryResponse {
  messages: Message[]
  session_id: string
}

