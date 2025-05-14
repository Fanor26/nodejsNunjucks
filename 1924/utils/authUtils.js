const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = 'mi-clave-secreta';

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      roles: user.roles,
    },
    SECRET_KEY,
    { expiresIn: '30m' }
  );

  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extraer el token

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = decoded; // Guardar info del usuario en la request
    next();
  });
};

module.exports = { generateToken, verifyToken };
