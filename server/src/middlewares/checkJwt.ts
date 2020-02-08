import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

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
