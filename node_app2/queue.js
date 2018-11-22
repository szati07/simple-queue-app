const express = require('express')
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.use(cors());

const RESPONSE_DELAY = 5000;

app.get('/queue-app', (req, res) => {
    setTimeout(() => {
        res.status(200).send('Request Accepted');
    }, RESPONSE_DELAY)
});


http.listen(81, () => {
    console.log('Listening on *:81')
});