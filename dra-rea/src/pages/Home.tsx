import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const BENEFICIOS = [
  'Navegacao clara para diferentes perfis de pacientes e acompanhantes.',
  'Formularios com validacao em tempo real usando React Hook Form e Zod.',
  'Chatbot Watson Assistant com suporte textual e de voz para duvidas frequentes.',
  'Layout responsivo projetado para leitores de tela e dispositivos moveis.',
  'Integracao com a API em Java para consultas e atualizacoes de usuarios.',
]

const METRICAS = [
  { label: 'Profissionais em atuacao', value: '120+' },
  { label: 'Consultas e terapias por ano', value: '80 mil' },
  { label: 'Taxa de satisfacao reportada', value: '94%' },
]

export default function Home() {
  const [mostrarMais, setMostrarMais] = useState(false)

  return (
    <div className="space-y-16">
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-10 space-y-6 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Sprint 4 - Front-end Design Engineering
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            IMREA Digital: reabilitacao acolhedora, conectada e acessivel
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            A plataforma une tecnologia, empatia e inclusao para apoiar pacientes do Instituto de
            Medicina Fisica e Reabilitacao do Hospital das Clinicas da USP. O projeto entrega uma SPA
            em React + Vite + TypeScript 100% estilizada com Tailwind CSS e integrada a API Java
            desenvolvida na disciplina de Domain Driven Design.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <NavLink
              to="/solucao"
              className="inline-flex items-center justify-center bg-brand text-white font-bold rounded-lg px-5 py-2.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
            >
              Conhecer a solucao
            </NavLink>
            <NavLink
              to="/contato"
              className="inline-flex items-center justify-center border-2 border-brand text-brand font-bold rounded-lg px-5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
            >
              Falar com a equipe
            </NavLink>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Atendimento digital que respeita o ritmo de cada paciente
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Desenvolvemos fluxos simples e acessiveis para que pacientes, familiares e equipe
            multiprofissional encontrem rapidamente informacoes sobre terapias, contatos e horarios.
            O conteudo e escrito em linguagem direta, com contraste elevado e suporte a leitores de
            tela.
          </p>
          <button
            type="button"
            onClick={() => setMostrarMais((estado) => !estado)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand ${
              mostrarMais ? 'bg-brand text-white' : 'border border-brand text-brand'
            }`}
            aria-expanded={mostrarMais}
            aria-controls="home-extra"
          >
            {mostrarMais ? 'Ocultar detalhes' : 'Mostrar mais detalhes'}
          </button>
        </div>

        <ul id="home-extra" className="space-y-3 text-gray-700 md:pl-6">
          {BENEFICIOS.slice(0, mostrarMais ? BENEFICIOS.length : 3).map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <span className="mt-1 size-2.5 rounded-full bg-brand" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Metricas que norteiam nossas decisoes
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Cada funcionalidade e validada com dados do IMREA e entrevistas realizadas na Sprint 3.
              A evolucao do projeto considera indicadores clinicos e de experiencia do paciente.
            </p>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {METRICAS.map((metrica) => (
              <div
                key={metrica.label}
                className="rounded-lg border border-white/20 bg-white/5 p-4 text-center"
              >
                <dt className="text-sm uppercase tracking-[0.2em] text-gray-300">
                  {metrica.label}
                </dt>
                <dd className="text-2xl font-black mt-1">{metrica.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Dra. REA: webchat integrado ao Watson Assistant
          </h2>
          <p className="text-gray-700 leading-relaxed">
            O chatbot oferece apoio rapido a duvidas sobre agenda, documentacao e orientacoes
            pos-terapia. Ele foi configurado para escalonar conversas com a equipe do IMREA e
            registrar interacoes relevantes para melhoria continua do servico.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Todas as interacoes sao registradas por meio da API Java, garantindo rastreabilidade para
            as equipes clinicas e administrativas. O componente WatsonChat carrega a integracao apenas
            uma vez por sessao, evitando requisicoes desnecessarias.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
          <h3 className="text-lg font-semibold">Como funciona</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>O usuario abre o balao da Dra. REA no canto inferior direito.</li>
            <li>O Watson Assistant identifica o fluxo ideal com base na pergunta.</li>
            <li>
              Quando necessario, os dados sao enviados para a API de usuarios utilizando HTTP GET, POST,
              PUT e DELETE.
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}
