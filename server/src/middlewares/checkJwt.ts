import * as jwt from 'jsonwebtoken';

import { MiddlewareFn } from 'type-graphql';
import { Context, ContextPayload } from '../types/services/context';

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
    try {
        const secret = process.env.JWT_SECRET!;
        const token = context.req.headers.authorization;

        if (!token) {
            throw 'there\'s not token in headers';
        }

        const payload = jwt.verify(token, secret) as ContextPayload;
        context.payload = payload;
    } catch (error) {
        throw new Error('not authenticated');
    }
    return next();
};
