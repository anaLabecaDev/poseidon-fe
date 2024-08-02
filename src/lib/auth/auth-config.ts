import { Configuration, PublicClientApplication } from '@azure/msal-browser'
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
