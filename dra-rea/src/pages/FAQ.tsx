import { useMemo, useState } from 'react'

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: 'Como remarcar um atendimento?',
    a: 'Voce pode remarcar pelo chatbot no canto inferior direito. Informe nome e CPF e escolha uma nova data disponivel. A Dra. REA orienta todo o processo.'
  },
  {
    q: 'Como funciona o teleatendimento?',
    a: 'A consulta e remota por video com profissional do IMREA. Voce recebe um link por e-mail ou Telegram. Escolha um local silencioso, com internet estavel e camera/microfone liberados.'
  },
  {
    q: 'Onde fica o IMREA?',
    a: 'Eixo Rosa do Complexo do HC, numero 7 - Portao 3 do Inrad - Sao Paulo/SP. Ha acesso por transporte publico e veiculos adaptados.'
  },
  {
    q: 'Quais sao os horarios de funcionamento?',
    a: 'Atendimentos de segunda a sexta, das 7h as 18h. O chatbot Dra. REA responde 24h para duvidas e orientacoes.'
  },
  {
    q: 'Quem devo procurar em caso de duvidas especificas?',
    a: 'Se o chatbot nao resolver, contate a Central de Atendimento pelo (11) 2661-7557 ou procure a recepcao do IMREA.'
  }
]

const secondaryButtonClasses = 'inline-flex items-center justify-center bg-[#f3e5e5] text-[#111827] font-medium px-6 py-2 rounded-lg border border-[#a1203a]/30 opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a1203a] transition-colors'

export default function FAQ() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]))
  const [showMore, setShowMore] = useState(false)

  const items = useMemo(() => (showMore ? FAQS : FAQS.slice(0, 3)), [showMore])
  const isOpen = (idx: number) => openSet.has(idx)

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        next.add(idx)
      }
      return next
    })
  }

  return (
    <section className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-6">
        Perguntas Frequentes (FAQ)
      </h1>

      <ul className="divide-y border rounded-xl">
        {items.map((item, idx) => {
          const open = isOpen(idx)
          const buttonId = `faq-trigger-${idx}`
          const panelId = `faq-panel-${idx}`

          return (
            <li key={item.q} className="p-4">
              <button
                id={buttonId}
                type="button"
                className="w-full text-left flex items-center justify-between font-semibold text-[#111827]"
                onClick={() => toggle(idx)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span>{item.q}</span>
                <span aria-hidden="true" className="ml-4 text-xl">
                  {open ? '-' : '+'}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="mt-2 text-gray-700 leading-relaxed"
              >
                {item.a}
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex justify-center">
        <button
          className={secondaryButtonClasses}
          type="button"
          onClick={() => setShowMore((value) => !value)}
          aria-expanded={showMore}
        >
          {showMore ? 'Mostrar menos' : 'Mostrar mais'}
        </button>
      </div>
    </section>
  )
}

