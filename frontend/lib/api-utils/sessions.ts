import { SessionsResponse } from './types'

const API_BASE_URL = 'http://localhost:5000/api/v1'

export async function getSessions(): Promise<SessionsResponse> {
  const response = await fetch(`${API_BASE_URL}/sessions`)

  if (!response.ok) {
    throw new Error('Failed to get sessions')
  }

  return response.json()
}

