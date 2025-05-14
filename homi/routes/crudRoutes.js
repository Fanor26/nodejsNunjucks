import { Router } from 'express'
import User from '../models/userModel.js'

const router = Router()

// GET /api/users - listar usuarios (sin password)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password') // Excluir passwords
    res.json({ success: true, data: users })
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ success: false, message: 'Error del servidor' })
  }
})

export default router
