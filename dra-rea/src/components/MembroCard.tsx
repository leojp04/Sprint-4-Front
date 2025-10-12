type Props = {
  foto: string
  nome: string
  rm: string
  turma?: string
  github?: string
  linkedin?: string
}

export default function MembroCard({
  foto,
  nome,
  rm,
  turma = "1TDSPW",
  github,
  linkedin,
}: Props) {
  return (
    <article className="text-center my-5">
      <img
        src={foto}
        alt={`Foto de ${nome}`}
        width={160}
        className="rounded-lg mx-auto mb-3 border"
        loading="lazy"
      />

      <p className="text-lg font-semibold">{nome}</p>
      <p className="text-sm text-gray-600 mt-1">
        RM {rm} — {turma}
      </p>

      {(github || linkedin) && (
        <div className="flex justify-center gap-4 mt-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-800"
            >
              GitHub
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              LinkedIn
            </a>
          )}
        </div>
      )}
    </article>
  )
}
