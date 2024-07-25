import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { AppProvider } from '@/app/main-provider'
import { createRouter } from '@/app/routes/routes'
import './app.css'

const AppRouter = () => {
  const queryClient = useQueryClient()

  const router = useMemo(() => createRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}
