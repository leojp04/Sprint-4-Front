export default function Sobre() {
  return (
    <section className="max-w-4xl mx-auto px-4">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-center mb-8">
        Sobre o Projeto
      </h1>

      {/* Introdução */}
      <p className="text-gray-800 leading-relaxed mb-4">
        O <strong>IMREA Digital</strong> é um site pensado para facilitar o acesso de pacientes e
        cuidadores às informações e serviços do Instituto de Medicina Física e Reabilitação do
        Hospital das Clínicas (<strong>IMREA-HCFMUSP</strong>). A proposta é oferecer um ambiente
        simples, inclusivo e responsivo — com linguagem clara, navegação direta e apoio da
        <strong> Dra. REA</strong>, nossa assistente virtual.
      </p>

      {/* Problema que resolvemos */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 mb-6">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-2">
          Qual necessidade este projeto atende?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Muitos pacientes atendidos pelo IMREA têm limitações motoras ou barreiras tecnológicas
          que dificultam o acesso a informações básicas (horários, localização, remarcações).
          Centralizamos tudo em um só lugar, com acessibilidade e suporte automatizado.
        </p>
      </div>

      {/* O que o usuário encontra no site */}
      <h2 className="text-xl font-bold tracking-tight leading-snug mb-3">
        O que você encontra aqui
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-800 leading-relaxed mb-6">
        <li>Informações objetivas sobre <strong>horários</strong>, <strong>endereços</strong> e <strong>contato</strong>.</li>
        <li><strong>FAQ</strong> com dúvidas frequentes (teleatendimento, remarcações e mais).</li>
        <li>Página de <strong>Integrantes</strong> com identificação do time (Nome, RM e Turma).</li>
        <li>Formulário de <strong>Contato</strong> com validação para mensagens claras.</li>
        <li>Suporte da <strong>Dra. REA</strong> (chatbot) para guiar processos simples de forma rápida.</li>
      </ul>

      {/* Benefícios / Impacto */}
      <h2 className="text-xl font-bold tracking-tight leading-snug mb-3">
        Benefícios para pacientes e cuidadores
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-800 leading-relaxed mb-6">
        <li>Navegação acessível (alto contraste opcional, foco visível, textos legíveis).</li>
        <li>Redução de dúvidas e do <strong>absenteísmo</strong> por falta de informação.</li>
        <li>Agilidade para <strong>remarcar</strong> e confirmar atendimentos.</li>
        <li>Comunicação mais clara entre pacientes, cuidadores e equipe do IMREA.</li>
      </ul>


      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-2">
          Nosso compromisso com acessibilidade e linguagem clara
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Usamos hierarquia visual consistente, botões e links com foco visível, textos em leitura
          confortável e alternativas de alto contraste. As páginas priorizam instruções diretas,
          evitando termos técnicos desnecessários.
        </p>
      </div>
    </section>
  )
}
