var express = require("express");
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('Usuario conectado')
  socket.emit('bienvenida')
  socket.on('nuevo_mensaje', (message) => {
    // Dinfundimos el mensaje a todos los clientes
    io.sockets.emit('difundir_mensaje', message);
  });
})

// Asignar el puerto que Heroku maneja y si no existe el 3000 manualmente
var server = http.listen(process.env.PORT || 3000, () => {
  console.log("Servidor listo en http://127.0.0.1:" + server.address().port);
});


