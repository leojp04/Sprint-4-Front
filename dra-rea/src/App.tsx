import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import WatsonChat from './components/WatsonChat'


const Home = lazy(() => import('./pages/Home'))
const Sobre = lazy(() => import('./pages/Sobre'))
const Integrantes = lazy(() => import('./pages/Integrantes'))
const Membro = lazy(() => import('./pages/Membro'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contato = lazy(() => import('./pages/Contato'))
const Solucao = lazy(() => import('./pages/Solucao'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'IMREA Digital | Reabilitação com acolhimento',
      '/sobre': 'Sobre | IMREA Digital',
      '/integrantes': 'Integrantes | IMREA Digital',
      '/faq': 'FAQ | IMREA Digital',
      '/contato': 'Contato | IMREA Digital',
      '/solucao': 'Solução | IMREA Digital',
    }

    // Trata rota dinâmica /integrantes/:rm
    if (location.pathname.startsWith('/integrantes/') && location.pathname !== '/integrantes') {
      document.title = 'Membro | IMREA Digital'
      return
    }

    document.title = titles[location.pathname] ?? 'IMREA Digital'
  }, [location.pathname])

  return (
    <>
      <Suspense fallback={<div className="p-8 text-center">Carregando…</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/integrantes/:rm" element={<Membro />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/solucao" element={<Solucao />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Carrega o chat globalmente para toda a SPA */}
      <WatsonChat />
    </>
  )
}
