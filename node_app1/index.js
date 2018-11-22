const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

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

function Queue() {
    this.data = [];
}

Queue.prototype.add = function(record) {
    this.data.push(record);
  }
  
Queue.prototype.remove = function() {
    this.data.shift();
}

Queue.prototype.first = function() {
    return this.data[0];
}
  
Queue.prototype.last = function() {
    return this.data[this.data.length - 1];
}
  
Queue.prototype.size = function() {
    return this.data.length;
}

const q = new Queue();

function callEndPoint(socket) {
    if(q.first() === socket){
        console.log('hello')
        axios.get('http://localhost:81/queue-app')
        .then((resp) => {
            socket.emit('feedback', { feedback: resp.data })
            socket.emit('enable');
            q.remove();
            if(q.size() > 0) {
                console.log('Works like a charm');
                callEndPoint(q.first());
            }
        });
    }
}

io.on('connection', (socket) => {
    socket.on('Job Request', () => {
        socket.emit('disable', {disable: true});
        q.add(socket);
        callEndPoint(socket); 
    });
});