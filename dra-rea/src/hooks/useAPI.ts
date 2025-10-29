import { useEffect, useState } from 'react'
import { ApiHttpError } from '../services/api'

export type ApiState<T> = { data: T | null; loading: boolean; error: string | null }

export function useApi<T>(request: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let active = true
    setState({ data: null, loading: true, error: null })

    request()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null })
      })
      .catch((err) => {
        if (!active) return
        const message =
          err instanceof ApiHttpError && err.status !== 0
            ? `Erro ${err.status}: ${err.message}`
            : err instanceof Error
              ? err.message
              : 'Erro desconhecido'
        setState({ data: null, loading: false, error: message })
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
