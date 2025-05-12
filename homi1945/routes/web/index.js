const express = require('express');
const router = express.Router();
const autoRenderController = require('../../controllers/web/autoRenderController');
const { ensureAuthenticated } = require('../../middlewares/auth');

// Importar las rutas desde el JSON y asignar controladores
const fs = require('fs');
const path = require('path');
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../config/routes.json'), 'utf-8')
);

// Iterar sobre las rutas y asignar controladores
routes.forEach((route) => {
  const mws = [];
  if (route.private) mws.push(ensureAuthenticated); // Si la ruta es privada, la protegemos
  router.get(route.path, ...mws, autoRenderController.autoRender);
});

module.exports = router;
