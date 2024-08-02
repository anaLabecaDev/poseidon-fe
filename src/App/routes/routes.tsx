import { createBrowserRouter } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import AppRoot from '@/app/routes/app/root'
import { ProtectedRoute } from '@/components/protected-route'

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing')
        return { Component: LandingRoute }
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./authentication')
        return { Component: LoginRoute }
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found')
        return { Component: NotFoundRoute }
      },
    },
  ])
