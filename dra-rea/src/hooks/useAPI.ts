import { useEffect, useState } from 'react'

type State<T> = { data: T | null; loading: boolean; error: string | null }

export function useApi<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<State<T>>({ data: null, loading: true, error: null })

  useEffect(() => {
    let active = true
    setState({ data: null, loading: true, error: null })
    fn()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((err) => {
        const msg = err instanceof Error ? err.message : 'Erro desconhecido'
        if (active) setState({ data: null, loading: false, error: msg })
      })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}