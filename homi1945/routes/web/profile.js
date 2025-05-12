const express = require('express');
const router = express.Router();

const profileController = require('../../controllers/web/profileController'); // Importar el controlador de perfil
const { ensureAuthenticated } = require('../../middlewares/auth');

// Ruta para el perfil, con protección de autenticación
router.get('/profile', ensureAuthenticated, profileController.profile);

module.exports = router;
