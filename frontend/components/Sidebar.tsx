'use client'

import { useState, useEffect } from 'react'
import { Message } from '@/types'
import { getSessions, Session } from '@/lib/api-utils'

interface SidebarProps {
  messages: Message[]
  onNewChat: () => void
  onSessionClick: (sessionId: string) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ messages, onNewChat, onSessionClick, isOpen, onClose }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchSessions()
    }
  }, [isOpen])

  const fetchSessions = async () => {
    setIsLoading(true)
    try {
      const data = await getSessions()
      setSessions(data.sessions)
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
      setSessions([])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSessions = sessions.filter(session =>
    session.session_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.last_message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside
      className={`
        h-full bg-background border-r border-border
        flex flex-col transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'w-64' : 'w-0'}
      `}
    >
      <div className={`flex flex-col h-full ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
        {/* Header with New Chat button */}
        <div className="p-3 flex-shrink-0">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group border border-border"
          >
            <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm text-foreground">New chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 mb-2 flex-shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/20"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 min-h-0">
          <div className="space-y-1">
            {isLoading ? (
              <div className="px-3 py-8 text-center">
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="px-3 py-8 text-center">
                <p className="text-sm text-muted-foreground">No chats found</p>
              </div>
            ) : (
              filteredSessions.map((session) => (
                <div
                  key={session.session_id}
                  className="px-3 py-2.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => {
                    onSessionClick(session.session_id)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">
                        {session.last_message || session.session_id}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border flex-shrink-0">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-foreground">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Agent</p>
              <p className="text-xs text-muted-foreground">Local Mode</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
