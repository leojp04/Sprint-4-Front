import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
  const [expandir, setExpandir] = useState(true)
  const btnId = 'intro-toggle'

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6">
            Bem-vindo ao <span className="text-brand">IMREA Digital</span>
          </h1>

          <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8 mb-5">
            Este projeto tem como objetivo tornar o acesso à saúde digital mais inclusivo, especialmente
            para pessoas com deficiência física atendidas pelo Instituto de Medicina Física e Reabilitação
            do Hospital das Clínicas da USP (IMREA-HCFMUSP).
          </p>

          <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8 mb-5">
            O IMREA é referência nacional em reabilitação física e realiza mais de
            <strong> 80 mil atendimentos por ano</strong>, sendo que muitos desses pacientes apresentam
            limitações tecnológicas ou motoras que dificultam o acesso a informações básicas
            como horários, localizações e agendamento de sessões.
          </p>

          {/* Painel sempre no DOM; alterna visibilidade com hidden */}
          <div
            id="intro-extra"
            role="region"
            aria-labelledby={btnId}
            hidden={!expandir}
            className="space-y-5"
          >
            <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8">
              Para melhorar essa realidade, criamos uma plataforma responsiva e intuitiva, aliada a um
              assistente virtual acessível: a <strong>Dra. REA</strong>. Integrada ao site por meio do
              Webchat, ela responde dúvidas frequentes, auxilia em remarcações e oferece suporte sobre
              o teleatendimento — tudo de forma rápida e humanizada.
            </p>

            <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8">
              O <strong>IMREA Digital</strong> representa uma iniciativa de inclusão, praticidade e
              autonomia para os pacientes, reduzindo o absenteísmo, melhorando a comunicação e ampliando
              a eficiência dos atendimentos.
            </p>

            <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8">
              Nosso site foi desenvolvido com foco em acessibilidade e usabilidade para todos os pacientes
              do IMREA.
            </p>
          </div>

          <div className="mt-8">
            <button
              id={btnId}
              type="button"
              onClick={() => setExpandir(v => !v)}
              aria-expanded={expandir}
              aria-controls="intro-extra"
              className={`px-5 py-2.5 rounded-lg font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand
                ${expandir ? 'bg-brand text-white shadow-sm' : 'border-2 border-brand text-brand'}
              `}
            >
              {expandir ? 'Mostrar menos' : 'Mostrar mais'}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 mb-4">
        <hr className="border-gray-200" />
      </div>

      <section className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-snug text-center mb-6">
          Principais diferenciais
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-6 text-gray-800 text-base md:text-lg leading-relaxed">
          <li>✅ Navegação simples e compatível com leitores de tela;</li>
          <li>✅ Formulário com validação inteligente (React Hook Form);</li>
          <li>✅ Chatbot com suporte para voz e texto (Dra. REA);</li>
          <li>✅ Interface adaptada para diferentes dispositivos;</li>
          <li>✅ Conteúdo escrito em linguagem clara e direta.</li>
        </ul>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <NavLink
            className="inline-block bg-brand text-white font-bold rounded-lg px-5 py-2.5 shadow-sm
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
            to="/solucao"
          >
            Conhecer a solução
          </NavLink>
          <NavLink
            className="inline-block border-2 border-brand text-brand font-bold rounded-lg px-5 py-2.5
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
            to="/contato"
          >
            Falar conosco
          </NavLink>
        </div>
      </section>
    </>
  )
}
