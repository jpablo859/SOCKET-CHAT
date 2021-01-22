var socket = io();

let params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarAlChat', usuario, (resp) => {
        console.log(resp)
    })
});

socket.on('nuevaConexion', data => {
    console.log(data)
})

socket.on('abandonoChat', data => {
    console.log(data)
})

socket.on('enviarMensaje', data => {
    console.log(data)
})

socket.on('mensajePrivado', data => {
    console.log(data)
})

// socket.emit('enviarMensaje', {})