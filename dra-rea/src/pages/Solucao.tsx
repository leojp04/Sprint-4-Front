import { NavLink } from 'react-router-dom'

export default function Solucao() {
  return (
    <section className="max-w-4xl mx-auto px-4" aria-labelledby="titulo-solucao">
      {/* Titulo */}
      <h1
        id="titulo-solucao"
        className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-8"
      >
        Nossa Solucao
      </h1>

      {/* Introducao */}
      <p className="text-gray-800 leading-relaxed mb-4 text-center">
        O <strong>IMREA Digital</strong> foi criado para facilitar o acesso a informacoes e aos
        servicos de reabilitacao oferecidos pelo Instituto de Medicina Fisica e Reabilitacao do
        Hospital das Clinicas da USP (<strong>IMREA-HCFMUSP</strong>). A proposta e promover
        <strong> inclusao digital</strong>, reduzir o <strong>absenteismo</strong> e tornar a
        jornada de cuidados mais simples e clara.
      </p>
      <p className="text-gray-800 leading-relaxed mb-8 text-center">
        Para isso, reunimos tudo em uma <strong>plataforma acessivel e responsiva</strong>, apoiada
        pela assistente virtual <strong>Dra. REA</strong>, que responde duvidas frequentes e apoia
        processos do dia a dia.
      </p>

      {/* Imagem otimizada */}
      <div className="text-center mb-8">
        <img
          src="/Dra_REA.png"
          alt="Ilustracao da assistente virtual Dra. REA"
          className="max-w-[260px] rounded-lg mx-auto mb-2"
          loading="lazy"
          decoding="async"
          width={260}
          height={260}
        />
        <p id="legenda-dra-rea" className="text-sm text-gray-600">
          Representacao visual da Dra. REA
        </p>
      </div>

      {/* Funcionalidades (caixa destacada) */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 mb-8" aria-describedby="legenda-dra-rea">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-4">
          Funcionalidades da Dra. REA
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-left">
          <li> Remarcar atendimentos de forma simples e rapida.</li>
          <li> Confirmar consultas utilizando apenas o CPF.</li>
          <li> Informar sobre o funcionamento do teleatendimento.</li>
          <li> Esclarecer duvidas sobre localizacao, horarios e acessibilidade.</li>
        </ul>
      </div>

      {/* Impacto + CTAs */}
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight leading-snug mb-3">
          Impacto esperado
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Com a <strong>Dra. REA</strong> e a centralizacao das informacoes em um so lugar, buscamos
          reduzir duvidas, melhorar a comunicacao com os pacientes e ampliar a autonomia no acesso
          aos servicos do IMREA.
        </p>

        <div className="space-x-2">
          <NavLink
            to="/faq"
            className="inline-block bg-brand text-white font-bold rounded-lg px-4 py-2
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            Ver FAQ
          </NavLink>
          <NavLink
            to="/contato"
            className="inline-block border-2 border-brand text-brand font-bold rounded-lg px-4 py-2
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
          >
            Fale Conosco
          </NavLink>
        </div>
      </div>
    </section>
  )
}
