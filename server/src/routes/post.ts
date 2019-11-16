import fs from 'fs';
import express, { Request, Response } from 'express';

import { PostRequest } from 'types/rewrited/express';
import { Post } from 'shared/types/Post';
import ErrnoException = NodeJS.ErrnoException;

export const router = express.Router();

const formatPost = ({title, body}: Post): string => `${title}\n${body}`;

router.post('/post', (req: PostRequest<Post>, res: Response) => {
    const post = req.body;

    fs.writeFile(`storage/posts/post.txt`, formatPost(post), (err: ErrnoException | null) => {
        if (err) {
            res.status(400);
            res.send({
                isOk: false,
                error: err
            });
        }
        res.send({
            isOk: true
        });
    });
});

router.get('/post/:id', (async (req: Request, res: Response) => {
    fs.readFile('storage/posts/post.txt', null, (err: ErrnoException | null, data: Buffer) => {
        if (err) {
            res.status(400);
            res.send({
                isOk: false,
                error: err
            });
        }
        const stringPost = data.toString();
        const divider = stringPost.indexOf('\n');
        const title = stringPost.slice(0, divider);
        const body = stringPost.slice(divider + 1);

        const post: Post = {
            title,
            body
        };

        res.send(post);
    });
}));
