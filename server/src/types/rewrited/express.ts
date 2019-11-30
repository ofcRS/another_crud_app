import { Request as ExpressRequest } from 'express';

export interface PostRequest<T> extends ExpressRequest {
    body: T;
}
