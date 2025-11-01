import type { Consulta, ConsultaInput } from '../types'

const ENV_BASE = import.meta.env.VITE_API_BASEURL as string | undefined
const BASE_URL = ENV_BASE && ENV_BASE.trim() !== '' ? ENV_BASE : 'http://localhost:3001'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

async function request<T>(path: string, method: Method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`HTTP ${response.status} - ${text || response.statusText}`)
  }

  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

export const api = {
  get: <T>(path: string) => request<T>(path, 'GET'),
  post: <T>(path: string, payload: unknown) => request<T>(path, 'POST', payload),
  put: <T>(path: string, payload: unknown) => request<T>(path, 'PUT', payload),
  patch: <T>(path: string, payload: unknown) => request<T>(path, 'PATCH', payload),
  del: <T>(path: string) => request<T>(path, 'DELETE'),
}

// Types used by auth helpers (kept lightweight to avoid coupling)
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

