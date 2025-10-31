import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

type Props = { children: ReactNode }

function hasAuthUser(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return Boolean(window.localStorage.getItem('authUser'))
  } catch {
    return false
  }
}

export default function RequireAuth({ children }: Props) {
  const location = useLocation()
  const isAuthenticated = hasAuthUser()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
