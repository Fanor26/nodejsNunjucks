import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET || 'mi-clave-secreta'

export const generateToken = user => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      roles: user.roles
    },
    SECRET_KEY,
    { expiresIn: '30m' }
  )
}

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' })
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' })
    }
    req.user = decoded
    next()
  })
}
