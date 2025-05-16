import passport from 'passport';
import bcrypt from 'bcrypt';

import * as authService from '../services/authService.js';
import * as authValidator from '../validators/authValidator.js';
import { serialize } from 'cookie'; // Librería para manejar cookies

// Asegúrate de que este código esté dentro de una ruta en tu controlador

// Ruta para manejar el login
export const login = async (req, res, next) => {
  try {
    const { error } = authValidator.validateLogin(req.body);
    if (error)
      return res.status(400).json({
        status: 'fail',
        code: 'VALIDATION_ERROR',
        message: error.details[0].message,
      });

    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user)
        return res
          .status(401)
          .json({ code: 'AUTH_FAILED', message: info.message });

      req.logIn(user, (err) => {
        if (err) return next(err);

        // Si necesitas añadir una cookie tuya, usa res.cookie:
        res.cookie(
          'userData',
          JSON.stringify({ id: user._id, username: user.username }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: 'lax',
            path: '/',
          }
        );

        // Ahora puedes devolver tu respuesta, y la cookie de sesión estará intacta
        return res.json(authService.buildAuthResponse(user, req));
      });
    })(req, res, next); // Ejecutamos el middleware de passport dentro de la ruta
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { error } = authValidator.validateRegister(req.body);
    if (error)
      return res.status(400).json({
        status: 'fail',
        code: 'VALIDATION_ERROR',
        message: error.details[0].message,
      });

    const newUser = await authService.createUser(req.body);

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.status(201).json(authService.buildAuthResponse(newUser, req));
    });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    // Destruye la sesión en el store (MongoStore)
    req.session.destroy((err) => {
      if (err) return next(err);
      // Limpia la cookie en el navegador
      res.clearCookie('connect.sid', { path: '/' });
      // (si creaste userData) limpiarla también
      res.clearCookie('userData', { path: '/' });
      res.json({ status: 'success', message: 'Logout OK' });
    });
  });
};

export const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      status: 'fail',
      code: 'UNAUTHORIZED',
      message: 'No autorizado',
    });
  }

  res.json(authService.buildAuthResponse(req.user, req));
};
