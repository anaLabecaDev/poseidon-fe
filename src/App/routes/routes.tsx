import { createBrowserRouter } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

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
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found')
        return { Component: NotFoundRoute }
      },
    },
  ])
