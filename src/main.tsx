import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PublicClientApplication } from '@azure/msal-browser'
import { App } from '@/app/app'
import { initializeMsal } from '@/lib/auth/auth-config'
import './index.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

if (import.meta.env.MODE === 'test') {
  import('@/__mocks__/browser')
    .then(({ worker }) => {
      worker.start()
    })
    .then(() => {
      const mockMsalInstance = {
        // Add mock implementation here if needed
      } as PublicClientApplication

      root.render(
        <StrictMode>
          <App msPublicClientApp={mockMsalInstance} />
        </StrictMode>,
      )
    })
} else {
  initializeMsal().then((msalInstance) => {
    root.render(
      <StrictMode>
        <App msPublicClientApp={msalInstance} />
      </StrictMode>,
    )
  })
}

// Uncomment if you want to see the Lighthouse report in the console
// import reportWebVitals from './reportWebVitals'
// reportWebVitals(console.log)
