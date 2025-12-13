import { QueryRequest, QueryResponse } from './types'

const API_BASE_URL = 'http://localhost:5000/api/v1'

export async function sendMessage(
  query: string,
  sessionId?: string
): Promise<QueryResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      session_id: sessionId || null, // Send null if undefined, backend will generate CUID
    } as QueryRequest),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return response.json()
}

