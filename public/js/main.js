const API_URL = '/api/usuarios';

const listaUsuarios = document.getElementById('lista-usuarios');
const formularioCrear = document.getElementById('formulario-crear');
const mensajeBienvenida = document.getElementById('mensaje-bienvenida');
const btnBienvenida = document.getElementById('btn-bienvenida');

async function cargarUsuarios() {
    listaUsuarios.innerHTML = '';
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('Error al cargar usuarios.');
        const usuarios = await respuesta.json();

        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.className = 'usuario';
            li.innerHTML = `
                <span>${usuario.nombre}</span>
                <button data-id="${usuario.id}">Eliminar</button>
            `;
            listaUsuarios.appendChild(li);
        });

        listaUsuarios.querySelectorAll('button[data-id]').forEach(boton => {
            boton.addEventListener('click', () => eliminarUsuario(boton.dataset.id));
        });
    } catch (error) {
        console.error(error);
    }
}

async function eliminarUsuario(id) {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (respuesta.status === 204) {
            cargarUsuarios();
        } else {
            const error = await respuesta.json();
            alert(error.error || 'Error al eliminar usuario.');
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}

formularioCrear.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    if (!nombre) {
        alert('El nombre no puede estar vacío.');
        return;
    }
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        });
        if (respuesta.ok) {
            document.getElementById('nombre').value = '';
            cargarUsuarios();
        } else {
            const error = await respuesta.json();
            alert(error.error || 'Error al crear usuario.');
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
});

btnBienvenida.addEventListener('click', async () => {
    try {
        const respuesta = await fetch('/bienvenida');
        if (!respuesta.ok) throw new Error('Error al obtener mensaje de bienvenida.');
        const mensaje = await respuesta.text();
        mensajeBienvenida.textContent = mensaje;
    } catch (error) {
        console.error(error);
    }
});

// Inicializar
cargarUsuarios();8