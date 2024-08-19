import { Suspense } from 'react'
import { IPublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Alert, Spin } from 'antd'
import { AppRouter } from '@/App/routes/routes'
import { MainErrorFallback } from '@/components/errors/main-fallback'
import { queryClient } from '@/lib/react-query'
import './app.css'

type AppProps = {
  msPublicClientApp: IPublicClientApplication
}

const { ErrorBoundary } = Alert

export function App({ msPublicClientApp }: AppProps) {
  return (
    <Suspense fallback={<Spin fullscreen />}>
      <ErrorBoundary message={<MainErrorFallback />}>
        <QueryClientProvider client={queryClient}>
          <MsalProvider instance={msPublicClientApp}>
            <AppRouter />
          </MsalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
