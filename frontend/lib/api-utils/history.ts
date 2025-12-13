import { HistoryResponse } from './types'

const API_BASE_URL = 'http://localhost:5000/api/v1'

export async function getHistory(
  sessionId: string,
  limit: number = 100
): Promise<HistoryResponse> {
  const response = await fetch(
    `${API_BASE_URL}/history/${sessionId}?limit=${limit}`
  )

  if (!response.ok) {
    throw new Error('Failed to get history')
  }

  return response.json()
}

