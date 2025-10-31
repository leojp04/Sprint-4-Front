import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Alert from '../components/Alert'

type Feedback = { type: 'success' | 'error'; message: string }

type FormData = {
  nomeCompleto: string
  email: string
  novaSenha: string
  confirmarSenha: string
}

const schema = z.object({
  nomeCompleto: z
    .string({ required_error: 'Nome completo e obrigatorio.' })
    .trim()
    .min(3, 'Informe ao menos 3 caracteres.'),
  email: z.string().email(),
  novaSenha: z
    .string({ required_error: 'Nova senha e obrigatoria.' })
    .min(6, 'Senha deve ter ao menos 6 caracteres.'),
  confirmarSenha: z
    .string({ required_error: 'Confirme a nova senha.' })
    .min(6, 'Senha deve ter ao menos 6 caracteres.'),
})

const inputBaseClasses =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 transition-shadow disabled:opacity-80 disabled:cursor-not-allowed'

export default function PerfilUsuario() {
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const storedUser = useMemo(() => {
    try {
      if (typeof window === 'undefined') return null
      const value = window.localStorage.getItem('authUser')
      if (!value) return null
      return JSON.parse(value) as { nomeCompleto?: string; email?: string }
    } catch {
      return null
    }
  }, [])

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
      novaSenha: '',
      confirmarSenha: '',
    },
  })

  useEffect(() => {
    if (storedUser) {
      setValue('nomeCompleto', storedUser.nomeCompleto ?? '')
      setValue('email', storedUser.email ?? '')
    }
  }, [setValue, storedUser])

  const handleSave = handleSubmit((data) => {
    setFeedback(null)

    if (data.novaSenha !== data.confirmarSenha) {
      setError('confirmarSenha', {
        type: 'validate',
        message: 'As senhas digitadas nao coincidem.',
      })
      setFeedback({ type: 'error', message: 'As senhas digitadas nao coincidem.' })
      return
    }

    // Simula salvamento com sucesso
    setFeedback({ type: 'success', message: 'Dados atualizados com sucesso!' })
    reset({
      nomeCompleto: data.nomeCompleto,
      email: data.email,
      novaSenha: '',
      confirmarSenha: '',
    })
  })

  return (
    <section className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-8">
        Perfil do Usu\u00e1rio
      </h1>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 sm:p-8">
        {feedback && (
          <div className="mb-4">
            <Alert type={feedback.type}>{feedback.message}</Alert>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label htmlFor="nomeCompleto" className="block text-sm font-semibold text-[#111827] mb-1">
              Nome completo
            </label>
            <input
              id="nomeCompleto"
              type="text"
              className={`${inputBaseClasses} ${errors.nomeCompleto ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
              aria-invalid={errors.nomeCompleto ? 'true' : 'false'}
              {...register('nomeCompleto')}
              autoComplete="name"
            />
            {errors.nomeCompleto && (
              <p className="text-red-600 text-sm mt-1">{errors.nomeCompleto.message}</p>
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
            <label htmlFor="novaSenha" className="block text-sm font-semibold text-[#111827] mb-1">
              Nova senha
            </label>
            <input
              id="novaSenha"
              type="password"
              className={`${inputBaseClasses} ${errors.novaSenha ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
              aria-invalid={errors.novaSenha ? 'true' : 'false'}
              {...register('novaSenha')}
              autoComplete="new-password"
            />
            {errors.novaSenha && (
              <p className="text-red-600 text-sm mt-1">{errors.novaSenha.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="block text-sm font-semibold text-[#111827] mb-1">
              Confirmar senha
            </label>
            <input
              id="confirmarSenha"
              type="password"
              className={`${inputBaseClasses} ${errors.confirmarSenha ? 'border-red-500 focus-visible:ring-red-300' : ''}`}
              aria-invalid={errors.confirmarSenha ? 'true' : 'false'}
              {...register('confirmarSenha')}
              autoComplete="new-password"
            />
            {errors.confirmarSenha && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmarSenha.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#a1203a] px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#8b1b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a1203a] disabled:opacity-80"
          >
            Salvar altera\u00e7\u00f5es
          </button>
        </form>
      </div>
    </section>
  )
}
