export type AppRoute = { path: string; title: string }

export const ROUTES: AppRoute[] = [
  { path: '/', title: 'Inicio | IMREA Digital' },
  { path: '/sobre', title: 'Sobre | IMREA Digital' },
  { path: '/integrantes', title: 'Integrantes | IMREA Digital' },
  { path: '/contato', title: 'Contato | IMREA Digital' },
  { path: '/perfil', title: 'Perfil do Usuario | IMREA Digital' },
]

export const getTitleByPath = (path: string) =>
  ROUTES.find((route) => route.path === path)?.title ?? 'IMREA Digital'

