const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Ruta para registro
router.post('/register', authController.register); // Ruta para registrar un nuevo usuario

module.exports = router;
