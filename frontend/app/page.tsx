import { Suspense } from 'react'
import Home from '@/components/Home'

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex h-screen bg-background text-foreground items-center justify-center">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    }>
      <Home />
    </Suspense>
  )
}
