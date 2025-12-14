import { ToolCallsResponse } from './types'
import { API_BASE_URL } from '@/constant'

export async function getToolCalls(requestId: string): Promise<ToolCallsResponse> {
  const response = await fetch(`${API_BASE_URL}/tool-calls/${requestId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tool calls')
  }

  return response.json()
}

