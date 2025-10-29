const ENV_BASE = import.meta.env.VITE_API_BASEURL as string | undefined
const BASE_URL = ENV_BASE && ENV_BASE.trim() !== '' ? ENV_BASE : 'http://localhost:3001'

export class ApiHttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'ApiHttpError'
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function request<T>(path: string, method: Method, body?: unknown): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new ApiHttpError(res.status, text || res.statusText)
    }

    if (res.status === 204) return undefined as T
    return (await res.json()) as T
  } catch (error) {
    if (error instanceof ApiHttpError) throw error
    const message = error instanceof Error ? error.message : 'Falha ao se comunicar com a API'
    throw new ApiHttpError(0, message)
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path, 'GET'),
  post: <T>(path: string, payload: unknown) => request<T>(path, 'POST', payload),
  put: <T>(path: string, payload: unknown) => request<T>(path, 'PUT', payload),
  del: <T>(path: string) => request<T>(path, 'DELETE'),
}
