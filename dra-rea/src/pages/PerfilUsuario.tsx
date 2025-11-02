import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Alert from '../components/Alert'
import { api } from '../services/api'

type Feedback = { type: 'success' | 'error'; message: string }

type AuthUser = {
  id: string | number
  name?: string
  nomeCompleto?: string
  email?: string
  password?: string
}

type FormData = {
  nomeCompleto: string
  email: string
  senhaAtual: string
  novaSenha: string
  confirmarSenha: string
}

const schema = z
  .object({
    nomeCompleto: z
      .string({ required_error: 'Nome completo é obrigatório.' })
      .trim()
      .min(3, 'Informe ao menos 3 caracteres.'),
    email: z.string().email(),
    senhaAtual: z
      .string({ required_error: 'Informe a senha atual.' })
      .min(6, 'A senha atual deve ter ao menos 6 caracteres.'),
    novaSenha: z
      .string({ required_error: 'Nova senha é obrigatória.' })
      .min(6, 'A nova senha deve ter ao menos 6 caracteres.'),
    confirmarSenha: z
      .string({ required_error: 'Confirme a nova senha.' })
      .min(6, 'A confirmação deve ter ao menos 6 caracteres.'),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas digitadas não coincidem.',
  })

const inputBaseClasses =
  'w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-300 transition-shadow disabled:opacity-80 disabled:cursor-not-allowed'

function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem('authUser')
    if (!value) return null
    return JSON.parse(value) as AuthUser
  } catch {
    return null
  }
}

