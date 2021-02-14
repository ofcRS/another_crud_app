import { Response, Request } from 'express';

export type ContextPayload = {
    id: number;
    version: number;
};

export type Context<UserAuthorized extends boolean = false> = {
    res: Response;
    req: Request;
    payload: UserAuthorized extends true
        ? ContextPayload
        : ContextPayload | undefined;
};
