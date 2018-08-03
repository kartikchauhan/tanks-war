const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 8080);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(8080, function() {
    console.log('Starting server on port 8080');
});

var players = {};

io.on('connection', function(socket) {
    socket.on('new player', function() {
        console.log('new player joined');
        players[socket.id] = {
            x: 300,
            y: 300
        };
    });

    socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        if(data.up)
            player.y -= 5;

        if(data.down)
            player.y += 5;

        if(data.left)
            player.x -= 5;
        
        if(data.right)
            player.x += 5;
    });
});

setInterval(function() {
    io.sockets.emit('state', players);
    console.log('emitting event state');
}, 1000/60);
