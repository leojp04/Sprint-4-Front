import { useState } from 'react'

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: '📅 Como remarcar um atendimento?',
    a: 'Você pode remarcar seu atendimento pelo chatbot (botão no canto inferior direito). Informe nome e CPF e escolha uma nova data disponível. A Dra. REA guia todo o processo.'
  },
  {
    q: '💻 Como funciona o teleatendimento?',
    a: 'A consulta é remota por vídeo com profissional do IMREA. Você recebe um link por e-mail/Telegram. Esteja em local silencioso, com internet estável e câmera/microfone liberados.'
  },
  {
    q: '📍 Onde fica o IMREA?',
    a: 'Eixo Rosa do Complexo do HC, nº 7 — Portão 3 do Inrad — São Paulo — SP. Acesso por transporte público e veículos adaptados.'
  },
  {
    q: '🕘 Quais são os horários de funcionamento?',
    a: 'Atendimentos de segunda a sexta, das 7h às 18h. O chatbot Dra. REA funciona 24h para dúvidas e orientações.'
  },
  {
    q: '☎️ Quem devo procurar em caso de dúvidas específicas?',
    a: 'Se o chatbot não resolver, contate a Central de Atendimento pelo (11) 2661-7557 ou procure a recepção do IMREA.'
  }
]

export default function FAQ() {
  // começa com a primeira pergunta aberta
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]))
  const [showMore, setShowMore] = useState(false)

  const isOpen = (idx: number) => openSet.has(idx)

  const toggle = (idx: number) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  return (
    <section className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-6">
        Perguntas Frequentes (FAQ)
      </h1>

      <ul className="divide-y border rounded-xl">
        {FAQS.map((item, idx) => {
          const open = isOpen(idx)
          const btnId = `faq-trigger-${idx}`
          const panelId = `faq-${idx}`

          return (
            <li key={idx} className="p-4">
              <button
                id={btnId}
                className="w-full text-left flex items-center justify-between"
                onClick={() => toggle(idx)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span className="font-semibold">{item.q}</span>
                <span className="ml-4">{open ? '−' : '+'}</span>
              </button>

              {/* Painel sempre no DOM; só alterna visibilidade */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!open}
                className="mt-2 text-gray-700 leading-relaxed"
              >
                {item.a}
              </div>
            </li>
          )
        })}
      </ul>

      {showMore && (
        <div className="mt-4 text-gray-700 leading-relaxed">
          <p>
            Conteúdo complementar sobre acessibilidade, direitos do paciente e canais alternativos de suporte.
          </p>
        </div>
      )}

      <div className="mt-4">
        <button
          className="border-2 border-brand text-brand font-bold rounded-lg px-3 py-1
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          type="button"
          onClick={() => setShowMore(v => !v)}
          aria-expanded={showMore}
        >
          {showMore ? 'Mostrar menos' : 'Mostrar mais'}
        </button>
      </div>
    </section>
  )
}
