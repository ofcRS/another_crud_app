import { Request, Response } from 'express';

import { PostRequest } from 'types/rewrited/express';

type BaseController<Req> = (req: Req, res: Response) => Promise<void>;

export type GetController<Params extends {} = {}> = BaseController<
    Request<Params>
>;

export type PostController<Req = undefined> = BaseController<PostRequest<Req>>;

export type DeleteController<Params extends {} = {}> = BaseController<
    Request<Params>
>;
