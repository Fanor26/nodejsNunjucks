// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController'); // Importamos el controlador

// Ruta para crear una cuenta asociada a un usuario específico
router.post('/create-account/:userId', accountController.createAccount);

module.exports = router;
