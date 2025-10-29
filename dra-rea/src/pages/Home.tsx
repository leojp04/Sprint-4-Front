import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const primaryButtonClasses = 'inline-flex items-center justify-center bg-[#a1203a] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#8b1c34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a1203a] transition-colors'
const secondaryButtonClasses = 'inline-flex items-center justify-center bg-[#f3e5e5] text-[#111827] font-medium px-6 py-2 rounded-lg border border-[#a1203a]/30 opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a1203a] transition-colors'

export default function Home() {
  const [expandir, setExpandir] = useState(true)
  const btnId = 'intro-toggle'

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6">
            Bem-vindo ao <span className="text-[#a1203a]">IMREA Digital</span>
          </h1>

          <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8 mb-5">
            Este projeto tem como objetivo tornar o acesso a saude digital mais inclusivo, especialmente
            para pessoas com deficiencia fisica atendidas pelo Instituto de Medicina Fisica e Reabilitacao
            do Hospital das Clinicas da USP (IMREA-HCFMUSP).
          </p>

          <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8 mb-5">
            O IMREA e referencia nacional em reabilitacao fisica e realiza mais de
            <strong> 80 mil atendimentos por ano</strong>, sendo que muitos desses pacientes apresentam
            limitacoes tecnologicas ou motoras que dificultam o acesso a informacoes basicas
            como horarios, localizacoes e agendamento de sessoes.
          </p>

          <div
            id="intro-extra"
            role="region"
            aria-labelledby={btnId}
            hidden={!expandir}
            className="space-y-5"
          >
            <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8">
              Para melhorar essa realidade, criamos uma plataforma responsiva e intuitiva, aliada a um
              assistente virtual acessivel: a <strong>Dra. REA</strong>. Integrada ao site por meio do
              Webchat, ela responde duvidas frequentes, auxilia em remarcacoes e oferece suporte sobre
              o teleatendimento - tudo de forma rapida e humanizada.
            </p>

            <p className="text-gray-800 text-base md:text-lg leading-relaxed md:leading-8">
              O <strong>IMREA Digital</strong> representa uma iniciativa de inclusao, praticidade e
              autonomia para os pacientes, reduzindo o absenteismo, melhorando a comunicacao e ampliando
              a eficiencia dos atendimentos.
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
              onClick={() => setExpandir((value) => !value)}
              aria-expanded={expandir}
              aria-controls="intro-extra"
              className={expandir ? primaryButtonClasses : secondaryButtonClasses}
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
          <li>1. Navegacao simples e compativel com leitores de tela.</li>
          <li>2. Formulario com validacao inteligente (React Hook Form).</li>
          <li>3. Chatbot com suporte para voz e texto (Dra. REA).</li>
          <li>4. Interface adaptada para diferentes dispositivos.</li>
          <li>5. Conteudo escrito em linguagem clara e direta.</li>
        </ul>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <NavLink className={primaryButtonClasses} to="/solucao">
            Conhecer a solucao
          </NavLink>
          <NavLink className={secondaryButtonClasses} to="/contato">
            Falar conosco
          </NavLink>
        </div>
      </section>
    </>
  )
}

