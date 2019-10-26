const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/',(req, res, next) => {
    res.send('<h1>Hello from Express</h1>');
    next();
});

const server = http.createServer(app);

server.listen(3001);

