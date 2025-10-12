import { NavLink } from 'react-router-dom'

export default function NotFound(){
  return (
    <section className="text-center py-16">
      <h1 className="text-5xl font-black mb-3">404</h1>
      <p className="text-gray-700 mb-4">Página não encontrada.</p>
      <NavLink to="/" className="inline-block bg-brand text-white font-bold rounded-lg px-4 py-2">
        Voltar para a Home
      </NavLink>
    </section>
  )
}
