const express = require('express');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); 
const Usuario = require('../models/Usuario');

exports.Login = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json(errors.array());

    const { email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if(!usuario) return res.status(400).json({msg: 'Usuario no existe!'});

        const passwordCheck = await bcrypt.compare(password, usuario.password);

        if(!passwordCheck)  res.status(400).json({msg: 'Password Incorrecta!'});

        const payload = { id: usuario.id, email }

        jwt.sign( {
            expiresIn: '24h',
            payload: payload
        }, process.env.SECRET, (error, token) => {
            if(error) throw error;

            res.send({token});
        });

        
    } catch (error) {
        console.log(error);
    }

    
}

exports.usuarioAutenticado = async (req, res) => {

    try {

        const usuario = await Usuario.findById(res.usuario.id).select('-password');
        res.json({usuario});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Hubo un error"});
    }

}