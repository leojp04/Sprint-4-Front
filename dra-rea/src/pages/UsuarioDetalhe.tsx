import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'
import type { Usuario } from '../types'

export default function UsuarioDetalhe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api.get<Usuario>(`/usuarios/${id}`)
      .then(setUsuario)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  async function excluir() {
    if (!id) return
    if (!confirm('Excluir este usuário?')) return
    try {
      await api.del<void>(`/usuarios/${id}`)
      navigate('/usuarios')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  if (loading) return <p>Carregando…</p>
  if (error) return <p className="text-red-600">Erro: {error}</p>
  if (!usuario) return <p>Usuário não encontrado.</p>

  return (
    <section className="max-w-3xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-4">
        {usuario.nome}
      </h1>
      <ul className="space-y-1 text-gray-800">
        <li><strong>ID:</strong> {usuario.id}</li>
        <li><strong>Usuário:</strong> {usuario.nomeUsuario}</li>
        <li><strong>E-mail:</strong> {usuario.email}</li>
      </ul>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => navigate('/usuarios')}
          className="border-2 border-brand text-brand font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          Voltar
        </button>
        <button
          onClick={excluir}
          className="bg-brand text-white font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          Excluir
        </button>
      </div>
    </section>
  )
}
