import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'
import type { Usuario } from '../types'

const schema = z.object({
  nomeUsuario: z.string().min(1, 'Informe o nome de usuário'),
  email: z.string().email('E-mail inválido'),
})
type LoginData = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } =
    useForm<LoginData>({ mode: 'onTouched', resolver: zodResolver(schema) })

  async function onSubmit(data: LoginData) {
    const usuarios = await api.get<Usuario[]>('/usuarios')
    const ok = usuarios.find(u => u.nomeUsuario === data.nomeUsuario && u.email === data.email)
    if (ok) navigate('/usuarios')
    else alert('Credenciais não encontradas.')
  }

  return (
    <section className="max-w-md mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-white border rounded-xl p-5 shadow-sm">
        <div className="mb-4">
          <label htmlFor="nomeUsuario" className="font-semibold">Nome de usuário *</label>
          <input
            id="nomeUsuario"
            className={`w-full rounded-lg px-3 py-2 border ${errors.nomeUsuario ? 'border-red-600' : 'border-gray-300'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            {...register('nomeUsuario')}
            autoComplete="username"
          />
          {errors.nomeUsuario && <p className="text-red-600 text-sm mt-1">{errors.nomeUsuario.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="font-semibold">E-mail *</label>
          <input
            id="email"
            type="email"
            className={`w-full rounded-lg px-3 py-2 border ${errors.email ? 'border-red-600' : 'border-gray-300'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand`}
            {...register('email')}
            autoComplete="email"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`inline-block rounded-lg px-4 py-2 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand ${
            isSubmitting || !isValid ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-brand text-white'
          }`}
        >
          Entrar
        </button>

        <p className="mt-3 text-sm">
          Não tem conta? <Link to="/cadastro" className="text-brand underline">Cadastre-se</Link>
        </p>
      </form>
    </section>
  )
}
