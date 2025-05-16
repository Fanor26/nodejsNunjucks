import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import crypto from 'crypto';
import helmet from 'helmet';
import http from 'http';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectDB } from './config/database.js';
import passport from 'passport';
import './config/passport.js';
import nunjucks from 'nunjucks';
import webRoutes from './routes/webRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import crudRoutes from './routes/crudRoutes.js';
import authRoutes from './routes/authRoutes.js';
import crudItems from './backend/routes/crudRoutes.js';
dotenv.config();
import fs from 'fs';

// 📦 Cargar JSON manualmente (sin assert)

const app = express();
const server = http.createServer(app);
const { Server } = await import('socket.io');
const io = new Server(server);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

await connectDB();
const routesConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, './config/routes.json'), 'utf-8')
);
// 🟢 CORS PRIMERO (antes de sesiones, rutas, etc)
app.use(
  cors({
    origin: [
      'https://15000-fanor26-nodejsnunjucks-12s16nkk8mb.ws-us118.gitpod.io',
      'https://4000-fanor19481956-nunjucks-rv5k15v8nef.ws-us118.gitpod.io',
    ],
    credentials: true, // ✅ permite enviar cookies y encabezados de autenticación
  })
);
// 🛡️ CSP nonce
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';`
  );
  next();
});

// 🔐 Session debe venir después de CORS
const isGitpod = !!process.env.GITPOD_WORKSPACE_URL;

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' && !isGitpod, // ✅ Desactiva secure si es Gitpod
      sameSite: 'lax',
      maxAge: 1000 * 60 * 30, // 30 minutos
    },
  })
);

// Passport después de sesiones
app.use(passport.initialize());
app.use(passport.session());
// 3. Middleware de logging YA DESPUÉS de passport.session()
app.use((req, res, next) => {
  // Guarda la función original de res.end
  const originalEnd = res.end;

  res.end = function chunk(...args) {
    // Antes de terminar la respuesta, chequea req.user
    console.log('📦 Sesión final de petición:', req.session);
    console.log('🔑 req.user al final de petición:', req.user);
    // Llama al end original
    originalEnd.apply(res, args);
  };

  next();
});
// Static y Body Parsers
const staticPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'dist')
    : path.join(__dirname, 'public');

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Nunjucks config
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV !== 'production',
  noCache: process.env.NODE_ENV !== 'production',
});

// Helmet (puede ir aquí)
app.use(helmet());

// 🌐 Rutas
app.use('/webRoutes', webRoutes);
app.use('/api', apiRoutes, crudItems);
app.use('/auth', authRoutes);
app.use('/crud', crudRoutes);

// Redirección raíz
app.get('/', (req, res) => {
  if (req.user) {
    return res.redirect('/dashboard');
  } else {
    return res.redirect('/home');
  }
});
// Función para buscar la ruta por path
const findRouteByPath = (routes, path) => {
  for (const route of routes) {
    if (route.path === path) return route;
    if (route.children) {
      const found = findRouteByPath(route.children, path);
      if (found) return found;
    }
  }
  return null;
};
app.get('*', (req, res) => {
  const currentRoute = findRouteByPath(routesConfig, req.path);
  let currentTitle = currentRoute?.title || 'Mi App';

  if (req.user) {
    currentTitle = `${currentTitle} | ${req.user.username}`;
  }

  res.render('layout.njk', {
    nonce: res.locals.nonce,
    // title: currentTitle,
    scriptPath:
      process.env.NODE_ENV === 'production' ? 'bundle.min.js' : 'js/main.js',
    env: JSON.stringify({ NODE_ENV: process.env.NODE_ENV }),
    user: req.user,
  });
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);
  socket.on('mensaje', (msg) => {
    console.log('📩 Mensaje recibido:', msg);
    io.emit('mensaje', msg);
  });
  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

// 🚀 Start server
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
