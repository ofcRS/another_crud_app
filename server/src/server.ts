import http from 'http';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import logger from 'services/logger';

import { router as postRoutes } from 'routes/post';

dotenv.config({
    path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
    });
    next();
});

app.use(postRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`server start on ${PORT}`);
});
