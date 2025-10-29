import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Alert from '../components/Alert'

type FormData = {
  nome: string
  email: string
  telefone?: string
  mensagem: string
}

const LIMITE_MENSAGEM = 600
const nomeRegex = /^[\p{L}\s'-]+$/u

export default function Contato() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<FormData>({ mode: 'onTouched' })

  const caracteres = watch('mensagem', '').length

  const regrasNome = useMemo(
    () => ({
      required: 'Informe o nome completo',
      minLength: { value: 3, message: 'Minimo de 3 caracteres' },
      pattern: { value: nomeRegex, message: 'Use apenas letras, espacos, hifen ou apostrofo' },
    }),
    []
  )

  async function onSubmit(data: FormData) {
    // Simula o envio para a API de suporte
    await new Promise((resolve) => setTimeout(resolve, 700))
    console.info('Mensagem enviada', data)
    reset()
  }

  return (
    <section className="max-w-4xl mx-auto space-y-10">
      <header className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Fale com a equipe IMREA Digital
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Utilize o formulario para registrar sugestoes, duvidas sobre terapias ou solicitacoes
          relacionadas ao uso da plataforma. O time de atendimento responde em ate um dia util.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-5"
      >
        {isSubmitSuccessful && (
          <Alert type="success">
            Mensagem enviada com sucesso! Nossa equipe retornara assim que possivel.
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="font-semibold">Nome completo *</span>
            <input
              type="text"
              className={`w-full rounded-lg px-3 py-2 border ${
                errors.nome ? 'border-red-600' : 'border-gray-300'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
              {...register('nome', regrasNome)}
              autoComplete="name"
            />
            {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message}</p>}
          </label>

          <label className="space-y-1">
            <span className="font-semibold">E-mail *</span>
            <input
              type="email"
              className={`w-full rounded-lg px-3 py-2 border ${
                errors.email ? 'border-red-600' : 'border-gray-300'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
              {...register('email', {
                required: 'Informe um e-mail valido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Digite um e-mail no formato nome@dominio.com',
                },
              })}
              autoComplete="email"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </label>
        </div>

        <label className="space-y-1 block">
          <span className="font-semibold">Telefone (opcional)</span>
          <input
            type="tel"
            className="w-full rounded-lg px-3 py-2 border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
            placeholder="(11) 2661-0000"
            {...register('telefone', {
              pattern: {
                value: /^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/,
                message: 'Use um telefone valido com DDD',
              },
            })}
          />
          {errors.telefone && <p className="text-red-600 text-sm">{errors.telefone.message}</p>}
        </label>

        <label className="space-y-1 block">
          <span className="font-semibold">Mensagem *</span>
          <textarea
            rows={6}
            className={`w-full rounded-lg px-3 py-2 border ${
              errors.mensagem ? 'border-red-600' : 'border-gray-300'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            maxLength={LIMITE_MENSAGEM}
            {...register('mensagem', {
              required: 'Descreva a solicitacao em ate 600 caracteres',
              minLength: { value: 10, message: 'Explique em pelo menos 10 caracteres' },
              maxLength: { value: LIMITE_MENSAGEM, message: 'Limite de 600 caracteres' },
            })}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{caracteres}/{LIMITE_MENSAGEM}</span>
            {errors.mensagem && <span className="text-red-600">{errors.mensagem.message}</span>}
          </div>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand ${
              isSubmitting || !isValid
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-brand text-white'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center border-2 border-brand text-brand font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
            onClick={() => reset()}
          >
            Limpar
          </button>
        </div>
      </form>

      <aside className="max-w-4xl mx-auto px-4 text-center md:text-left grid gap-4 md:grid-cols-2">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
          <h2 className="text-lg font-semibold">Central de atendimento</h2>
          <p className="text-gray-700">Segunda a sexta, das 7h as 18h (horario de Brasilia).</p>
          <p className="text-gray-900 font-bold">(11) 2661-7557</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
          <h2 className="text-lg font-semibold">Enderecos IMREA</h2>
          <p className="text-gray-700">
            Unidade Lapa, Unidade Vila Mariana, Unidade Jardins e Unidade Lucy Montoro.
          </p>
          <p className="text-gray-700">
            Consulte a pagina Sobre para mapas, acessibilidade e orientacoes de transporte.
          </p>
        </div>
      </aside>
    </section>
  )
}
