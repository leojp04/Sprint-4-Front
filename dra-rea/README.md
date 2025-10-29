# IMREA Digital - Sprint 4

Aplicacao SPA desenvolvida em React 19, Vite e TypeScript para o desafio de Front-end Design Engineering. O foco da sprint foi entregar uma experiencia acessivel para pacientes, familiares e equipe do IMREA, garantindo responsividade, integracao com a API Java e deploy automatizado na Vercel.

## Links rapidos
- Deploy (Vercel): https://dra-rea.vercel.app
- Repositorio: https://github.com/leojp04/Sprint-4-Front

## Principais entregas da sprint
- Layout responsivo com Tailwind CSS 4, sem bibliotecas externas de UI.
- Roteamento com paginas estaticas, dinamicas (`/integrantes/:rm`, `/usuarios/:id`) e pagina 404 personalizada.
- Cliente `fetch` tipado para a API Java cobrindo GET, POST, PUT e DELETE.
- Formulario de contato com React Hook Form, validacoes via Zod e feedback visual.
- Deploy automatizado na Vercel com rewrite SPA definido em `vercel.json`.

## Stack e ferramentas
- React 19, React Router 7, Vite 5, TypeScript 5
- Tailwind CSS 4
- React Hook Form + Zod
- IBM Watson Assistant Web Chat
- json-server para mock local de `usuarios`
- ESLint para analise estatica

## Requisitos
- Node.js 20 ou superior
- npm 10 ou superior

## Como executar localmente
1. Instale as dependencias:
   ```bash
   npm install
   ```
2. Suba o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   A aplicacao ficara disponivel em http://localhost:5173
3. (Opcional) Rode a API simulada com json-server:
   ```bash
   npm run api
   ```
   Endereco padrao: http://localhost:3001/usuarios
4. Gere uma build de producao e visualize:
   ```bash
   npm run build
   npm run preview
   ```

## Scripts npm
- `npm run dev`: Vite em modo desenvolvimento.
- `npm run build`: Compila TypeScript (`tsc -b`) e gera build de producao.
- `npm run preview`: Servidor local para validar a build.
- `npm run api`: Sobe o json-server usando `db.json`.
- `npm run lint`: Executa ESLint.

## Configuracao da API Java
- Crie um arquivo `.env.local` na raiz com a URL publica da API:
  ```bash
  VITE_API_BASEURL=https://sua-api-java.com
  ```
- Endpoints utilizados:
  - `GET /usuarios`: lista usuarios.
  - `POST /usuarios`: cadastra novo usuario.
  - `PUT /usuarios/:id`: atualiza dados de um usuario existente.
  - `DELETE /usuarios/:id`: remove um cadastro.
- Em ambiente local, se `VITE_API_BASEURL` nao for definido, o cliente usa `http://localhost:3001`.

## Rotas implementadas
- `/`: home com destaques do projeto e integracao com o Watson Assistant.
- `/sobre`: informacoes institucionais do IMREA Digital.
- `/integrantes`: cards com os membros do grupo.
- `/integrantes/:rm`: pagina dinamica com detalhes individuais.
- `/faq`: perguntas frequentes.
- `/contato`: formulario com validacao e contador de caracteres.
- `/solucao`: resumo da proposta de valor.
- `/login` e `/cadastro`: fluxos de autenticacao e criacao de conta.
- `/usuarios`: listagem com busca, status e link para detalhes.
- `/usuarios/:id`: CRUD completo (visualizar, editar via PUT e excluir via DELETE).
- `*`: pagina 404 personalizada.

## Estrutura de pastas
```text
dra-rea/
  public/
    Dra_REA.png
    IMREA.png
    integrante?.jpg
  src/
    components/
      Alert.tsx
      BackToTop.tsx
      Footer.tsx
      Header.tsx
      Layout.tsx
      WatsonChat.tsx
    data/membros.ts
    hooks/useAPI.ts
    pages/ (Home, Sobre, FAQ, Contato, Solucao, Integrantes, Membro, Login, Cadastro, Usuarios, UsuarioDetalhe, NotFound)
    services/api.ts
    types/index.ts
    App.tsx
    main.tsx
    index.css
  db.json
  tailwind.config.js
  vite.config.ts
  vercel.json
```

## 👥 Equipe

**Leonardo José Pereira** — RM 563065 — 1TDSPW  
🔗 [GitHub](https://github.com/leojp04) | [LinkedIn](https://www.linkedin.com/in/leonardo-pereira-adm)

**Fabricio Henrique Pereira** — RM 563237 — 1TDSPW  
🔗 [GitHub](https://github.com/Fabriciopereira-sp) | [LinkedIn](https://www.linkedin.com/in/fabricio-henrique-pereira-3aa94933b/)

**Ícaro José dos Santos** — RM 562403 — 1TDSPW  
🔗 [GitHub](https://github.com/Icaro-Jose09) | [LinkedIn](https://www.linkedin.com/in/icaro-jose-jose-96b651324)

## Assets e referencias visuais
- `public/IMREA.png`: logotipo oficial.
- `public/Dra_REA.png`: ilustracao da assistente virtual.
- `public/integrante?.jpg`: fotos da equipe.

---
### Checklist antes da entrega
- [x] Rodar `npm run build` para garantir que a build conclui sem erros.
- [x] Conferir o arquivo `.env.local` com a URL de producao.
- [x] Atualizar este README caso a URL da Vercel seja alterada.
- [x] Compactar o projeto (sem `node_modules`) preservando a pasta `.git`.
