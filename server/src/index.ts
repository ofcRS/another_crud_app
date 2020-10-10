import dotenv from 'dotenv';
import path from 'path';

import { httpLogger, logger } from './services/logger';

import { App } from './app';
import { AuthController } from './controllers/authController';

dotenv.config({
    path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT!;

const app = new App({
    httpLogger: httpLogger,
    logger: logger,
    port: Number(PORT),
    controllers: [new AuthController()],
});
app.listen();
