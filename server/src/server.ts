import http from 'http';
import { Express } from 'express';

import { createConnection } from 'typeorm';

import logger from 'services/logger';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { UserResolver, PostResolver } from './resolvers';

import 'reflect-metadata';

export class Server {
    port: string;
    app: Express;

    constructor({ port, app }: { port: string; app: Express }) {
        this.port = port;
        this.app = app;
    }

    start = async (): Promise<void> => {
        try {
            await createConnection();

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

            const server = http.createServer(this.app);
            server.listen(this.port, () => {
                logger.info(`server start on ${this.port}`);
            });
        } catch ({ message }) {
            logger.error(message);
        }
    };
}
