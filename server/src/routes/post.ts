import express, { Request, Response } from 'express';
import { FieldPacket, OkPacket } from 'mysql2';

import { PostRequest } from 'types/rewrited/express';
import { DBPost } from 'types/post';
import { BasePost, RecordPost } from 'shared/types/Post';

import db from 'utils/db';

export const router = express.Router();

router.post('/posts', (req: PostRequest<BasePost>, res: Response) => {
    const {title, body} = req.body;
    db.execute<OkPacket>('INSERT INTO `node-learning`.`posts` (`title`, `body`)' + `VALUES ('${title}', '${body}')`)
        .then((result) => {
            const [rows] = result;
            res.send({
                isOk: true,
                id: rows.insertId
            });
        });
});

router.get('/posts', async (req: Request, res: Response) => {
    try {
        const [list]: [RecordPost[], FieldPacket[]] = await db.execute<DBPost[]>('SELECT * FROM `posts`');

        res.send({
            isOk: true,
            list: list
        })
    } catch (e) {
        res.send({
            isOk: false
        })
    }
});

router.get('/posts/:id', (async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    try {
        const [rows]: [RecordPost[], FieldPacket[]] = await db.execute<DBPost[]>('SELECT * FROM `node-learning`.`posts`' +
            `WHERE id = ${id}`);

        const [post] = rows;

        res.send({
            isOk: true,
            post
        });
    } catch (error) {
        res.send({
            isOk: false,
            error
        });
    }
}));
