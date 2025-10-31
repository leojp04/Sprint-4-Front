import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

const BASE_URL =
  (import.meta.env.VITE_API_BASEURL as string | undefined)?.trim() || 'http://localhost:3001'

type FormData = {
  nomeCompleto?: string
  email: string
  password: string
}

type User = {
  id: string | number
  email: string
  password?: string
  nomeCompleto?: string
  nome?: string
  name?: string
}

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [feedback, setFeedback] = useState<string | null>(null)
  const navigate = useNavigate()

  const schema = z
    .object({
      nomeCompleto: z.string().optional(),
      email: z
        .string({ required_error: 'E-mail é obrigatório.' })
        .email('Informe um e-mail válido.'),
      password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres.'),
    })
    .superRefine((data, ctx) => {
      if (mode === 'signup' && !data.nomeCompleto?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['nomeCompleto'],
          message: 'Nome completo é obrigatório.',
        })
      }
    })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({ mode: 'onTouched', resolver: zodResolver(schema) })

  const storeAuthUser = (user: User) => {
    const authPayload = {
      id: user.id,
      email: user.email,
      name: user.nomeCompleto ?? user.nome ?? user.name ?? '',
      nomeCompleto: user.nomeCompleto ?? user.nome ?? user.name ?? '',
    }
    window.localStorage.setItem('authUser', JSON.stringify(authPayload))
    window.dispatchEvent(new Event('authUserChanged'))
  }

  async function onSubmit(data: FormData) {
    setFeedback(null)

    if (mode === 'login') {
      try {
        const response = await fetch(`${BASE_URL}/usuarios?email=${encodeURIComponent(data.email)}`)
        if (!response.ok) throw new Error('Falha ao buscar usuário.')

        const users = (await response.json()) as User[]
        if (!users || users.length === 0) {
          setFeedback('Usuário não encontrado.')
          return
        }

        const user = users[0]
        if ((user.password ?? '') !== data.password) {
          setFeedback('Senha incorreta.')
          return
        }

        storeAuthUser(user)
        navigate('/', { replace: true })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao efetuar login.'
        setFeedback(message)
      }
      return
    }

    try {
      const existsRes = await fetch(
        `${BASE_URL}/usuarios?email=${encodeURIComponent(data.email)}`
      )
      if (!existsRes.ok) throw new Error('Falha ao verificar e-mail.')

      const exists = (await existsRes.json()) as User[]
      if (exists && exists.length > 0) {
        setFeedback('E-mail já cadastrado.')
        return
      }

      const payload = {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        password: data.password,
      }
      const createRes = await fetch(`${BASE_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!createRes.ok) throw new Error('Falha ao cadastrar usuário.')

      setFeedback('Cadastro realizado! Entre com seu e-mail e senha.')
      setMode('login')
      reset({ email: data.email, password: '' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao cadastrar usuário.'
      setFeedback(message)
    }
  }

  const toggleMode = () => {
    setFeedback(null)
    setMode((current) => (current === 'login' ? 'signup' : 'login'))
  }

  return (
    <section className="max-w-md mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-6">
        Login
      </h1>

      {feedback && (
        <div className="mb-3 text-red-700 bg-red-50 border border-red-200 rounded-md p-3" role="alert">
          {feedback}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white border rounded-xl p-5 shadow-sm"
      >
        {mode === 'signup' && (
          <div className="mb-4">
            <label htmlFor="nomeCompleto" className="font-semibold">
              Nome completo *
            </label>
            <input
              id="nomeCompleto"
              className={`w-full rounded-lg px-3 py-2 border ${
                errors.nomeCompleto ? 'border-red-600' : 'border-gray-300'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
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
        )}

        <div className="mb-4">
          <label htmlFor="email" className="font-semibold">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            className={`w-full rounded-lg px-3 py-2 border ${
              errors.email ? 'border-red-600' : 'border-gray-300'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email')}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="font-semibold">
            Senha *
          </label>
          <input
            id="password"
            type="password"
            className={`w-full rounded-lg px-3 py-2 border ${
              errors.password ? 'border-red-600' : 'border-gray-300'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password')}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          aria-disabled={!isValid}
          className={`w-full rounded-md px-4 py-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand ${
            !isValid
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[var(--brand)] text-white hover:brightness-90'
          }`}
        >
          {mode === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        <p className="mt-3 text-sm text-ink">
          {mode === 'login' ? (
            <>
              Não tem conta?{' '}
              <button type="button" onClick={toggleMode} className="text-brand underline">
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem conta?{' '}
              <button type="button" onClick={toggleMode} className="text-brand underline">
                Entrar
              </button>
            </>
          )}
        </p>
      </form>
    </section>
  )
}

