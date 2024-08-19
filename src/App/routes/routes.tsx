import { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppRoot from '@/App/routes/app/root'

const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppRoot />,
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found')
        return { Component: NotFoundRoute }
      },
    },
  ])

export const AppRouter = () => {
  const router = useMemo(() => createRouter(), [])

  return <RouterProvider router={router} />
}
