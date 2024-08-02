import React from 'react'
import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated()

  console.log('isAuthenticated', isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />
  }

  return <>{children}</>
}
