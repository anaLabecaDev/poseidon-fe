import React from 'react'
import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="auth/login" replace />
  }

  return <>{children}</>
}
