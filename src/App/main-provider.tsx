import React from 'react'
import { MsalProvider } from '@azure/msal-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Alert, Spin } from 'antd'
import { MainErrorFallback } from '@/components/errors/main-fallback'
import { msalInstance } from '@/lib/auth/auth-config'
import { queryClient } from '@/lib/react-query'

const { ErrorBoundary } = Alert

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<Spin fullscreen />}>
      <ErrorBoundary message={<MainErrorFallback />}>
        <MsalProvider instance={msalInstance}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </MsalProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
