import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// 🔧 Útil para rutas web (no usar path.join)
const joinUrlPath = (...segments) => {
  return segments
    .map((s) => s.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/')
    .replace(/^/, '/');
};

// Gestión de rutas de la aplicación
router.get('/routes', (req, res) => {
  try {
    const routes = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../config/routes.json'))
    );

    const processRoutes = (routesArray, basePath = '') => {
      return routesArray.map((route) => {
        const fullPath = joinUrlPath(basePath, route.path); // ✅ CORREGIDO

        const result = {
          path: fullPath,
          view: route.view,
          private: route.private || false,
          title: route.title,
          mdname: route.mdname || '',
        };

        if (route.children) {
          result.children = processRoutes(route.children, fullPath);
        }

        return result;
      });
    };

    const allRoutes = processRoutes(routes);

    const filtered = allRoutes.filter((r) =>
      req.user ? r.private !== false : r.private === false
    );

    res.json(filtered);
  } catch (err) {
    console.error('Error loading routes:', err);
    res.status(500).json({ error: 'Error al cargar las rutas' });
  }
});

export default router;
