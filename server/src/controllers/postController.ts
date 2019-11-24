import { Request, Response } from 'express';
import { BasePost, RecordPost } from '../shared/types/Post';
import { FieldPacket, OkPacket } from 'mysql';
import db from '../config/db';
import { DBPost } from '../types/post';
import { PostRequest } from '../types/rewrited/express';

type PostControllerType = {
    getList: () => {};
};

export const PostController = {
    addItem: async (
        req: PostRequest<BasePost>,
        res: Response
    ): Promise<void> => {
        const { title, body } = req.body;
        try {
            const [row] = await db.execute<OkPacket>(
                'INSERT INTO posts (title, body)' +
                    `VALUES ('${title}', '${body}')`
            );
            res.send({
                isOk: true,
                id: row.insertId,
            });
        } catch (error) {
            res.status(400);
            res.send({
                isOk: false,
                error,
            });
        }
    },
    getList: async (req: Request, res: Response): Promise<void> => {
        try {
            const [list]: [RecordPost[], FieldPacket[]] = await db.execute<
                DBPost[]
            >(
                `SELECT * FROM posts
                  ORDER BY id DESC`
            );

            res.send({
                isOk: true,
                list: list,
            });
        } catch (error) {
            res.send({
                isOk: false,
            });
        }
    },
    getItem: async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
        try {
            const [rows]: [RecordPost[], FieldPacket[]] = await db.execute<
                DBPost[]
            >('SELECT * FROM posts' + `WHERE id = ${id}`);

            const [post] = rows;

            res.send({
                isOk: true,
                post,
            });
        } catch (error) {
            res.status(400);
            res.send({
                isOk: false,
                error,
            });
        }
    },
    deleteItem: async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> => {
        const id = req.params.id;
        try {
            const [row] = await db.execute<OkPacket>(
                `DELETE FROM posts WHERE id = ${id}`
            );
            res.send({
                isOk: true,
            });
        } catch (error) {
            res.status(400);
            res.send({
                isOk: false,
                error,
            });
        }
    },
};
