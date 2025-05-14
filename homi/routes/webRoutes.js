import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Middleware auth
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

// 🔧 Útil para rutas web
const joinUrlPath = (...segments) => {
  return segments
    .map((s) => s.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/')
    .replace(/^/, '/');
};

// Leer JSON de rutas
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../config/routes.json'))
);

// Registrar rutas recursivamente
const registerRoutes = (routesArray, parentPath = '') => {
  routesArray.forEach((route) => {
    const normalizedPath = joinUrlPath(parentPath, route.path); // ✅ CORREGIDO

    const middleware = route.private ? ensureAuth : (req, res, next) => next();

    // Logout especial
    if (route.path === '/logout') {
      router.get(normalizedPath, ensureAuth, (req, res, next) => {
        req.logout((err) => {
          if (err) return next(err);
          res.redirect('/login');
        });
      });
    } else {
      router.get(normalizedPath, middleware, (req, res) =>
        res.render(route.view, { user: req.user })
      );
    }

    // Recursividad para hijos
    if (route.children) {
      registerRoutes(route.children, normalizedPath);
    }
  });
};

registerRoutes(routes);

// Redirección base

export default router;
