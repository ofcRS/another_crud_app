const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', (req, res, next) => {
    res.send({
        a: 23,
        c: 35
    });
});

const server = http.createServer(app);

server.listen(3001, () => {
    console.log('server start on 3001');
});

