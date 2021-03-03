import { httpLogger, logger } from './services/logger';

import { App } from './app';
import { AuthController } from './controllers/authController';

const app = new App({
    httpLogger: httpLogger,
    logger: logger,
    port: Number(process.env.PORT),
    controllers: [new AuthController()],
});
app.listen();
