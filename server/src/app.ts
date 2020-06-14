import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import { Server } from './server';

import routes from './routes';
import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config({
    path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT!;

class App {
    start = (): void => {
        const app = express();
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use((req, res, next) => {
            res.set({
                'Access-Control-Allow-Origin': 'http://192.168.1.170:3000',
                'Access-Control-Allow-Methods': '*, DELETE',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Credentials': true,
            });
            next();
        });
        app.use('/api', routes);

        const server = new Server({ app, port: PORT });
        server.start();
    };
}

const app = new App();
app.start();
