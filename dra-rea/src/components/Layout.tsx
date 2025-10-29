import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteudo principal
      </a>
      <Header />
      <main id="conteudo-principal" className="flex-1">
        <div className="max-w-5xl mx-auto w-full px-4 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
