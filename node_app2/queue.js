const express = require('express')
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors')
const expressQueue = require('express-queue');

const queueMw = expressQueue({
    activeLimit: 1,
    queuedLimit: -1
});
app.use(queueMw)

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(cors());

const RESPONSE_DELAY = 5000;

let counter = 0;

app.get('/queue-app', (req, res) => {
    let cnt = counter++;

    console.log(`get(test1): [request] queueLength: ${queueMw.queue.getLength()}`);

    setTimeout(() => {
        console.log(`get(test1): [${cnt}/ready] queueLength: ${queueMw.queue.getLength()}`);
        res.status(200).send('Request Accepted');
        console.log(`get(test1): [${cnt}/sent] queueLength: ${queueMw.queue.getLength()}`);
    }, RESPONSE_DELAY)
});


http.listen(81, () => {
    console.log('Listening on *:81')
});