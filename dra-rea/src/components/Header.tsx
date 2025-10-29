import { NavLink } from 'react-router-dom'

type LinkItem = { to: string; label: string; end?: boolean }

const linkBase =
  'px-3 py-2 text-sm md:text-base rounded-md transition-colors whitespace-nowrap text-[#111827] hover:text-[#a1203a] hover:bg-[#f3e5e5] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a1203a]'

export default function Header() {
  const links: LinkItem[] = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/sobre', label: 'Sobre' },
    { to: '/integrantes', label: 'Integrantes' },
    { to: '/usuarios', label: 'Usuarios' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contato', label: 'Contato' },
    { to: '/solucao', label: 'Solucao' },
    { to: '/login', label: 'Login' },
  ]

  return (
    <header className="bg-white text-[#111827] border-b border-[#f3e5e5] sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          <div className="flex items-center gap-3 flex-none">
            <img src="/IMREA.png" alt="Logotipo IMREA" className="w-20 h-auto" />
            <h1 className="text-xl md:text-2xl font-bold">IMREA Digital</h1>
          </div>

          <nav
            aria-label="Navegacao principal"
            className="flex flex-1 items-center justify-center gap-2 md:gap-4 flex-nowrap whitespace-nowrap overflow-x-auto min-w-0"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [linkBase, isActive && 'text-[#a1203a] font-semibold bg-[#f3e5e5]']
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-none" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}

