import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import { router as postRoutes } from './routes/post';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(postRoutes);

const server = http.createServer(app);

server.listen(3001, () => {
    console.log('server start on 3001');
});

