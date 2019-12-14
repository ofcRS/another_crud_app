import http from 'http';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import logger from 'services/logger';

import routes from './routes';
import { Post, User } from 'entities';
import { PostMetaData } from './entities/postmetadata';
import { Tag } from 'entities/tag';

dotenv.config({
    path: path.join(__dirname, '../.env'),
});

const PORT = process.env.PORT;

(async () => {
    try {
        const connection = await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1234',
            database: 'node_learning',
            entities: [__dirname + '/entities/*.ts'],
            synchronize: true,
            logging: false,
        });

        const app = express();

        app.use(bodyParser.json());

        app.use(cookieParser());

        app.use((req, res, next) => {
            res.set({
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': '*, DELETE',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Credentials': true,
            });
            next();
        });

        app.use(routes);

        const postRepository = connection.getRepository(Post);
        const post = new Post();
        post.title = new Date().toString();
        post.body = Math.random().toString(3);

        const tag1 = new Tag();
        tag1.name = 'tag1';

        const tag2 = new Tag();
        tag2.name = 'tag2';

        post.tags = [tag1, tag2];

        const all = await postRepository.find({
            relations: ['tags', 'user'],
        });

        console.log(all);

        const server = http.createServer(app);

        server.listen(PORT, () => {
            logger.info(`server start on ${PORT}`);
        });
    } catch (error) {
        logger.error(error);
    }
})();
