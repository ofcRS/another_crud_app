import { Response, Request } from 'express';

export type ContextPayload = {
    id: number;
};

export type Context = {
    res: Response;
    req: Request;
    payload?: ContextPayload;
};
