# IMREA Digital — Sprint 4 (Front-end Design Engineering)

Aplicação SPA desenvolvida para o desafio IMREA Digital, com foco em acessibilidade, responsividade e integração a serviços de agendamento. O front-end foi construído em **React 19 + Vite + TypeScript**, estilizado com **Tailwind CSS 4** e validado com **React Hook Form + Zod**.

## Tecnologias
- React 19
- Vite 5
- TypeScript 5
- Tailwind CSS 4
- React Router DOM 7
- React Hook Form + Zod
- ESLint

## Variáveis de Ambiente
Crie um arquivo `.env` na raiz de `dra-rea/` com:
```bash
VITE_API_URL=https://api-front-cyke.onrender.com
```
Esta URL aponta para o mock da API publicado no Render (json-server). Para usar outro backend, substitua pelo endpoint desejado antes de rodar o projeto.

## Como rodar localmente
```bash
cd dra-rea
npm install
npm run dev
```
A aplicação ficará disponível em `http://localhost:5173`.  
Para validar o build de produção:
```bash
npm run build
npm run preview
```

## Build & Deploy
- Produção (Vercel): https://sprint-4-front-ywbf.vercel.app/
- Ambiente de preview local: `npm run build && npm run preview`
- Base da API utilizada em produção: https://api-front-cyke.onrender.com

## Estrutura de pastas
```
src/
  assets/
  components/
  data/
  hooks/
  pages/
  services/
  types/
  App.tsx
  main.tsx
  routes.ts
  index.css
```

## Integrantes
- **Leonardo José Pereira** — RM **563065** — 1TDSPW  
  GitHub: https://github.com/leojp04 · LinkedIn: https://www.linkedin.com/in/leonardo-pereira-adm  
- **Fabricio Henrique Pereira** — RM **563237** — 1TDSPW  
  GitHub: https://github.com/Fabriciopereira-sp · LinkedIn: https://www.linkedin.com/in/fabr%C3%ADcio-henrique-pereira-3aa94933b/  
- **Ícaro José dos Santos** — RM **562403** — 1TDSPW  
  GitHub: https://github.com/Icaro-Jose09 · LinkedIn: https://www.linkedin.com/in/icaro-jose-jose-96b651324

## API Mock
O mock utilizado no desenvolvimento está disponível em: https://api-front-cyke.onrender.com  
Repositório: https://github.com/leojp04/API-Front

## Vídeo (≤3 min)
Em produção — link será adicionado após a gravação final.

## Como comprovar commits
Para gerar o resumo de commits por integrante:
```bash
git shortlog -sne
```
Inclua a saída no relatório de entrega, garantindo a transparência das contribuições.
