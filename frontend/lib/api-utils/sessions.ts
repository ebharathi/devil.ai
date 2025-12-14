import { SessionsResponse } from './types'
import { API_BASE_URL } from '@/constant'

export async function getSessions(): Promise<SessionsResponse> {
  const response = await fetch(`${API_BASE_URL}/sessions`)

  if (!response.ok) {
    throw new Error('Failed to get sessions')
  }

  return response.json()
}

