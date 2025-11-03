import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { api, createUser, getUserByEmailOrUsername } from '../../services/api'

const BASE_URL = import.meta.env.VITE_API_URL?.trim()

if (!BASE_URL) {
  throw new Error('VITE_API_URL não definida; configure o arquivo .env antes de usar a área de login.')
}

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

type FormData = {
  nomeCompleto?: string
  email: string
  password: string
  cpf?: string
}

type User = {
  id: string | number
  email: string
  password?: string
  nomeCompleto?: string
  nome?: string
  name?: string
  cpf?: string
}

const formatCpf = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [feedback, setFeedback] = useState<string | null>(null)
  const navigate = useNavigate()

  const schema = useMemo(
    () =>
      z
        .object({
          nomeCompleto: z
            .string()
            .optional()
            .refine((value) => !value || value.trim().length >= 3, 'Informe o nome completo.'),
          email: z
            .string({ required_error: 'E-mail obrigatorio.' })
            .email('Informe um e-mail valido.'),
          password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres.'),
          cpf: z
            .string()
            .optional()
            .refine((value) => !value || CPF_REGEX.test(value), 'CPF invalido.'),
        })
        .superRefine((data, ctx) => {
          if (mode === 'signup' && !data.nomeCompleto?.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['nomeCompleto'],
              message: 'Nome completo obrigatorio.',
            })
          }
          if (mode === 'signup' && !data.cpf) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['cpf'],
              message: 'CPF obrigatorio.',
            })
          }
        }),
    [mode],
  )

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({ mode: 'onTouched', resolver: zodResolver(schema) })

  const storeAuthUser = (user: User) => {
    const authPayload = {
      id: user.id,
      email: user.email,
      password: user.password ?? '',
      cpf: user.cpf ?? '',
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
        const candidate = (await getUserByEmailOrUsername(data.email)) as User | null
        if (!candidate) {
          setFeedback('Usuário não encontrado.')
          return
        }

        if ((candidate.password ?? '') !== data.password) {
          setFeedback('Senha incorreta.')
          return
        }

        storeAuthUser(candidate)
        navigate('/', { replace: true })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao efetuar login.'
        setFeedback(message)
      }
      return
    }

    try {
      const emailEncoded = encodeURIComponent(data.email)
      const existentesPorEmail = await api.get<User[]>(`/usuarios?email=${emailEncoded}`)
      if (existentesPorEmail.length > 0) {
        setFeedback('E-mail já cadastrado.')
        return
      }

      if (data.cpf) {
        const cpfEncoded = encodeURIComponent(data.cpf)
        const existentesPorCpf = await api.get<User[]>(`/usuarios?cpf=${cpfEncoded}`)
        if (existentesPorCpf.length > 0) {
          setFeedback('CPF já cadastrado.')
          return
        }
      }

      await createUser({
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        password: data.password,
        cpf: data.cpf,
      })

      setFeedback('Cadastro realizado! Entre com seu e-mail e senha.')
      setMode('login')
      reset({ email: data.email, password: '', cpf: data.cpf })
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
          <>
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

            <div className="mb-4">
              <label htmlFor="cpf" className="font-semibold">
                CPF *
              </label>
              <Controller
                control={control}
                name="cpf"
                render={({ field }) => (
                  <input
                    {...field}
                    id="cpf"
                    inputMode="numeric"
                    maxLength={14}
                    className={`w-full rounded-lg px-3 py-2 border ${
                      errors.cpf ? 'border-red-600' : 'border-gray-300'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
                    aria-invalid={errors.cpf ? 'true' : 'false'}
                    onChange={(event) => field.onChange(formatCpf(event.target.value))}
                  />
                )}
              />
              {errors.cpf && (
                <p className="text-red-600 text-sm mt-1" role="alert">
                  {errors.cpf.message}
                </p>
              )}
            </div>
          </>
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
