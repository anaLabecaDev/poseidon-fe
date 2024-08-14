import {
  AuthenticationResult,
  Configuration,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser'
import { env } from '@/config/env'

export const msalConfig: Configuration = {
  auth: {
    clientId: env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${env.TENANT_ID}`,
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

export const loginRequest = {
  scopes: [env.AUTH_SCOPE],
}

export const initializeMsal = (): Promise<PublicClientApplication> => {
  return msalInstance.initialize().then(() => {
    const accounts = msalInstance.getAllAccounts()

    if (accounts.length > 0) {
      const boostItAccount = accounts.find((account) =>
        account.username.toLowerCase().includes('boost-it.pt'),
      )

      msalInstance.setActiveAccount(boostItAccount ?? accounts[0])
    }

    msalInstance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult
        const account = payload.account

        msalInstance.setActiveAccount(account)
      }
    })

    return msalInstance
  })
}

export const acquireAccessToken = async (): Promise<string> => {
  const activeAccount = msalInstance.getActiveAccount()
  const accounts = msalInstance.getAllAccounts()

  if (!activeAccount && accounts.length === 0) {
    throw Error(
      'No active account! Verify a user has been signed in and setActiveAccount has been called.',
    )
  }

  const request = {
    scopes: [env.AUTH_SCOPE],
    account: activeAccount || accounts[0],
  }

  const authResult = await msalInstance.acquireTokenSilent(request)

  return authResult.accessToken
}
