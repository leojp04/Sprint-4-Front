import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Alert from '../components/Alert'
import Modal from '../components/Modal'
import {
  cancelarConsulta,
  listarConsultasPorCpf,
  remarcarConsulta,
} from '../services/api'
import type { Consulta } from '../types'

type AuthUser = {
  id: number | string
  nomeCompleto?: string
  name?: string
  email?: string
  cpf?: string
  password?: string
}

type Feedback = { type: 'success' | 'error'; message: string } | null

const passwordSchema = z
  .object({
    senhaAtual: z
      .string({ required_error: 'Informe a senha atual.' })
      .min(6, 'A senha deve ter ao menos 6 caracteres.'),
    novaSenha: z
      .string({ required_error: 'Informe a nova senha.' })
      .min(6, 'A nova senha deve ter ao menos 6 caracteres.'),
    confirmarSenha: z
      .string({ required_error: 'Confirme a nova senha.' })
      .min(6, 'A confirmacao deve ter ao menos 6 caracteres.'),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas precisam coincidir.',
  })

type PasswordFormData = z.infer<typeof passwordSchema>

const inputClasses =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a1203a]'

function readAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem('authUser')
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function persistAuthUser(user: AuthUser) {
  window.localStorage.setItem('authUser', JSON.stringify(user))
  window.dispatchEvent(new Event('authUserChanged'))
}

const formatDateTime = (iso: string) => {
  try {
    const date = new Date(iso)
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(date)
  } catch {
    return iso
  }
}