export default function PerfilUsuario() {
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUser())
  const [showSenhaAtual, setShowSenhaAtual] = useState(false)
  const [showNovaSenha, setShowNovaSenha] = useState(false)
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      nomeCompleto: '',
      email: '',
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
    },
  })

  useEffect(() => {
    const handleAuthChange = () => setAuthUser(getAuthUser())

    window.addEventListener('storage', handleAuthChange)
    window.addEventListener('authUserChanged', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleAuthChange)
      window.removeEventListener('authUserChanged', handleAuthChange)
    }
  }, [])

  useEffect(() => {
    if (!authUser) return
    setValue('nomeCompleto', authUser.nomeCompleto ?? authUser.name ?? '')
    setValue('email', authUser.email ?? '')
  }, [authUser, setValue])

  const handleSave = handleSubmit(
    async (data) => {
      setFeedback(null)

      if (!authUser?.id) {
        setFeedback({
          type: 'error',
          message: 'Não foi possível localizar os dados do usuário autenticado.',
        })
        return
      }

      let storedPassword = authUser.password ?? ''

      if (!storedPassword) {
        try {
          const userData = await api.get<AuthUser>(`/usuarios/${authUser.id}`)
          storedPassword = userData?.password ?? ''
          if (storedPassword) {
            setAuthUser((prev) => (prev ? { ...prev, password: storedPassword } : prev))
          }
        } catch {
          // ignora erro para não interromper o fluxo
        }
      }

      if (!storedPassword || storedPassword !== data.senhaAtual) {
        const message = 'A senha atual informada está incorreta.'
        setError('senhaAtual', {
          type: 'validate',
          message,
        })
        setFeedback({
          type: 'error',
          message,
        })
        return
      }

      const payload = {
        password: data.novaSenha,
        nomeCompleto: data.nomeCompleto,
      }

      try {
        await api.patch<AuthUser>(`/usuarios/${authUser.id}`, payload)

        const updatedUser: AuthUser = {
          ...authUser,
          nomeCompleto: data.nomeCompleto,
          name: data.nomeCompleto,
          password: data.novaSenha,
        }

        window.localStorage.setItem('authUser', JSON.stringify(updatedUser))
        window.dispatchEvent(new Event('authUserChanged'))
        setAuthUser(updatedUser)

        setFeedback({ type: 'success', message: 'Dados atualizados com sucesso!' })

        reset({
          nomeCompleto: data.nomeCompleto,
          email: updatedUser.email ?? '',
          senhaAtual: '',
          novaSenha: '',
          confirmarSenha: '',
        })
        setShowSenhaAtual(false)
        setShowNovaSenha(false)
        setShowConfirmarSenha(false)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Ocorreu um erro ao salvar as alterações.'
        setFeedback({ type: 'error', message })
      }
    },
    (formErrors) => {
      const messages = [
        formErrors.senhaAtual?.message,
        formErrors.novaSenha?.message,
        formErrors.confirmarSenha?.message,
        formErrors.nomeCompleto?.message,
      ].filter(Boolean) as string[]

      if (messages.length > 0) {
        setFeedback({ type: 'error', message: messages[0] })
      }
    },
  )

  return (
    <section className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-8">
        Perfil do Usuário
      </h1>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
        {feedback && (
          <div className="mb-4">
            <Alert type={feedback.type}>{feedback.message}</Alert>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6" noValidate>
          <div>
            <label htmlFor="nomeCompleto" className="block text-sm font-semibold text-[#111827] mb-1">
              Nome completo
            </label>
            <input
              id="nomeCompleto"
              className={`${inputBaseClasses} ${errors.nomeCompleto ? 'border-red-500 focus:ring-red-300' : ''}`}
              aria-invalid={errors.nomeCompleto ? 'true' : 'false'}
              {...register('nomeCompleto')}
              autoComplete="name"
            />
            {errors.nomeCompleto && (
              <p className="text-red-600 text-sm mt-1" role="alert">
                {errors.nomeCompleto.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#111827] mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              disabled
              className={inputBaseClasses}
              {...register('email')}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="senhaAtual" className="block text-sm font-semibold text-[#111827] mb-1">
              Senha atual
            </label>
            <div className="relative">
              <input
                id="senhaAtual"
                type={showSenhaAtual ? 'text' : 'password'}
                className={`${inputBaseClasses} pr-20 ${errors.senhaAtual ? 'border-red-500 focus:ring-red-300' : ''}`}
                aria-invalid={errors.senhaAtual ? 'true' : 'false'}
                {...register('senhaAtual')}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowSenhaAtual((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
                aria-label={`${showSenhaAtual ? 'Ocultar' : 'Mostrar'} senha atual`}
                aria-pressed={showSenhaAtual}
              >
                {showSenhaAtual ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.senhaAtual && (
              <p className="text-red-600 text-sm mt-1" role="alert">
                {errors.senhaAtual.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="novaSenha" className="block text-sm font-semibold text-[#111827] mb-1">
              Nova senha
            </label>
            <div className="relative">
              <input
                id="novaSenha"
                type={showNovaSenha ? 'text' : 'password'}
                className={`${inputBaseClasses} pr-20 ${errors.novaSenha ? 'border-red-500 focus:ring-red-300' : ''}`}
                aria-invalid={errors.novaSenha ? 'true' : 'false'}
                {...register('novaSenha')}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNovaSenha((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
                aria-label={`${showNovaSenha ? 'Ocultar' : 'Mostrar'} nova senha`}
                aria-pressed={showNovaSenha}
              >
                {showNovaSenha ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.novaSenha && (
              <p className="text-red-600 text-sm mt-1" role="alert">
                {errors.novaSenha.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmarSenha"
              className="block text-sm font-semibold text-[#111827] mb-1"
            >
              Confirmar senha
            </label>
            <div className="relative">
              <input
                id="confirmarSenha"
                type={showConfirmarSenha ? 'text' : 'password'}
                className={`${inputBaseClasses} pr-20 ${errors.confirmarSenha ? 'border-red-500 focus:ring-red-300' : ''}`}
                aria-invalid={errors.confirmarSenha ? 'true' : 'false'}
                {...register('confirmarSenha')}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmarSenha((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300"
                aria-label={`${showConfirmarSenha ? 'Ocultar' : 'Mostrar'} confirmação de senha`}
                aria-pressed={showConfirmarSenha}
              >
                {showConfirmarSenha ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.confirmarSenha && (
              <p className="text-red-600 text-sm mt-1" role="alert">
                {errors.confirmarSenha.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#a1203a] hover:brightness-95 text-white rounded-lg px-4 py-3 w-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a1203a] disabled:opacity-80"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </section>
  )
}
