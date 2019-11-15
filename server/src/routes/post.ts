import fs from 'fs';
import express, { Request, Response } from 'express';

import { PostRequest } from 'types/rewrited/express';
import { Post } from 'shared/types/Post';

export const router = express.Router();

function* idGenerator(): IterableIterator<number> {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const generateId = idGenerator();

const formatPost = ({title, body}: Post): string => `${title}\n${body}`;

router.post('/post', (req: PostRequest<Post>, res: Response) => {
    const post = req.body;

    fs.appendFile(`storage/posts/${generateId.next().value}.txt`, formatPost(post), () => {
    });
    res.send({
        test: true
    });
});

router.get('/post/:id', ((req: Request<{ id: string }>, res: Response) => {
    fs.readFile(`storage/posts/${req.params.id}.txt`, (err, data: Buffer) => {
        if (err) throw err;
        console.log(data.toString())
        res.send({isOk: true})
    })
}));
