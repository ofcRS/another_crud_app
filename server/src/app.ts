import express from 'express';
import PinoHttp from 'pino-http';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ControllerImplementation } from 'controllers/controller';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { Logger } from 'types/services/logger';

import { PostResolver, UserResolver } from './resolvers';

type Conf = {
    port: number;
    logger: Logger;
    httpLogger: PinoHttp.HttpLogger;
    controllers: ControllerImplementation[];
};

export class App {
    private readonly app: express.Application;
    private readonly port: number;
    private readonly logger: Logger;

    // временно оставлю прямой импорт из пакета, потом напишу болле общий интерфейс для http логгера
    private readonly httpLogger: PinoHttp.HttpLogger;

    constructor({ httpLogger, logger, port, controllers }: Conf) {
        this.app = express();
        this.port = port;
        this.logger = logger;
        this.httpLogger = httpLogger;

        App.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeApi(controllers);
        this.initializeApollo();
    }

    private static getClientUrl = () =>
        `http://${process.env.HOST}:${process.env.CLIENT_PORT}`;

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            res.set({
                'Access-Control-Allow-Origin': App.getClientUrl(),
                'Access-Control-Allow-Methods': '*, DELETE',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Credentials': true,
            });
            next();
        });
        this.app.use(this.httpLogger);
    }

    private initializeApi(controllers: ControllerImplementation[]) {
        controllers.forEach(controller => {
            this.app.use('/api', controller.router);
        });
    }

    private static async initializeDatabase() {
        try {
            const { name } = await createConnection();
            console.log('was succesfully connected to "' + name + '"');
        } catch (error) {
            console.log(
                'error occured while trying to connect db: ' + error?.message
            );
        }
    }

    private async initializeApollo() {
        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [UserResolver, PostResolver],
            }),
            context: ({ req, res }) => ({
                req,
                res,
            }),
        });

        apolloServer.applyMiddleware({
            app: this.app,
            cors: {
                credentials: true,
                origin: App.getClientUrl(),
            },
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('started on: ', this.port);
        });
    }
}
