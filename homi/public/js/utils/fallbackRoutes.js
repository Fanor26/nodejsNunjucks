// public/js/utils/fallbackRoutes.js

export function getFallbackRoutes() {
  return [
    { path: '/', component: 'HomePage', name: 'Inicio' },
    { path: '/about', component: 'AboutPage', name: 'Acerca de' },
    { path: '/login', component: 'LoginPage', name: 'Login' },
    // Puedes agregar más rutas de ejemplo aquí si quieres.
  ];
}
