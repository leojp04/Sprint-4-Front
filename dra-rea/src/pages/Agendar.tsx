import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import Alert from '../components/Alert'
import { criarConsulta, listarConsultasPorCpf } from '../services/api'
import type { Consulta } from '../types'

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

const schema = z.object({
  nomeCompleto: z
    .string({ required_error: 'Informe o nome completo.' })
    .trim()
    .min(3, 'Informe ao menos 3 caracteres.'),
  cpf: z
    .string({ required_error: 'Informe o CPF.' })
    .refine((value) => CPF_REGEX.test(value), 'CPF invalido.'),
  email: z.string({ required_error: 'Informe o e-mail.' }).email('E-mail invalido.'),
  especialidade: z.enum(
    ['fisioterapia', 'psicologia', 'terapia ocupacional', 'fonoaudiologia', 'ortopedia'],
    { errorMap: () => ({ message: 'Selecione uma especialidade.' }) },
  ),
  tipoTerapia: z.enum(['individual', 'grupo'], {
    errorMap: () => ({ message: 'Selecione o tipo de terapia.' }),
  }),
  diaSemana: z.enum(['segunda-feira', 'terca-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira'], {
    errorMap: () => ({ message: 'Selecione o dia da semana.' }),
  }),
  dataISO: z
    .string({ required_error: 'Informe a data e horario.' })
    .refine((value) => Boolean(value), 'Informe a data e horario.'),
})

type FormData = z.infer<typeof schema>

type Feedback =
  | { type: 'success'; message: string; showLoginPrompt: boolean }
  | { type: 'error'; message: string }
  | null

const inputClasses =
  'border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a1203a] w-full'

const selectClasses = `${inputClasses} bg-white`

