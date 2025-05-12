const User = require('../../models/userModel');

exports.profile = async (req, res) => {
  if (!req.user) {
    // Si no hay usuario autenticado, redirigimos a login
    return res.redirect('/login');
  }

  try {
    // Obtener la información del usuario desde la base de datos
    const user = await User.findById(req.user.id);

    // Si el usuario no existe en la base de datos, redirigimos
    if (!user) {
      req.flash('error_msg', 'Usuario no encontrado');
      return res.redirect('/');
    }

    // Renderizamos la vista de perfil con la información del usuario
    res.render('dashboard/profile.njk', {
      title: 'Perfil',
      mdname: 'Usuarios',
      user, // Pasamos los datos del usuario a la vista
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Hubo un problema al cargar tu perfil');
    res.redirect('/');
  }
};
