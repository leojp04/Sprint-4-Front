import { useParams, Link } from 'react-router-dom'
import { MEMBROS } from '../data/membros'

const FOTOS_PADRAO: Record<string, string> = {
  '563065': '/integrante1.jpg',
  '563237': '/integrante2.jpg',
  '562403': '/integrante3.jpg',
}

export default function Membro() {
  const { rm } = useParams<{ rm: string }>()
  const membro = MEMBROS.find((m) => m.rm === rm)

  if (!membro) {
    return (
      <section className="text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2">
          Membro não encontrado
        </h1>
        <p className="text-gray-700 leading-relaxed">Verifique o RM informado.</p>
        <div className="mt-4">
          <Link to="/integrantes" className="underline text-brand">← Voltar aos Integrantes</Link>
        </div>
      </section>
    )
  }

  const foto = membro.foto ?? FOTOS_PADRAO[membro.rm] ?? '/integrante1.jpg'

  return (
    <section className="max-w-3xl mx-auto text-center px-4">
      <img
        src={foto}
        alt={`Foto de ${membro.nome}`}
        loading="lazy"
        className="w-48 h-auto rounded-xl mx-auto mb-4 border"
      />

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug mb-2">
        {membro.nome}
      </h1>

      <p className="text-gray-700 mb-4 leading-relaxed">
        RM {membro.rm} — Turma {membro.turma}
      </p>

      <div className="flex justify-center gap-4">
        {membro.github && (
          <a
            href={membro.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            GitHub
          </a>
        )}
        {membro.linkedin && (
          <a
            href={membro.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            LinkedIn
          </a>
        )}
      </div>

      <div className="mt-6">
        <Link to="/integrantes" className="underline text-brand">← Voltar aos Integrantes</Link>
      </div>
    </section>
  )
}