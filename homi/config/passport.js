import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

// LocalStrategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // o 'username' si usas username
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, { message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return done(null, false, { message: 'Contraseña incorrecta' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// 🔑 Serializar: guarda solo el ID en la sesión
passport.serializeUser((user, done) => {
  console.log('✔️ serializeUser ejecutado:', user._id); // 🟢 Prueba este log
  done(null, user._id);
});

// 🔓 Deserializar: busca el usuario desde el ID guardado en sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('✔️ deserializeUser ejecutado:', user); // 🟢 Prueba este log
    done(null, user);
  } catch (err) {
    done(err);
  }
});
