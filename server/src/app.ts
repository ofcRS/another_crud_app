import express from 'express';
import PinoHttp from 'pino-http';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routes from './routes';

import { Logger } from 'types/services/logger';

import { PostResolver, UserResolver } from './resolvers';

type Conf = {
    port: number;
    logger: Logger;
    httpLogger: PinoHttp.HttpLogger;
};

export class App {
    private readonly app: express.Application;
    private readonly port: number;
    private readonly logger: Logger;

    // временно оставлю прямой импорт из пакета, потом напишу болле общий интерфейс для http логгера
    private readonly httpLogger: PinoHttp.HttpLogger;

    constructor({ httpLogger, logger, port }: Conf) {
        this.app = express();
        this.port = port;
        this.logger = logger;
        this.httpLogger = httpLogger;

        App.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeApi(routes);
        this.initializeApollo();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            res.set({
                'Access-Control-Allow-Origin': 'http://192.168.1.170:3000',
                'Access-Control-Allow-Methods': '*, DELETE',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Credentials': true,
            });
            next();
        });
        this.app.use(this.httpLogger);
    }

    private initializeApi(routes) {
        this.app.use('/api', routes);
    }

    private static initializeDatabase() {
        return createConnection();
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
                origin: 'http://192.168.1.170:3000',
            },
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`app started on port: ${this.port}`);
        });
    }
}
