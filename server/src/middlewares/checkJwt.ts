import * as jwt from 'jsonwebtoken';

import { MiddlewareFn } from 'type-graphql';
import { Context, ContextPayload } from '../types/services/context';

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
    try {
        const secret = process.env.JWT_SECRET!;
        const token = context.req.headers.authorization;

        if (!token) {
            throw new Error("there's no token in headers");
        }

        const payload = jwt.verify(token, secret) as ContextPayload;
        context.payload = payload;
    } catch (error) {
        throw new Error(error.message);
    }
    return next();
};
