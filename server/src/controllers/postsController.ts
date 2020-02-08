import { FieldPacket, OkPacket } from 'mysql';
import { getManager } from 'typeorm';

import db from 'config/db';

import { DBPost } from 'types/post';
import {
    DeleteController,
    GetController,
    PostController,
} from 'types/utility/controller';
import { RecordPost } from 'shared/types/Post';
import { Post } from 'entities';

type PostControllerType = {
    getList: GetController;
    addItem: PostController<Post>;
    getItem: GetController<{ id: string }>;
    deleteItem: DeleteController<{ id: string }>;
};

export const postsController: PostControllerType = {
    addItem: async (req, res) => {
        const { title, body } = req.body;

        try {
            const postRepository = getManager().getRepository(Post);

            const post = new Post();
            post.title = title;
            post.body = body;

            await postRepository.save(post);

            res.send({
                isOk: true,
                id: post.id,
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
            const postRepository = getManager().getRepository(Post);

            const list = await postRepository.find({
                order: { id: 'DESC' },
            });

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
            const postRepository = getManager().getRepository(Post);

            await postRepository.delete(id);

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
