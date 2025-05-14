const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Rutas de perfil
router.get('/showProfile', profileController.showProfile); // Vista del perfil
router.get('/profile', profileController.getProfile); // Obtener datos del perfil (API)
router.put('/updateProfile', profileController.updateProfile); // Actualizar perfil (API)

module.exports = router;
