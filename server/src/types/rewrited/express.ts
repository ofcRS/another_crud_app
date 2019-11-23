import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

export interface PostRequest<T = undefined> extends ExpressRequest {
    body: T;
}
