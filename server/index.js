const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = reguire('./users');

const PORT = 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('A user has connected!');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: '${user.name}, welcome to ${user.room}' });

        socket.join(user.room);
    });

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    })
})
app.use(router);

server.listen(PORT, () => console.log('server has started on port ${PORT}'));