export interface Usuario {
  id: number | string
  nome?: string
  nomeUsuario?: string
  username?: string
  nomeCompleto?: string
  email: string
  avatar?: string
  password?: string
}

export type Role = 'admin' | 'user'
export type UsuarioAtivo = Usuario & { ativo: boolean }

export type ConsultaStatus = 'marcada' | 'remarcada' | 'cancelada'

export interface Consulta {
  id: number
  cpf: string
  nomePaciente: string
  email: string
  especialidade:
    | 'fisioterapia'
    | 'psicologia'
    | 'terapia ocupacional'
    | 'fonoaudiologia'
    | 'ortopedia'
  tipoTerapia: 'individual' | 'grupo'
  dataISO: string
  status: ConsultaStatus
}

export type ConsultaInput = Omit<Consulta, 'id' | 'status'> & { status?: ConsultaStatus }

  
