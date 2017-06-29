import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
server.listen(3001, () => console.log('listening on *:3001'));

const sockets = [];

function emitAll(action, message) {
  sockets.forEach(function(socket) {
    socket.emit(action, message)
  });
}

// The event will be called when a client is connected.
websocket.on('connection', (socket) => {
  sockets.push(socket);
  socket.on('displayMap', (data) => {
    console.log('SALUT');
    emitAll('displayMap', data);
  });

  socket.on('vanishAll', () => {
    emitAll('vanishAll');
  });
});
