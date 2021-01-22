const { io } = require('../server');
const {Usuario} = require('../classes/usuarioController');
const {enviarMensaje} = require('./utils/utilidades');

const usuarios = new Usuario();

io.on('connection', (client) => {

    client.on('entrarAlChat', (data, callback) => {
        if(callback) {

            if(!data.nombre || !data.sala) return callback({
                ok: false,
                message: 'El nombre/sala es necesario'
            })

            client.join(data.sala);
    
            let personas = usuarios.addPersona(client.id, data.nombre, data.sala);

            client.broadcast.to(data.sala).emit('nuevaConexion', {
                message: enviarMensaje('Administrador', `${data.nombre} acaba de unirse al chat`),
                usuarios: usuarios.getPersonasSala(data.sala)
                
            })
    
            callback(personas);
        }

    })

    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit('mensajePrivado', enviarMensaje(persona.nombre, data.mensaje));
    })

    client.on('enviarMensaje', data => {

        let usuario = usuarios.getPersona(client.id);
        let mensaje = enviarMensaje(usuario.nombre, data.mensaje);
        client.broadcast.to(data.sala).emit('enviarMensaje', mensaje);
    })

    client.on('disconnect', () => {
        let persona = usuarios.deletePersona(client.id);

        client.broadcast.to(persona.sala).emit('abandonoChat', {
            message: enviarMensaje('Administrador', `${persona.nombre} abandonó el chat`),
            usuarios: usuarios.getPersonasSala(persona.sala)
        })
    })

});
