import { QueryRequest, QueryResponse } from './types'
import { API_BASE_URL } from '@/constant'

// Generate UUID v4
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export async function sendMessage(
  query: string,
  sessionId?: string,
  requestId?: string
): Promise<QueryResponse> {
  // Generate UUID if not provided
  const uuid = requestId || generateUUID()
  
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      session_id: sessionId || null, // Send null if undefined, backend will generate CUID
      request_id: uuid,
    } as QueryRequest),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return response.json()
}