export default function Perfil() {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => readAuthUser())
  const [passwordFeedback, setPasswordFeedback] = useState<Feedback>(null)
  const [consultasFeedback, setConsultasFeedback] = useState<Feedback>(null)
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [consultasLoading, setConsultasLoading] = useState(false)
  const [modalConsulta, setModalConsulta] = useState<Consulta | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalValue, setModalValue] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onTouched',
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
    },
  })

  const [showAtual, setShowAtual] = useState(false)
  const [showNova, setShowNova] = useState(false)
  const [showConfirmar, setShowConfirmar] = useState(false)

  useEffect(() => {
    if (!authUser) {
      navigate('/login', { replace: true })
      return
    }
    if (!authUser?.cpf) return
    setConsultasLoading(true)
    listarConsultasPorCpf(authUser.cpf)
      .then((data) => {
        setConsultas(data)
        setConsultasFeedback(null)
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : 'Nao foi possivel carregar as consultas.'
        setConsultasFeedback({ type: 'error', message })
      })
      .finally(() => setConsultasLoading(false))
  }, [authUser, navigate])

  const onSubmitPassword = handleSubmit(async (data) => {
    if (!authUser) return
    setPasswordFeedback(null)

    if ((authUser.password ?? '') !== data.senhaAtual) {
      setError('senhaAtual', { type: 'validate', message: 'Senha atual incorreta.' })
      setPasswordFeedback({ type: 'error', message: 'A senha atual informada esta incorreta.' })
      return
    }

    const updatedUser: AuthUser = {
      ...authUser,
      password: data.novaSenha,
    }
    persistAuthUser(updatedUser)
    setAuthUser(updatedUser)
    setPasswordFeedback({ type: 'success', message: 'Senha atualizada com sucesso!' })

    reset({ senhaAtual: '', novaSenha: '', confirmarSenha: '' })
    setShowAtual(false)
    setShowNova(false)
    setShowConfirmar(false)
  })

  const openModal = useCallback((consulta: Consulta) => {
    setModalConsulta(consulta)
    setModalValue(consulta.dataISO)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setModalConsulta(null)
  }, [])

  const handleConfirmRemarcacao = useCallback(
    async (value: string) => {
      if (!modalConsulta) return
      if (!value) {
        setConsultasFeedback({
          type: 'error',
          message: 'Informe a nova data e horario para remarcar.',
        })
        return
      }
      try {
        const atualizada = await remarcarConsulta(modalConsulta.id, value)
        setConsultas((prev) =>
          prev.map((item) => (item.id === modalConsulta.id ? atualizada : item)),
        )
        setConsultasFeedback({
          type: 'success',
          message: 'Consulta remarcada com sucesso.',
        })
        closeModal()
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Nao foi possivel remarcar a consulta.'
        setConsultasFeedback({ type: 'error', message })
      }
    },
    [closeModal, modalConsulta],
  )

  const handleCancelamento = useCallback(async (consulta: Consulta) => {
    const confirmar = window.confirm('Tem certeza que deseja cancelar esta consulta?')
    if (!confirmar) return
    try {
      const atualizada = await cancelarConsulta(consulta.id)
      setConsultas((prev) =>
        prev.map((item) => (item.id === consulta.id ? atualizada : item)),
      )
      setConsultasFeedback({
        type: 'success',
        message: 'Consulta cancelada com sucesso.',
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nao foi possivel cancelar a consulta.'
      setConsultasFeedback({ type: 'error', message })
    }
  }, [])

  const usuarioNome = useMemo(
    () => authUser?.nomeCompleto ?? authUser?.name ?? 'Visitante',
    [authUser],
  )

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-black text-[#a1203a] text-center mb-10">
        Perfil do Usuario
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#111827]">Informacoes pessoais</h2>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1" htmlFor="perfil-nome">
                Nome completo
              </label>
              <input
                id="perfil-nome"
                type="text"
                value={usuarioNome}
                disabled
                className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
                aria-readonly="true"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1" htmlFor="perfil-email">
                E-mail
              </label>
              <input
                id="perfil-email"
                type="email"
                value={authUser?.email ?? ''}
                disabled
                className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
                aria-readonly="true"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1" htmlFor="perfil-cpf">
                CPF
              </label>
              <input
                id="perfil-cpf"
                type="text"
                value={authUser?.cpf ?? ''}
                disabled
                className={`${inputClasses} bg-gray-100 cursor-not-allowed`}
                aria-readonly="true"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-white shadow-md p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#111827]">Alterar senha</h2>

            {passwordFeedback && (
              <Alert type={passwordFeedback.type} role="status">
                {passwordFeedback.message}
              </Alert>
            )}

            <form className="space-y-4" onSubmit={onSubmitPassword}>
              <div>
                <label
                  className="block text-sm font-medium text-[#111827] mb-1"
                  htmlFor="senhaAtual"
                >
                  Senha atual
                </label>
                <div className="relative">
                  <input
                    id="senhaAtual"
                    type={showAtual ? 'text' : 'password'}
                    className={inputClasses}
                    aria-invalid={errors.senhaAtual ? 'true' : 'false'}
                    {...register('senhaAtual')}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAtual((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-[#a1203a]"
                    aria-label={showAtual ? 'Ocultar senha atual' : 'Mostrar senha atual'}
                    aria-pressed={showAtual}
                  >
                    {showAtual ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {errors.senhaAtual && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.senhaAtual.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1" htmlFor="novaSenha">
                  Nova senha
                </label>
                <div className="relative">
                  <input
                    id="novaSenha"
                    type={showNova ? 'text' : 'password'}
                    className={inputClasses}
                    aria-invalid={errors.novaSenha ? 'true' : 'false'}
                    {...register('novaSenha')}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNova((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-[#a1203a]"
                    aria-label={showNova ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                    aria-pressed={showNova}
                  >
                    {showNova ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {errors.novaSenha && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.novaSenha.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#111827] mb-1"
                  htmlFor="confirmarSenha"
                >
                  Confirmar nova senha
                </label>
                <div className="relative">
                  <input
                    id="confirmarSenha"
                    type={showConfirmar ? 'text' : 'password'}
                    className={inputClasses}
                    aria-invalid={errors.confirmarSenha ? 'true' : 'false'}
                    {...register('confirmarSenha')}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmar((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-[#a1203a]"
                    aria-label={showConfirmar ? 'Ocultar confirmacao de senha' : 'Mostrar confirmacao de senha'}
                    aria-pressed={showConfirmar}
                  >
                    {showConfirmar ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {errors.confirmarSenha && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.confirmarSenha.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#a1203a] px-4 py-3 font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2 disabled:opacity-80"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-[#111827]">Minhas consultas</h2>
            <button
              type="button"
              onClick={() => navigate('/agendar')}
              className="rounded-lg bg-[#a1203a] px-4 py-2 text-sm font-semibold text-white hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2"
            >
              Agendar nova
            </button>
          </div>

          {consultasFeedback && (
            <Alert type={consultasFeedback.type} role="status">
              {consultasFeedback.message}
            </Alert>
          )}

          <div className="space-y-4">
            {consultasLoading && (
              <div className="rounded-2xl border bg-white p-6 text-center text-sm text-[#4b5563]">
                Carregando consultas...
              </div>
            )}

            {!consultasLoading && consultas.length === 0 && (
              <div className="rounded-2xl border bg-white p-6 text-center text-sm text-[#4b5563]">
                Nenhuma consulta encontrada. Agende uma consulta para visualiza-la aqui.
              </div>
            )}

            {consultas.map((consulta) => (
              <article key={consulta.id} className="shadow-sm border rounded-2xl p-6 bg-white space-y-2">
                <header className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[#111827]">
                    {consulta.especialidade.charAt(0).toUpperCase() + consulta.especialidade.slice(1)}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                      consulta.status === 'marcada'
                        ? 'bg-green-100 text-green-700'
                        : consulta.status === 'remarcada'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {consulta.status}
                  </span>
                </header>

                <p className="text-sm text-[#4b5563]">
                  {consulta.tipoTerapia.charAt(0).toUpperCase() + consulta.tipoTerapia.slice(1)}
                </p>
                <p className="text-sm text-[#111827] font-medium">{formatDateTime(consulta.dataISO)}</p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openModal(consulta)}
                    className="rounded-lg border border-[#a1203a] px-4 py-2 text-sm font-semibold text-[#a1203a] hover:bg-[#fbe8ec] focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2"
                  >
                    Remarcar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelamento(consulta)}
                    className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={(value) => {
          setModalValue(value)
          handleConfirmRemarcacao(value)
        }}
        initialValue={modalValue}
        title="Remarcar consulta"
      />
    </section>
  )
}






