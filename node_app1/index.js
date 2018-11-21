const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/scripts'));

http.listen(3000, () => {
    console.log('Listening on *:3000')
});

const socketIds = [];

io.on('connection', (socket) => {
    socket.on('Job Request', () => {
        axios.get('http://localhost:3001/test1').then((resp) => {
            socket.emit('feedback', { feedback: resp.data })
        });
    });
});