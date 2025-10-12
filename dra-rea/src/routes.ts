export type AppRoute = { path: string; title: string }

export const ROUTES: AppRoute[] = [
  { path: '/', title: 'Início — IMREA Digital' },
  { path: '/sobre', title: 'Sobre — IMREA Digital' },
  { path: '/integrantes', title: 'Integrantes — IMREA Digital' },
  { path: '/contato', title: 'Contato — IMREA Digital' }
]

export const getTitleByPath = (path: string) =>
  ROUTES.find(r => r.path === path)?.title ?? 'IMREA Digital'
