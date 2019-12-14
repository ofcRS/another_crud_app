import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const checkJwt = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | undefined => {
    try {
        const secret = process.env.JWT_SECRET!;
        const token = req.cookies.token;

        jwt.verify(token, secret);
    } catch (error) {
        return res.status(401).send({ message: error.toString() });
    }
    next();
};

export default (...handler) => [checkJwt, ...handler];
