import dotenv from 'dotenv';
import path from 'path';

import { httpLogger, logger } from './services/logger';

import { App } from './app';

dotenv.config({
    path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT!;

const app = new App({
    httpLogger: httpLogger,
    logger: logger,
    port: Number(PORT),
});
app.listen();
