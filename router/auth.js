const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('././../middleware/auth');

router.post('/',
    authController.Login
);

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;