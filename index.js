// servidor.js
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const logger = require('./middleware/logger');

const app = express();
const puerto = 3000;
const rutaUsuarios = path.join(__dirname, 'usuarios.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Servir contenido estático
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir rutas con barras finales
app.use((req, res, next) => {
    if (req.path.endsWith('/') && req.path !== '/') {
        const newPath = req.path.replace(/\/+$/, '');
        console.log(`Redirigiendo de ${req.url} a ${newPath}`);
        return res.redirect(301, newPath);
    }
    next();
});

// Rutas
app.get('/bienvenida', (req, res) => {
    res.type('text/plain').send('¡Bienvenido al servidor Express!');
});

app.get('/api/usuarios', async (req, res, next) => {
    try {
        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        const usuarios = JSON.parse(data);
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
});

app.get('/api/usuarios/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        const usuarios = JSON.parse(data);
        const usuario = usuarios.find(u => u.id === id);

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(usuario);
    } catch (error) {
        next(error);
    }
});

app.post('/api/usuarios', async (req, res, next) => {
    try {
        const { nombre } = req.body;
        if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        const usuarios = JSON.parse(data);
        const nuevoUsuario = {
            id: usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
            nombre
        };
        usuarios.push(nuevoUsuario);

        await fs.writeFile(rutaUsuarios, JSON.stringify(usuarios, null, 2));
        res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
    } catch (error) {
        next(error);
    }
});

app.put('/api/usuarios/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

        const { nombre } = req.body;
        if (!nombre) return res.status(400).json({ error: 'El nombre es requerido' });

        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        const usuarios = JSON.parse(data);
        const index = usuarios.findIndex(u => u.id === id);

        if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });

        usuarios[index].nombre = nombre;

        await fs.writeFile(rutaUsuarios, JSON.stringify(usuarios, null, 2));
        res.json({ mensaje: `Usuario ${id} actualizado`, usuario: usuarios[index] });
    } catch (error) {
        next(error);
    }
});

app.delete('/api/usuarios/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'ID inválido' });

        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        let usuarios = JSON.parse(data);
        const nuevoUsuarios = usuarios.filter(u => u.id !== id);

        if (usuarios.length === nuevoUsuarios.length)
            return res.status(404).json({ error: 'Usuario no encontrado' });

        await fs.writeFile(rutaUsuarios, JSON.stringify(nuevoUsuarios, null, 2));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Middleware de error
app.use((err, req, res, next) => {
    console.error('Error interno:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});