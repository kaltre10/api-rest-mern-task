const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const tareasController = require('../controllers/tareasController');

router.post('/',
    auth,
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es Obligatorio').not().isEmpty()
    ],
    tareasController.crearTarea
);

router.get('/',
    auth,
    tareasController.obtenerTareas
);

router.put('/:id',
    auth,
    tareasController.actualizarTarea
);

router.delete('/:id',
    auth,
    tareasController.eliminarTarea
);

module.exports = router;