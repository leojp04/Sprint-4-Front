import { NavLink } from 'react-router-dom'

export default function Solucao() {
  return (
    <section className="max-w-4xl mx-auto px-4" aria-labelledby="titulo-solucao">

      <h1
        id="titulo-solucao"
        className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-8"
      >
        Nossa Solução
      </h1>

      <p className="text-gray-800 leading-relaxed mb-4 text-center">
        O <strong>IMREA Digital</strong> foi criado para facilitar o acesso a informações e aos
        serviços de reabilitação oferecidos pelo Instituto de Medicina Física e Reabilitação do
        Hospital das Clínicas da USP (<strong>IMREA-HCFMUSP</strong>). A proposta é promover
        <strong> inclusão digital</strong>, reduzir o <strong>absenteísmo</strong> e tornar a
        jornada de cuidados mais simples e clara.
      </p>
      <p className="text-gray-800 leading-relaxed mb-8 text-center">
        Para isso, reunimos tudo em uma <strong>plataforma acessível e responsiva</strong>, apoiada
        pela assistente virtual <strong>Dra. REA</strong>, que responde dúvidas frequentes e apoia
        processos do dia a dia.
      </p>

      <div className="text-center mb-8">
        <img
          src="/Dra_REA.png"
          alt="Ilustração da assistente virtual Dra. REA"
          className="max-w-[260px] rounded-lg mx-auto mb-2"
          loading="lazy"
          decoding="async"
          width={260}
          height={260}
        />
        <p id="legenda-dra-rea" className="text-sm text-gray-600">
          Representação visual da Dra. REA
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 mb-8" aria-describedby="legenda-dra-rea">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-4">
          Funcionalidades da Dra. REA
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 leading-relaxed text-left">
          <li>📅 Remarcar atendimentos de forma simples e rápida.</li>
          <li>✅ Confirmar consultas utilizando apenas o CPF.</li>
          <li>💻 Informar sobre o funcionamento do teleatendimento.</li>
          <li>📍 Esclarecer dúvidas sobre localização, horários e acessibilidade.</li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight leading-snug mb-3">
          Impacto esperado
        </h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Com a <strong>Dra. REA</strong> e a centralização das informações em um só lugar, buscamos
          reduzir dúvidas, melhorar a comunicação com os pacientes e ampliar a autonomia no acesso
          aos serviços do IMREA.
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
