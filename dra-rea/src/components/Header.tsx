import { NavLink } from 'react-router-dom'

type LinkItem = { to: string; label: string; end?: boolean }

export default function Header() {
  const links: LinkItem[] = [
    { to: '/', label: 'Início', end: true },
    { to: '/sobre', label: 'Sobre' },
    { to: '/integrantes', label: 'Integrantes' },
    { to: '/usuarios', label: 'Usuários' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contato', label: 'Contato' },
    { to: '/solucao', label: 'Solução' },
    { to: '/login', label: 'Login' },
    { to: '/cadastro', label: 'Cadastro' },
  ]

  return (
    <header className="bg-white text-black border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 shrink-0">
          <img src="/IMREA.png" alt="Logotipo IMREA" className="w-20 h-auto" />
          <h1 className="text-xl md:text-2xl font-bold">IMREA Digital</h1>
        </div>
        <nav aria-label="Principal" className="flex flex-wrap items-center gap-2 sm:ml-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3 py-1 rounded-md font-medium transition text-sm md:text-base ${
                  isActive ? 'bg-brand text-white' : 'text-gray-800 hover:bg-brand hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}