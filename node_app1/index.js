const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const Queue = require('./scripts/req-queue');


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/scripts'));

http.listen(80, () => {
    console.log('Listening on *:80')
});

const q = new Queue();

function callEndPoint(socket) {
    if (q.first() === socket) {
        axios.get('http://localhost:81/queue-app')
            .then((resp) => {
                socket.emit('feedback', { feedback: resp.data })
                socket.emit('enable');
                q.remove();
                if (q.size() > 0) {
                    callEndPoint(q.first());
                }
            });
    }
}

io.on('connection', (socket) => {
    socket.on('Job Request', () => {
        socket.emit('disable', { disable: true });
        q.add(socket);
        callEndPoint(socket);
    });
});