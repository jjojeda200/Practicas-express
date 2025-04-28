// init/inicializarUsuarios.js
const fs = require('fs/promises');
const path = require('path');

async function inicializarUsuarios() {
    const usuariosIniciales = [
        { id: 1, nombre: 'Alice' },
        { id: 2, nombre: 'Bob' },
        { id: 3, nombre: 'Charlie' }
    ];
    const rutaArchivo = path.join(__dirname, '..', 'usuarios.json');
    try {
        await fs.writeFile(rutaArchivo, JSON.stringify(usuariosIniciales, null, 2));
        console.log('usuarios.json inicializado con datos de prueba.');
    } catch (error) {
        console.error('Error al inicializar usuarios:', error);
    }
}

inicializarUsuarios();