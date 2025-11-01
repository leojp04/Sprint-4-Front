import { useCallback, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

type LinkItem = { to: string; label: string; end?: boolean }

const linkBase =
  'px-3 py-2 text-sm md:text-base rounded-md transition-colors whitespace-nowrap text-[#111827] hover:text-[#a1203a] hover:bg-[#f3e5e5] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a1203a]'

type AuthUser = {
  id: string | number
  name?: string
  nomeCompleto?: string
  email?: string
  cpf?: string
}

function readAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem('authUser')
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export default function Header() {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => readAuthUser())

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'authUser') {
        setAuthUser(readAuthUser())
      }
    }

    const handleAuthChange = () => setAuthUser(readAuthUser())

    window.addEventListener('storage', handleStorage)
    window.addEventListener('authUserChanged', handleAuthChange)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('authUserChanged', handleAuthChange)
    }
  }, [])

  const handleLogout = useCallback(() => {
    window.localStorage.removeItem('authUser')
    window.dispatchEvent(new Event('authUserChanged'))
    navigate('/login', { replace: true })
  }, [navigate])

  const baseLinks: LinkItem[] = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/sobre', label: 'Sobre' },
    { to: '/integrantes', label: 'Integrantes' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contato', label: 'Contato' },
    { to: '/solucao', label: 'Solucao' },
    { to: '/agendar', label: 'Agendar' },
  ]

  const navigationLinks: LinkItem[] = authUser
    ? [...baseLinks, { to: '/perfil', label: 'Perfil' }]
    : [...baseLinks, { to: '/login', label: 'Login' }]

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
            {navigationLinks.map((link) => (
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

            {authUser && (
              <button
                type="button"
                onClick={handleLogout}
                className={`${linkBase} border border-transparent hover:border-[#a1203a]/40`}
              >
                Sair
              </button>
            )}
          </nav>

          <div className="flex-none" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
