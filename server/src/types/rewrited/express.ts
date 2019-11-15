import { Request as ExpressRequest } from 'express';

export interface PostRequest<T = undefined> extends ExpressRequest {
  body: T;
}