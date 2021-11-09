const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { check } = require('express-validator');

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty().isLength({min: 3}),
        check('email', 'Ingrese un email valido').isEmail(),
        check('password', 'La Contraseña debe tener minimo 3 caracteres').isLength({min: 3}),
    ],
    usuariosController.crearUsuario
)

module.exports = router;