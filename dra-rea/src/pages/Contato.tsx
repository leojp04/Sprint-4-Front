import { useForm } from 'react-hook-form'

type FormData = { nome: string; email: string; mensagem: string }

export default function Contato() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid }
  } = useForm<FormData>({ mode: 'onTouched' })

  const msg = watch('mensagem') || ''
  const maxMsg = 600

  const onSubmit = async (data: FormData) => {

    await new Promise((r) => setTimeout(r, 500))
    reset()
  }

  return (
    <section className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-6">
        Fale Conosco
      </h2>

      {/* Card do formulário */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm"
        aria-describedby="contato-feedback"
      >
        {/* Nome */}
        <div className="mb-4">
          <label htmlFor="nome" className="font-semibold leading-snug">
            Nome completo <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-1">Como está no documento.</p>
          <input
            id="nome"
            className={`w-full rounded-lg px-3 py-2 border ${errors.nome ? 'border-red-600' : 'border-gray-300'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            placeholder="Ex.: Maria da Silva"
            autoComplete="name"
            aria-invalid={errors.nome ? 'true' : undefined}
            aria-describedby={errors.nome ? 'nome-error' : undefined}
            {...register('nome', {
              required: 'Informe seu nome',
              minLength: { value: 3, message: 'Mínimo de 3 caracteres' },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ'’\- ]+$/,
                message: 'Use apenas letras e espaços'
              }
            })}
          />
          {errors.nome && (
            <p id="nome-error" className="text-red-600 text-sm mt-1" role="alert">
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="font-semibold leading-snug">
            E-mail <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-1">Usaremos para responder sua mensagem.</p>
          <input
            id="email"
            type="email"
            inputMode="email"
            className={`w-full rounded-lg px-3 py-2 border ${errors.email ? 'border-red-600' : 'border-gray-300'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            placeholder="seuemail@exemplo.com"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email', {
              required: 'Informe seu e-mail',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'E-mail inválido'
              }
            })}
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mensagem */}
        <div className="mb-4">
          <label htmlFor="mensagem" className="font-semibold leading-snug">
            Mensagem <span className="text-brand" aria-hidden="true">*</span>
          </label>
          <p className="text-sm text-gray-600 mb-1">Conte em poucas linhas o motivo do contato.</p>
          <textarea
            id="mensagem"
            rows={6}
            maxLength={maxMsg}
            className={`w-full rounded-lg px-3 py-2 border ${errors.mensagem ? 'border-red-600' : 'border-gray-300'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            placeholder="Escreva aqui…"
            spellCheck={true}
            aria-invalid={errors.mensagem ? 'true' : undefined}
            aria-describedby={errors.mensagem ? 'mensagem-error' : 'mensagem-help'}
            {...register('mensagem', {
              required: 'Digite sua mensagem',
              minLength: { value: 10, message: 'Mínimo de 10 caracteres' },
              maxLength: { value: maxMsg, message: `Máximo de ${maxMsg} caracteres` }
            })}
          />
          <div className="flex items-center justify-between">
            {errors.mensagem ? (
              <p id="mensagem-error" className="text-red-600 text-sm mt-1" role="alert">
                {errors.mensagem.message}
              </p>
            ) : (
              <span id="mensagem-help" className="text-xs text-gray-500 mt-1">
                {msg.length}/{maxMsg}
              </span>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`inline-block rounded-lg px-4 py-2 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand ${
              isSubmitting || !isValid
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-brand text-white'
            }`}
          >
            {isSubmitting ? 'Enviando…' : 'Enviar'}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-block border-2 border-brand text-brand font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            Limpar
          </button>
        </div>

        {/* Feedback */}
        <p id="contato-feedback" className="mt-3 text-green-700" role="status" aria-live="polite">
          {isSubmitSuccessful ? 'Mensagem enviada! ✅' : ''}
        </p>
      </form>

      {/* Bloco de contato alternativo */}
      <div className="max-w-xl mx-auto mt-6 text-center text-sm text-gray-700">
        <p>
          Se preferir, fale com a Central de Atendimento: <strong>(11) 2661-7557</strong> — Seg–Sex, 7h–18h.
        </p>
      </div>
    </section>
  )
}
