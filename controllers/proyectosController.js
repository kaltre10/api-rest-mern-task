const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    try {
        const proyecto = new Proyecto(req.body);

        proyecto.creador = res.usuario.id;
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        res.status(500).json({msg: "Error en el servidor"});
    }

}

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: res.usuario.id });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor"});
    }
}

exports.actualizarProyecto = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const { nombre } = req.body;

    const nuevoProyecto = {};
    if(nombre) nuevoProyecto.nombre = nombre;

    try {

        //revisar ID
        let proyecto = await Proyecto.findById(req.params.id); 

        //verificar si el proyecto existe o no
        if(!proyecto) 
            return res.status(404).json({msg: "No existe el proyecto"})

        //verificar el creador del proyecto
        if(proyecto.creador.toString() !== res.usuario.id)
            return res.status(401).json({msg: "No Autorizado"})

        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{$set: nuevoProyecto}, {new: true});

        res.json(proyecto);
        
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor"});
    }

}

exports.deleteProyecto = async (req, res) => {

    try {

        //revisar ID
        let proyecto = await Proyecto.findById(req.params.id); 

        //verificar si el proyecto existe o no
        if(!proyecto) 
            return res.status(404).json({msg: "No existe el proyecto"})

        //verificar el creador del proyecto
        if(proyecto.creador.toString() !== res.usuario.id)
            return res.status(401).json({msg: "No Autorizado"})

        //eliminar proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Proyecto Eliminado'});
        
    } catch (error) {
        res.status(500).json({msg: "Error en el servidor"});
    }

}