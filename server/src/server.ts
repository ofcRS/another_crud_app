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
import { Post } from 'entities';
import { PostMetaData } from './entities/postmetadata';

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
            entities: [Post, PostMetaData],
            synchronize: true,
            logging: false,
        });

        const postRepository = connection.getRepository(Post);
        const postmetadataRepository = connection.getRepository(PostMetaData);

        const every = await postRepository.find();

        const postMetadata = new PostMetaData();

        postMetadata.publicationDate = new Date();
        postMetadata.anotherColumn = 'something else';
        postMetadata.post = every[1];

        await postmetadataRepository.save(postMetadata);

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

        const server = http.createServer(app);

        server.listen(PORT, () => {
            logger.info(`server start on ${PORT}`);
        });
    } catch (error) {
        logger.error(error);
    }
})();
