const express = require('express');
const conectarDB = require('./config/db');
const usuarios = require('./router/usuarios');
const auth = require('./router/auth');
const proyectos = require('./router/proyectos');
const tareas = require('./router/tareas');
const cors = require('cors');

const app = express();


conectarDB();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/proyectos', proyectos);
app.use('/api/tareas', tareas);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor conectado...! puerto ${PORT}`);
})