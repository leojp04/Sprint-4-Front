import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import { api } from '../services/api'
import { useApi } from '../hooks/useAPI'
import type { Usuario, UsuarioAtivo } from '../types'

export default function Usuarios() {
  const { data, loading, error } = useApi<Usuario[]>(() => api.get('/usuarios'), [])
  const [query, setQuery] = useState('')

  const filtrados = useMemo<UsuarioAtivo[]>(() => {
    if (!data) return []
    const termo = query.trim().toLowerCase()
    const candidatos = !termo
      ? data
      : data.filter((usuario) =>
          [usuario.nome, usuario.nomeUsuario, usuario.email].some((valor) =>
            valor?.toLowerCase().includes(termo)
          )
        )
    return candidatos.map<UsuarioAtivo>((usuario) => ({
      ...usuario,
      ativo: usuario.email.toLowerCase().endsWith('@fiap.com'),
    }))
  }, [data, query])

  const temResultados = filtrados.length > 0

  return (
    <section className="space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Usuarios cadastrados
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Consulte, filtre e gerencie os usuarios sincronizados com a API de Java. Clique em
          qualquer linha para visualizar, atualizar ou excluir os dados.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <label className="flex-1 min-w-[240px]">
          <span className="sr-only">Buscar usuario</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, usuario ou e-mail"
            className="w-full rounded-lg px-3 py-2 border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          />
        </label>

        <Link
          to="/cadastro"
          className="inline-flex items-center justify-center whitespace-nowrap bg-brand text-white font-bold rounded-lg px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          Novo cadastro
        </Link>
      </div>

      {loading && <Alert role="status">Carregando usuarios...</Alert>}
      {error && (
        <Alert type="error" role="alert">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <div className="border rounded-xl overflow-x-auto">
          <table className="w-full text-left">
            <caption className="sr-only">Usuarios cadastrados</caption>
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-sm font-semibold uppercase text-gray-600">ID</th>
                <th className="p-3 text-sm font-semibold uppercase text-gray-600">Nome</th>
                <th className="p-3 text-sm font-semibold uppercase text-gray-600">Usuario</th>
                <th className="p-3 text-sm font-semibold uppercase text-gray-600">E-mail</th>
                <th className="p-3 text-sm font-semibold uppercase text-gray-600 text-center">
                  Status
                </th>
                <th className="p-3 text-sm font-semibold uppercase text-gray-600 text-right">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((usuario) => (
                <tr key={usuario.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{usuario.id}</td>
                  <td className="p-3">
                    <Link
                      className="text-brand underline underline-offset-2"
                      to={`/usuarios/${usuario.id}`}
                    >
                      {usuario.nome}
                    </Link>
                  </td>
                  <td className="p-3">{usuario.nomeUsuario}</td>
                  <td className="p-3">{usuario.email}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                        usuario.ativo
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}
                    >
                      {usuario.ativo ? 'Ativo' : 'Pendente'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      className="text-brand underline underline-offset-2"
                      to={`/usuarios/${usuario.id}`}
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
              {!temResultados && (
                <tr>
                  <td className="p-3 text-gray-600" colSpan={6}>
                    Nenhum usuario encontrado para o filtro informado.
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
