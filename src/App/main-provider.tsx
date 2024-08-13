import React from 'react'
import { MsalProvider } from '@azure/msal-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Alert, Spin } from 'antd'
import { MainErrorFallback } from '@/components/errors/main-fallback'
import { msalInstance } from '@/lib/auth/auth-config'
import { AuthProvider } from '@/lib/auth/auth-provider'
import { queryClient } from '@/lib/react-query'

const { ErrorBoundary } = Alert

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<Spin fullscreen />}>
      <ErrorBoundary message={<MainErrorFallback />}>
        <QueryClientProvider client={queryClient}>
          <MsalProvider instance={msalInstance}>
            <AuthProvider>{children}</AuthProvider>
          </MsalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
