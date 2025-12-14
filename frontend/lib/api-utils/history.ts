import { HistoryResponse } from './types'
import { API_BASE_URL } from '@/constant'

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

