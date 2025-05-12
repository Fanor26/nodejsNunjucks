require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path'); // Asegúrate de incluir `path`
const routesWeb = require('./routes/web/index');
const authRoutes = require('./routes/web/auth');
const profileRoutes = require('./routes/web/profile');
// Inicialización
const app = express();

// ⚠️ Aquí sí ejecutas la conexión a MongoDB:
const connectDB = require('./config/database');
connectDB();

require('./config/passport');

// Configuración de Nunjucks
nunjucks.configure(path.join(__dirname, 'views'), {
  // Usamos path aquí
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Rutas
app.use('/', routesWeb);
app.use('/auth', authRoutes, profileRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
