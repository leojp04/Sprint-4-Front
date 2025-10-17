export interface Usuario {
    id: number
    nome: string
    nomeUsuario: string
    email: string
    avatar?: string
  }
  
  export type Role = 'admin' | 'user'
  export type UsuarioAtivo = Usuario & { ativo: boolean }

  