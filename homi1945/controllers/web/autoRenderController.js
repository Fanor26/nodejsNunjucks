const fs = require('fs');
const path = require('path');

// Verificamos que cargue bien el JSON
const routesPath = path.join(__dirname, '../../config/routes.json');
console.log('[autoRender] Cargando rutas desde:', routesPath);

let routes;
try {
  const data = fs.readFileSync(routesPath, 'utf-8');
  routes = JSON.parse(data);
  console.log(
    '[autoRender] Rutas cargadas:',
    routes.map((r) => r.path)
  );
} catch (err) {
  console.error('[autoRender] Error cargando routes.json:', err);
  routes = [];
}

exports.autoRender = (req, res) => {
  console.log('\n[autoRender] Petición a:', req.method, req.path);

  const route = routes.find((r) => r.path === req.path);
  console.log('[autoRender] Route encontrada:', route);

  if (route) {
    console.log(
      `[autoRender] Renderizando vista "${route.view}" con title="${route.title}"`
    );
    return res.render(route.view, {
      title: route.title,
      mdname: route.mdname,
      private: route.private,
      user: req.user || null,
    });
  } else {
    console.warn('[autoRender] Ruta no encontrada en JSON:', req.path);
    return res.status(404).send('Ruta no encontrada');
  }
};
