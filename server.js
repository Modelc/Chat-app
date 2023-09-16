const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('send_message', (message) => {
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
