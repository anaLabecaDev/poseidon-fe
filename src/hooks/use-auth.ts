import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { MSAL_TOKEN } from '@/config/constants'

export const useAuth = () => {
  const { instance, accounts } = useMsal()

  const login = async () => {
    try {
      await instance
        .loginPopup({
          scopes: ['a6c49e8c-e5ef-44e3-a9b3-f9e9a70a9146/.default'],
        })
        .then((auth) => {
          sessionStorage.setItem(MSAL_TOKEN, auth.accessToken || '')
        })
    } catch (error) {
      // Handle login error
      console.error('check this error', error)
    }
  }

  const logout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/', // Specify your post-logout redirect URI
    })
  }

  const acquireToken = async () => {
    if (accounts.length === 0) throw Error('No accounts found')
    const account = accounts[0]
    const tokenRequest = {
      scopes: ['a6c49e8c-e5ef-44e3-a9b3-f9e9a70a9146/.default'],
      account: account,
    }

    try {
      const response = await instance.acquireTokenSilent(tokenRequest)

      if (response) {
        sessionStorage.setItem(MSAL_TOKEN, response.accessToken || '')
      }

      return response.accessToken
    } catch (error) {
      // If a silent token acquisition fails, acquire token interactively
      if (error instanceof InteractionRequiredAuthError) {
        const interactiveResponse = await instance.acquireTokenPopup(tokenRequest)
        if (interactiveResponse) {
          sessionStorage.setItem(MSAL_TOKEN, interactiveResponse.accessToken || '')
        }

        return interactiveResponse
      } else {
        // Handle other errors
        console.error(error)
        return null
      }
    }
  }

  return { login, logout, acquireToken }
}
