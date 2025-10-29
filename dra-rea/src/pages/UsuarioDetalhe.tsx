import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import { api, ApiHttpError } from '../services/api'
import type { Usuario, FeedbackMessage } from '../types'

const schema = z.object({
  nome: z.string().min(3, 'Minimo de 3 caracteres'),
  nomeUsuario: z.string().min(1, 'Informe um nome de usuario'),
  email: z.string().email('E-mail invalido'),
})

type FormData = z.infer<typeof schema>


export default function UsuarioDetalhe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setLoadError(null)

    api
      .get<Usuario>(`/usuarios/${id}`)
      .then((usuario) => {
        reset({
          nome: usuario.nome,
          nomeUsuario: usuario.nomeUsuario,
          email: usuario.email,
        })
      })
      .catch((err) => {
        const message =
          err instanceof ApiHttpError && err.status !== 0
            ? `Erro ${err.status}: ${err.message}`
            : err instanceof Error
              ? err.message
              : 'Nao foi possivel carregar o usuario.'
        setLoadError(message)
      })
      .finally(() => setLoading(false))
  }, [id, reset])

  async function onSubmit(data: FormData) {
    if (!id) return
    setFeedback(null)

    try {
      const payload: Usuario = { id: Number(id), ...data }
      const atualizado = await api.put<Usuario>(`/usuarios/${id}`, payload)
      reset({
        nome: atualizado.nome,
        nomeUsuario: atualizado.nomeUsuario,
        email: atualizado.email,
      })
      setFeedback({ tone: 'success', message: 'Dados atualizados com sucesso.' })
    } catch (err) {
      const message =
        err instanceof ApiHttpError && err.status !== 0
          ? `Erro ${err.status}: ${err.message}`
          : err instanceof Error
            ? err.message
            : 'Nao foi possivel atualizar o usuario.'
      setFeedback({ tone: 'error', message })
    }
  }

  async function excluir() {
    if (!id) return
    const confirmar = window.confirm('Deseja realmente excluir este usuario?')
    if (!confirmar) return
    try {
      await api.del<void>(`/usuarios/${id}`)
      navigate('/usuarios')
    } catch (err) {
      const message =
        err instanceof ApiHttpError && err.status !== 0
          ? `Erro ${err.status}: ${err.message}`
          : err instanceof Error
            ? err.message
            : 'Nao foi possivel excluir o usuario.'
      setFeedback({ tone: 'error', message })
    }
  }

  if (loading) {
    return (
      <section>
        <Alert role="status">Carregando dados do usuario...</Alert>
      </section>
    )
  }

  if (loadError) {
    return (
      <section className="space-y-4">
        <Alert type="error" role="alert">
          {loadError}
        </Alert>
        <button
          type="button"
          onClick={() => navigate('/usuarios')}
          className="inline-flex items-center justify-center border-2 border-brand text-brand font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          Voltar
        </button>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
          Gerenciar usuario
        </h1>
        <p className="text-gray-600">
          Edite os dados sincronizados com a API. Todas as alteracoes sao enviadas por meio de
          requisicoes HTTP PUT.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white border rounded-xl p-5 shadow-sm space-y-4 max-w-lg"
      >
        {feedback && <Alert type={feedback.tone}>{feedback.message}</Alert>}

        <div>
          <label htmlFor="nome" className="font-semibold">
            Nome completo
          </label>
          <input
            id="nome"
            className={`w-full rounded-lg px-3 py-2 border ${
              errors.nome ? 'border-red-600' : 'border-gray-300'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            {...register('nome')}
          />
          {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="nomeUsuario" className="font-semibold">
            Nome de usuario
          </label>
          <input
            id="nomeUsuario"
            className={`w-full rounded-lg px-3 py-2 border ${
              errors.nomeUsuario ? 'border-red-600' : 'border-gray-300'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            {...register('nomeUsuario')}
          />
          {errors.nomeUsuario && (
            <p className="text-red-600 text-sm mt-1">{errors.nomeUsuario.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="font-semibold">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className={`w-full rounded-lg px-3 py-2 border ${
              errors.email ? 'border-red-600' : 'border-gray-300'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            {...register('email')}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand ${
              isSubmitting || !isDirty
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-brand text-white'
            }`}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar alteracoes'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/usuarios')}
            className="inline-flex items-center justify-center border-2 border-brand text-brand font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={excluir}
            className="inline-flex items-center justify-center bg-black text-white font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
          >
            Excluir usuario
          </button>
        </div>
      </form>
    </section>
  )
}