function formatCpf(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function getAuthUser() {
  if (typeof window === 'undefined') return null
  try {
    const text = window.localStorage.getItem('authUser')
    if (!text) return null
    return JSON.parse(text) as { nomeCompleto?: string; name?: string; email?: string; cpf?: string }
  } catch {
    return null
  }
}

export default function Agendar() {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState<Feedback>(null)
  const authUser = useMemo(() => getAuthUser(), [])

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      nomeCompleto: authUser?.nomeCompleto ?? authUser?.name ?? '',
      email: authUser?.email ?? '',
      cpf: authUser?.cpf ?? '',
      especialidade: undefined,
      tipoTerapia: undefined,
      diaSemana: undefined,
      dataISO: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setFeedback(null)
    try {
      const existentes = await listarConsultasPorCpf(data.cpf)
      const possuiAtiva = existentes.some(
        (consulta: Consulta) => consulta.status !== 'cancelada',
      )
      if (possuiAtiva) {
        setError('cpf', {
          type: 'validate',
          message: 'Ja existe uma consulta ativa vinculada a este CPF.',
        })
        setFeedback({ type: 'error', message: 'Ja existe uma consulta ativa para este CPF.' })
        return
      }

      await criarConsulta({
        cpf: data.cpf,
        nomePaciente: data.nomeCompleto,
        email: data.email,
        especialidade: data.especialidade,
        tipoTerapia: data.tipoTerapia,
        diaSemana: data.diaSemana,
        dataISO: data.dataISO,
      })

      setFeedback({
        type: 'success',
        message: 'Consulta agendada com sucesso!',
        showLoginPrompt: !authUser,
      })

      reset({
        nomeCompleto: authUser?.nomeCompleto ?? authUser?.name ?? '',
        email: authUser?.email ?? '',
        cpf: authUser?.cpf ?? '',
        especialidade: undefined,
        tipoTerapia: undefined,
        diaSemana: undefined,
        dataISO: '',
      })

      if (authUser) {
        setTimeout(() => navigate('/perfil'), 1500)
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nao foi possivel agendar a consulta.'
      setFeedback({ type: 'error', message })
    }
  })

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-black text-[#a1203a] text-center mb-8">
        Agendar Consulta
      </h1>

      <div className="max-w-xl mx-auto bg-white shadow-md p-8 rounded-2xl space-y-6">
        {feedback && (
          <Alert type={feedback.type} role="status">
            {feedback.message}
          </Alert>
        )}

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div>
            <label htmlFor="nomeCompleto" className="block text-sm font-semibold text-[#111827] mb-1">
              Nome completo
            </label>
            <input
              id="nomeCompleto"
              className={inputClasses}
              aria-invalid={errors.nomeCompleto ? 'true' : 'false'}
              {...register('nomeCompleto')}
              autoComplete="name"
            />
            {errors.nomeCompleto && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.nomeCompleto.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-semibold text-[#111827] mb-1">
              CPF
            </label>
            <Controller
              control={control}
              name="cpf"
              render={({ field }) => (
                <input
                  {...field}
                  id="cpf"
                  className={inputClasses}
                  aria-invalid={errors.cpf ? 'true' : 'false'}
                  onChange={(event) => field.onChange(formatCpf(event.target.value))}
                  inputMode="numeric"
                  maxLength={14}
                />
              )}
            />
            {errors.cpf && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.cpf.message}
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
              className={inputClasses}
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email')}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="especialidade" className="block text-sm font-semibold text-[#111827] mb-1">
                Especialidade
              </label>
              <select
                id="especialidade"
                className={selectClasses}
                aria-invalid={errors.especialidade ? 'true' : 'false'}
                defaultValue=""
                {...register('especialidade')}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="fisioterapia">Fisioterapia</option>
                <option value="psicologia">Psicologia</option>
                <option value="terapia ocupacional">Terapia ocupacional</option>
                <option value="fonoaudiologia">Fonoaudiologia</option>
                <option value="ortopedia">Ortopedia</option>
              </select>
              {errors.especialidade && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.especialidade.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="tipoTerapia" className="block text-sm font-semibold text-[#111827] mb-1">
                Tipo de terapia
              </label>
              <select
                id="tipoTerapia"
                className={selectClasses}
                aria-invalid={errors.tipoTerapia ? 'true' : 'false'}
                defaultValue=""
                {...register('tipoTerapia')}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="individual">Individual</option>
                <option value="grupo">Grupo</option>
              </select>
              {errors.tipoTerapia && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.tipoTerapia.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="diaSemana" className="block text-sm font-semibold text-[#111827] mb-1">
                Dia da semana
              </label>
              <select
                id="diaSemana"
                className={selectClasses}
                aria-invalid={errors.diaSemana ? 'true' : 'false'}
                defaultValue=""
                {...register('diaSemana')}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="segunda-feira">Segunda-feira</option>
                <option value="terca-feira">Terca-feira</option>
                <option value="quarta-feira">Quarta-feira</option>
                <option value="quinta-feira">Quinta-feira</option>
                <option value="sexta-feira">Sexta-feira</option>
              </select>
              {errors.diaSemana && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.diaSemana.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="dataISO" className="block text-sm font-semibold text-[#111827] mb-1">
                Data e horario
              </label>
              <input
                id="dataISO"
                type="datetime-local"
                className={inputClasses}
                aria-invalid={errors.dataISO ? 'true' : 'false'}
                {...register('dataISO')}
              />
              {errors.dataISO && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.dataISO.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#a1203a] text-white hover:brightness-95 rounded-lg px-5 py-3 w-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2 disabled:opacity-80"
          >
            {isSubmitting ? 'Agendando...' : 'Agendar consulta'}
          </button>
        </form>

        {feedback?.type === 'success' && feedback.showLoginPrompt && (
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full rounded-lg border border-[#a1203a] px-4 py-2 text-[#a1203a] font-semibold hover:bg-[#fbe8ec] focus:outline-none focus:ring-2 focus:ring-[#a1203a] focus:ring-offset-2"
          >
            Fazer login para acompanhar
          </button>
        )}
      </div>
    </section>
  )
}

