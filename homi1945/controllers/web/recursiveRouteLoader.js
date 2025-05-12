const fs = require('fs');
const path = require('path');

const loadRoutesRecursively = (
  router,
  routes,
  basePath = '',
  middlewares = {}
) => {
  routes.forEach((route) => {
    // Construir la ruta completa (ej: /auth/login)
    const fullPath = `${basePath}${route.path}`.replace(/\/+/g, '/');

    // Configurar middlewares para la ruta
    const routeMiddlewares = [];
    if (route.private) routeMiddlewares.push(middlewares.ensureAuthenticated);

    // Si tiene vista, es una ruta terminal
    if (route.view) {
      router.get(fullPath, ...routeMiddlewares, (req, res) =>
        res.render(route.view, {
          title: route.title || 'Título por defecto',
          mdname: route.mdname,
          user: req.user || null,
        })
      );
      console.log(`[Route] Registrada GET ${fullPath}`);
    }

    // Procesar children recursivamente
    if (route.children && route.children.length > 0) {
      loadRoutesRecursively(router, route.children, fullPath, middlewares);
    }
  });
};

module.exports = (router, middlewares = {}) => {
  const routesPath = path.join(__dirname, '../../config/routes.json');
  try {
    const rawData = fs.readFileSync(routesPath, 'utf-8');
    const routes = JSON.parse(rawData);
    loadRoutesRecursively(router, routes, '', middlewares);
  } catch (err) {
    console.error('Error cargando rutas:', err);
  }
  return router;
};
