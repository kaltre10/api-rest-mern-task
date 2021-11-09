const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty().isLength({min: 3})  
    ],
    proyectosController.crearProyecto
);

router.get('/',
    auth,
    proyectosController.obtenerProyectos
)

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()  
    ],
    proyectosController.actualizarProyecto
);

router.delete('/:id',
    auth,
    proyectosController.deleteProyecto
);

module.exports = router;