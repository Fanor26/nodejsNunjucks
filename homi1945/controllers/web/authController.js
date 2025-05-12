const passport = require('passport');
const User = require('../../models/userModel');

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

exports.register = async (req, res) => {
  const { username, email, password, password2, dni } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2 || !dni) {
    errors.push({ msg: 'Por favor completa todos los campos' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Las contraseñas no coinciden' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres' });
  }

  if (dni && !/^\d{8}[a-zA-Z]$/.test(dni)) {
    errors.push({ msg: 'El DNI debe tener 8 números seguidos de una letra' });
  }

  if (errors.length > 0) {
    req.flash('error_msg', errors.map((e) => e.msg).join(', '));
    return res.redirect('/register');
  }

  try {
    let user = await User.findOne({ $or: [{ email }, { dni }] });

    if (user) {
      if (user.email === email) {
        req.flash('error_msg', 'El email ya está registrado');
      } else {
        req.flash('error_msg', 'El DNI ya está registrado');
      }
      return res.redirect('/register');
    }

    user = new User({ username, email, password, dni });
    await user.save();

    req.flash('success_msg', 'Registro exitoso! Ahora puedes iniciar sesión');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error en el servidor');
    res.redirect('/register');
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success_msg', 'Has cerrado sesión');
    res.redirect('/login');
  });
};
