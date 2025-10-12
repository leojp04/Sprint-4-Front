import { useNavigate } from "react-router-dom"
import MembroCard from "../components/MembroCard"
import { MEMBROS } from "../data/membros"

const FOTOS: Record<string, string> = {
  "563065": "/integrante1.jpg",
  "563237": "/integrante2.jpg",
  "562403": "/integrante3.jpg",
}

export default function Integrantes() {
  const navigate = useNavigate()
  const ver = (rm: string) => navigate(`/integrantes/${rm}`)

  return (
    <section className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-10">
        Conheça os integrantes
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {MEMBROS.map((m) => {
          const foto = m.foto ?? FOTOS[m.rm] ?? "/integrante1.jpg"
          return (
            <li
              key={m.rm}
              className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col items-center text-center min-h-[420px]"
            >
              <MembroCard
                foto={foto}
                nome={m.nome}
                rm={m.rm}
                turma={m.turma}
                github={m.github}
                linkedin={m.linkedin}
              />

              <div className="mt-auto" />

              <button
                className="mt-3 border-2 border-brand text-brand font-bold rounded-lg px-4 py-2 hover:bg-brand hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
                onClick={() => ver(m.rm)}
                aria-label={`Ver detalhes de ${m.nome}`}
              >
                Ver detalhes
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
