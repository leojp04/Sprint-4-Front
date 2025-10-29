export default function Sobre() {
  return (
    <section className="max-w-4xl mx-auto px-4">
      {/* Titulo */}
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-8">
        Sobre o Projeto
      </h1>

      {/* Introducao */}
      <p className="text-gray-800 leading-relaxed mb-4">
        O <strong>IMREA Digital</strong> e um site pensado para facilitar o acesso de pacientes e
        cuidadores as informacoes e servicos do Instituto de Medicina Fisica e Reabilitacao do
        Hospital das Clinicas (<strong>IMREA-HCFMUSP</strong>). A proposta e oferecer um ambiente
        simples, inclusivo e responsivo  com linguagem clara, navegacao direta e apoio da
        <strong> Dra. REA</strong>, nossa assistente virtual.
      </p>

      {/* Problema que resolvemos */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 mb-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-2">
          Qual necessidade este projeto atende?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Muitos pacientes atendidos pelo IMREA tem limitacoes motoras ou barreiras tecnologicas
          que dificultam o acesso a informacoes basicas (horarios, localizacao, remarcacoes).
          Centralizamos tudo em um so lugar, com acessibilidade e suporte automatizado.
        </p>
      </div>

      {/* O que o usuario encontra no site */}
      <h2 className="text-xl font-bold tracking-tight leading-snug mb-3">
        O que voce encontra aqui
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-800 leading-relaxed mb-6">
        <li>Informacoes objetivas sobre <strong>horarios</strong>, <strong>enderecos</strong> e <strong>contato</strong>.</li>
        <li><strong>FAQ</strong> com duvidas frequentes (teleatendimento, remarcacoes e mais).</li>
        <li>Pagina de <strong>Integrantes</strong> com identificacao do time (Nome, RM e Turma).</li>
        <li>Formulario de <strong>Contato</strong> com validacao para mensagens claras.</li>
        <li>Suporte da <strong>Dra. REA</strong> (chatbot) para guiar processos simples de forma rapida.</li>
      </ul>

      {/* Beneficios / Impacto */}
      <h2 className="text-xl font-bold tracking-tight leading-snug mb-3">
        Beneficios para pacientes e cuidadores
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-800 leading-relaxed mb-6">
        <li>Navegacao acessivel (alto contraste opcional, foco visivel, textos legiveis).</li>
        <li>Reducao de duvidas e do <strong>absenteismo</strong> por falta de informacao.</li>
        <li>Agilidade para <strong>remarcar</strong> e confirmar atendimentos.</li>
        <li>Comunicacao mais clara entre pacientes, cuidadores e equipe do IMREA.</li>
      </ul>


      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-2">
          Nosso compromisso com acessibilidade e linguagem clara
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Usamos hierarquia visual consistente, botoes e links com foco visivel, textos em leitura
          confortavel e alternativas de alto contraste. As paginas priorizam instrucoes diretas,
          evitando termos tecnicos desnecessarios.
        </p>
      </div>
    </section>
  )
}
