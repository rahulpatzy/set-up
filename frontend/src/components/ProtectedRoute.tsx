import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  children: ReactNode
}

/**
 * Wraps a route so unauthenticated users are redirected to /login.
 * Shows nothing while the initial auth state is loading.
 */
export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
