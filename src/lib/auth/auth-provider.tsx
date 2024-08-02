import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { AuthenticationResult } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { MSAL_TOKEN } from '@/config/constants'
import { loginRequest } from './auth-config'

interface AuthContextType {
  token: string | null
  login: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem(MSAL_TOKEN))
  const { instance, accounts } = useMsal()

  const login = useCallback(async () => {
    try {
      const response: AuthenticationResult = await instance.loginPopup(loginRequest)
      setToken(response.accessToken)
      localStorage.setItem(MSAL_TOKEN, response.accessToken)
    } catch (e) {
      console.error(e)
    }
  }, [instance])

  const getAccessToken = useCallback(async () => {
    const account = accounts[0]
    if (!account) return null

    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      })
      setToken(response.accessToken)
      localStorage.setItem(MSAL_TOKEN, response.accessToken)
      return response.accessToken
    } catch (e) {
      console.error(e)
      return null
    }
  }, [accounts, instance])

  useEffect(() => {
    if (!token) {
      getAccessToken()
    }
  }, [token, getAccessToken])

  const contextValue = useMemo(() => ({ token, login }), [token, login])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthContext }
