const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    const error = validationResult(req);

    if(!error.isEmpty()) return res.status(400).json({errors: error });

    let  { email, nombre, password } = req.body;

    try {   

        let usuario = await Usuario.findOne({email});

        if(usuario) return res.status(400).json({msj: "El usuario ya existe"});

        usuario = new Usuario(req.body);

        usuario.password = bcrypt.hashSync(password, 10);

        await usuario.save();

        const payload = { id: usuario.id, email, nombre }

        jwt.sign( {
            expiresIn: '24h',
            payload: payload
        }, process.env.SECRET, (error, token) => {
            if(error) throw error;

            res.send({token});
        });
        
        

    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error");
    }
    
}