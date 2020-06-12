import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { MiddlewareFn } from 'type-graphql';
import { Context, ContextPayload } from '../types/services/context';

const checkJwt = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | undefined => {
    try {
        const secret = process.env.JWT_SECRET!;
        const token = req.headers.authorization;

        if (typeof token === 'string') {
            jwt.verify(token, secret);
        } else {
            return res.status(401).send({ error: 'you need to auth' });
        }
    } catch (error) {
        return res.status(401).send({ error: error.toString() });
    }
    next();
};

export default (...handler) => [checkJwt, ...handler];

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
