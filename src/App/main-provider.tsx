import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Alert, Spin } from 'antd'
import { MainErrorFallback } from '@/components/errors/main-fallback'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { queryClient } from '@/lib/react-query'

const { ErrorBoundary } = Alert

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<Spin fullscreen />}>
      <ErrorBoundary message={<MainErrorFallback />}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
