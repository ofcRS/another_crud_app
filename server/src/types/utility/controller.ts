import { Request, Response } from 'express';

import { PostRequest } from 'types/rewrited/express';
import { ParamsDictionary } from 'express-serve-static-core';

type BaseController<Req> = (
    req: Req,
    res: Response
) => Promise<void | Response>;

export type GetController<
    Params extends ParamsDictionary = {}
> = BaseController<Request<Params>>;

export type PostController<Req = undefined> = BaseController<PostRequest<Req>>;

export type DeleteController<
    Params extends ParamsDictionary = {}
> = BaseController<Request<Params>>;
