const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { proyecto } = req.body;

        const checkProyecto = await Proyecto.findById(proyecto);

        if(!checkProyecto) 
            return res.status(404).json({msg: 'Proyecto no existe'});

        if(checkProyecto.creador.toString() !== res.usuario.id)
            return res.status(401).json({msg: 'No Autorizado'});
        
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json(tarea);
        
    } catch (error) {
        res.status(500).json({msg: "Hubo un error"});
    }

}

exports.obtenerTareas = async (req, res) => {

    try {
        
        const { proyecto } = req.query;
 
        const checkProyecto = await Proyecto.findById(proyecto);

        if(!checkProyecto) 
            return res.status(404).json({msg: 'Proyecto no existe'});

        if(checkProyecto.creador.toString() !== res.usuario.id)
            return res.status(401).json({msg: 'No Autorizado'});

        const tareas = await Tarea.find({proyecto}).sort({ creado: -1});
        res.json(tareas);        

    } catch (error) {
        res.status(500).json({msg: "Hubo un error"});
    }
}

exports.actualizarTarea = async (req, res) => {
    try {

        const { nombre, estado, proyecto } = req.body;
    
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) return res.status(404).json({msg: "Tarea no existe"});

        const checkProyecto = await Proyecto.findById(proyecto);
        if(checkProyecto.creador.toString() !== res.usuario.id) 
            return res.status(401).json({msg: "No autorizado"});

        const nuevaTarea = {};
        if(nombre) nuevaTarea.nombre = nombre;
        if(estado.toString()) nuevaTarea.estado = estado;

        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});

        res.json(tarea);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error"});
    }
}

exports.eliminarTarea = async (req, res) => {
    try {

        const { proyecto } = req.query;
       
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) return res.status(404).json({msg: "Tarea no existe"});

        const checkProyecto = await Proyecto.findById(proyecto);
        if(checkProyecto.creador.toString() !== res.usuario.id) 
            return res.status(401).json({msg: "No autorizado"});


        await Tarea.findOneAndDelete({ _id: tarea._id });

        res.json('Tarea Eliminada!');

        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error"});
    }
}