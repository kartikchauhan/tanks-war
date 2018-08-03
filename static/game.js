const socket = io();
socket.on('message', function(data) {
    console.log(data);
});

let movements = {
    up: false,
    down: false,
    left: false,
    right: false
};

document.addEventListener('keydown', function(event) {
    switch(event.keyCode)
    {
        case 65: movements.left = true;
        break;

        case 87: movements.up = true;
        break;

        case 68: movements.right = true;
        break;

        case 83: movements.down = true;
        break;
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.keyCode)
    {
        case 65: movements.left = false;
        break;

        case 87: movements.up = false;
        break;

        case 68: movements.right = false;
        break;

        case 83: movements.down = false;
        break;
    }
});

socket.emit('new player');

setInterval(function() {
    socket.emit('movement', movements);
    console.log('emitting event movement');
}, 1000/60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
    console.log('state received');
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    for(let id in players)
    {
        var player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
});
