const passport = require('passport');
const User = require('../../models/userModel');

exports.apiLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return res.status(500).json({ success: false, message: 'Error interno' });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Credenciales inválidas' });

    req.login(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: 'Error al iniciar sesión' });
      return res.json({
        success: true,
        message: 'Login exitoso',
        user: { id: user.id, username: user.username },
      });
    });
  })(req, res, next);
};

exports.apiRegister = async (req, res) => {
  const { username, email, password, password2, dni } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2 || !dni) {
    errors.push('Por favor completa todos los campos');
  }

  if (password !== password2) {
    errors.push('Las contraseñas no coinciden');
  }

  if (password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (dni && !/^\d{8}[a-zA-Z]$/.test(dni)) {
    errors.push('El DNI debe tener 8 números seguidos de una letra');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    let user = await User.findOne({ $or: [{ email }, { dni }] });

    if (user) {
      return res.status(400).json({
        success: false,
        message:
          user.email === email
            ? 'El email ya está registrado'
            : 'El DNI ya está registrado',
      });
    }

    user = new User({ username, email, password, dni });
    await user.save();

    return res
      .status(201)
      .json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: 'Error en el servidor' });
  }
};

exports.apiLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error al cerrar sesión' });
    }
    return res.json({ success: true, message: 'Sesión cerrada' });
  });
};
