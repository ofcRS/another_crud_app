import fs from 'fs';
import express, { Response } from 'express';

import { Request } from 'types/rewrited/express';
import { Post } from 'shared/types/Post';

export const router = express.Router();

router.post('/post', (req: Request<Post>, res: Response) => {
    const { body, title } = req.body;

    fs.appendFile(`storage/posts/${title}.txt`, body, (err) => {
        console.log(err)
    });
    res.send({
        test: true
    });
});
