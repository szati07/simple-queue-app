const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/scripts'));

http.listen(3000, () => {
    console.log('Listening on *:3000')
});

io.on('connection', function (socket) {
    socket.on('Job Request', () => {
        console.log('Valami bejott')
    })
});