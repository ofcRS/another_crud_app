import { FieldPacket, OkPacket } from 'mysql';

import db from 'config/db';

import { DBPost } from 'types/post';
import {
    DeleteController,
    GetController,
    PostController,
} from 'types/utility/controller';
import { BasePost, RecordPost } from 'shared/types/Post';

type PostControllerType = {
    getList: GetController;
    addItem: PostController<BasePost>;
    getItem: GetController<{ id: string }>;
    deleteItem: DeleteController<{ id: string }>;
};

export const postsController: PostControllerType = {
    addItem: async (req, res) => {
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
    getList: async (req, res) => {
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
    getItem: async (req, res) => {
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
    deleteItem: async (req, res) => {
        const id = req.params.id;
        try {
            await db.execute<OkPacket>(`DELETE FROM posts WHERE id = ${id}`);
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
