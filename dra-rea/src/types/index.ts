export interface Usuario {
  id: number
  nome: string
  nomeUsuario: string
  email: string
  avatar?: string
}

export type Role = 'admin' | 'user'

export type UsuarioAtivo = Usuario & { ativo: boolean }

export type FeedbackMessage =
  | { tone: 'success'; message: string }
  | { tone: 'error'; message: string }
  | { tone: 'info'; message: string }
