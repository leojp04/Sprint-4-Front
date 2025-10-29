import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useApi } from '../hooks/useApi'
import type { Usuario } from '../types'

export default function Usuarios() {
  const { data, loading, error } = useApi<Usuario[]>(() => api.get('/usuarios'), [])
  const [q, setQ] = useState('')

  const filtrados = useMemo(() => {
    const termo = q.trim().toLowerCase()
    if (!data) return []
    if (!termo) return data
    return data.filter(u =>
      [u.nome, u.nomeUsuario, u.email].some(v => v?.toLowerCase().includes(termo))
    )
  }, [data, q])

  return (
    <section className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-6">
        Usuários
      </h1>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Buscar por nome, usuário ou e-mail…"
          className="flex-1 min-w-[240px] rounded-lg px-3 py-2 border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          aria-label="Buscar usuários"
        />
        <Link
          to="/cadastro"
          className="inline-block bg-brand text-white font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          Novo cadastro
        </Link>
      </div>

      {loading && <p>Carregando…</p>}
      {error && <p className="text-red-600">Erro: {error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nome</th>
                <th className="p-3">Usuário</th>
                <th className="p-3">E-mail</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.nome}</td>
                  <td className="p-3">{u.nomeUsuario}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <Link className="underline text-brand" to={`/usuarios/${u.id}`}>
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td className="p-3 text-gray-600" colSpan={5}>
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
