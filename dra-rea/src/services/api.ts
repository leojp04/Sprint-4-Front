const ENV_BASE = import.meta.env.VITE_API_BASEURL as string | undefined
const BASE_URL = ENV_BASE && ENV_BASE.trim() !== '' ? ENV_BASE : 'http://localhost:3001'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

async function request<T>(path: string, method: Method = 'GET', body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} • ${text || res.statusText}`)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export const api = {
  get: <T>(path: string) => request<T>(path, 'GET'),
  post: <T>(path: string, payload: unknown) => request<T>(path, 'POST', payload),
  put:  <T>(path: string, payload: unknown) => request<T>(path, 'PUT', payload),
  del:  <T>(path: string) => request<T>(path, 'DELETE'),
}

// Types used by auth helpers (kept lightweight to avoid coupling)
type AnyUser = {
  id: number
  email: string
  username?: string
  nomeUsuario?: string
  password?: string
  [k: string]: unknown
}

export async function getUserByEmailOrUsername(query: string): Promise<AnyUser | null> {
  const q = encodeURIComponent(query)
  // Try by email first
  const byEmail = await api.get<AnyUser[]>(`/usuarios?email=${q}`)
  if (byEmail.length > 0) return byEmail[0]
  // Then by username (new) and nomeUsuario (legacy)
  const byUser = await api.get<AnyUser[]>(`/usuarios?username=${q}`)
  if (byUser.length > 0) return byUser[0]
  const byLegacy = await api.get<AnyUser[]>(`/usuarios?nomeUsuario=${q}`)
  if (byLegacy.length > 0) return byLegacy[0]
  return null
}

export async function createUser(payload: Partial<AnyUser> & { email: string; username?: string; nomeUsuario?: string; password: string }) {
  // Let json-server assign the id
  return api.post<AnyUser>('/usuarios', payload)
}

export async function login({ emailOrUsername, password }: { emailOrUsername: string; password: string }): Promise<AnyUser | null> {
  const user = await getUserByEmailOrUsername(emailOrUsername)
  if (!user) return null
  // Compare plain password (as requested)
  if ((user.password ?? '') !== password) return null
  return user
}
