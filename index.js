const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('/Hello', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected!');
    socket.broadcast.emit('Hi');
    socket.on('disconnect', () => {
        console.log('user disconnect!');
    });

    socket.on('chat message', (msg) => {
        console.log('message:' + msg);
        io.emit('chat message',msg);
    });
})

server.listen(3000, () => {
    console.log('listen on *:3000');
});