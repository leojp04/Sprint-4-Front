import type { ReactNode } from 'react'

type AlertTone = 'success' | 'error' | 'info' | 'warning'

type Props = {
  type?: AlertTone
  children: ReactNode
  role?: 'status' | 'alert'
}

const STYLES: Record<NonNullable<Props['type']>, string> = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
}

export default function Alert({ type = 'info', role = 'status', children }: Props) {
  return (
    <div className={`border rounded-lg px-3 py-2 ${STYLES[type]}`} role={role} aria-live="polite">
      {children}
    </div>
  )
}
