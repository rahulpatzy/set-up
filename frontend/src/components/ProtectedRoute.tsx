import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
  /** Set to true once auth scaffolding (task #7) is wired up */
  isAuthenticated?: boolean
}

/**
 * Wraps a route so unauthenticated users are redirected to /login.
 *
 * Usage:
 *   <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
 *
 * Replace the isAuthenticated prop with the value from useAuth() once
 * auth scaffolding is in place.
 */
export function ProtectedRoute({ children, isAuthenticated = true }: Props) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
