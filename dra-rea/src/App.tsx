import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import WatsonChat from './components/WatsonChat'

const Home = lazy(() => import('./pages/Home'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Integrantes = lazy(() => import('./pages/Integrantes'))
const Membro = lazy(() => import('./pages/Membro'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contato = lazy(() => import('./pages/Contato'))
const Solucao = lazy(() => import('./pages/Solucao'))
const Agendar = lazy(() => import('./pages/Agendar'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Usuarios = lazy(() => import('./pages/Usuarios'))
const UsuarioDetalhe = lazy(() => import('./pages/UsuarioDetalhe'))
const Perfil = lazy(() => import('./pages/Perfil'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'IMREA Digital | Reabilitacao com acolhimento',
      '/sobre': 'Sobre | IMREA Digital',
      '/integrantes': 'Integrantes | IMREA Digital',
      '/faq': 'FAQ | IMREA Digital',
      '/contato': 'Contato | IMREA Digital',
      '/solucao': 'Solucao | IMREA Digital',
      '/agendar': 'Agendar consulta | IMREA Digital',
      '/login': 'Login | IMREA Digital',
      '/cadastro': 'Cadastro | IMREA Digital',
      '/usuarios': 'Usuarios | IMREA Digital',
      '/perfil': 'Perfil do Usuario | IMREA Digital',
    }

    if (location.pathname.startsWith('/integrantes/')) {
      document.title = 'Membro | IMREA Digital'
      return
    }

    if (location.pathname.startsWith('/usuarios/')) {
      document.title = 'Detalhes do Usuario | IMREA Digital'
      return
    }

    document.title = titles[location.pathname] ?? 'IMREA Digital'
  }, [location.pathname])

  return (
    <>
      <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/integrantes/:rm" element={<Membro />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/solucao" element={<Solucao />} />
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/:id" element={<UsuarioDetalhe />} />
            <Route
              path="/perfil"
              element={
                <RequireAuth>
                  <Perfil />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <WatsonChat />
    </>
  )
}
