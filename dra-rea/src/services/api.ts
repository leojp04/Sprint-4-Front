import type { Consulta, ConsultaInput } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL?.trim()
if (!BASE_URL) {
  throw new Error(
    'VITE_API_URL não definida. Crie um arquivo .env na raiz com VITE_API_URL antes de executar.',
  )
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export async function request<T>(
  path: string,
  init?: RequestInit & { method?: HttpMethod },
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`HTTP ${response.status} - ${text || response.statusText}`)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const api = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { ...(init ?? {}), method: 'GET' }),
  post: <T>(path: string, payload: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...(init ?? {}),
      method: 'POST',
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    }),
  put: <T>(path: string, payload: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...(init ?? {}),
      method: 'PUT',
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    }),
  patch: <T>(path: string, payload: unknown, init?: RequestInit) =>
    request<T>(path, {
      ...(init ?? {}),
      method: 'PATCH',
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    }),
  del: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { ...(init ?? {}), method: 'DELETE' }),
}

type AnyUser = {
  id: number | string
  email: string
  username?: string
  nomeUsuario?: string
  nomeCompleto?: string
  password?: string
  [k: string]: unknown
}

export async function getUserByEmailOrUsername(query: string): Promise<AnyUser | null> {
  const encoded = encodeURIComponent(query)
  const byEmail = await api.get<AnyUser[]>(`/usuarios?email=${encoded}`)
  if (byEmail.length > 0) return byEmail[0]

  const byUsername = await api.get<AnyUser[]>(`/usuarios?username=${encoded}`)
  if (byUsername.length > 0) return byUsername[0]

  const byLegacy = await api.get<AnyUser[]>(`/usuarios?nomeUsuario=${encoded}`)
  if (byLegacy.length > 0) return byLegacy[0]

  return null
}

export async function createUser(
  payload: Partial<AnyUser> & {
    email: string
    username?: string
    nomeUsuario?: string
    password: string
  },
) {
  return api.post<AnyUser>('/usuarios', payload)
}

export async function login({
  emailOrUsername,
  password,
}: {
  emailOrUsername: string
  password: string
}): Promise<AnyUser | null> {
  const user = await getUserByEmailOrUsername(emailOrUsername)
  if (!user) return null
  if ((user.password ?? '') !== password) return null
  return user
}

export const listarConsultasPorCpf = async (cpf: string) => {
  const queryCpf = encodeURIComponent(cpf)
  return api.get<Consulta[]>(`/consultas?cpf=${queryCpf}`)
}

export const criarConsulta = async (payload: ConsultaInput) => {
  return api.post<Consulta>('/consultas', {
    status: payload.status ?? 'marcada',
    ...payload,
  })
}

export const remarcarConsulta = async (id: number, novaDataISO: string) => {
  return api.patch<Consulta>(`/consultas/${id}`, {
    dataISO: novaDataISO,
    status: 'remarcada',
  })
}

export const cancelarConsulta = async (id: number) => {
  return api.patch<Consulta>(`/consultas/${id}`, {
    status: 'cancelada',
  })
}

