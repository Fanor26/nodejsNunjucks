import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

export const sessionMiddleware = (req, res, next) => {
  session({
    secret: process.env.SESSION_SECRET, // La clave secreta para firmar la cookie de sesión
    resave: false, // No re-guardar la sesión si no ha sido modificada
    saveUninitialized: false, // No guardar sesiones no inicializadas
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Asegúrate de que esta URL esté bien configurada
      ttl: 14 * 24 * 60 * 60, // Tiempo de vida de la sesión en segundos (14 días)
    }),
    cookie: {
      httpOnly: true, // La cookie no puede ser accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // En producción se requiere `secure: true`
      sameSite: 'none', // Importante para permitir cookies entre orígenes (Cross-origin)
      maxAge: 1000 * 60 * 60 * 24, // Duración de la cookie (1 día)
    },
    genid: (req) => {
      return Math.floor(Math.random() * 1000000000); // Genera un ID único para la sesión
    },
    onCreate: (session) => {
      console.log('Sesión creada:', session); // Verifica si la sesión se ha creado
    },
  })(req, res, next); // Ejecuta la sesión y pasa el control al siguiente middleware
};
