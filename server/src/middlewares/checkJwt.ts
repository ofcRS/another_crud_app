import { NextFunction, Request, Response } from 'express';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.cookies)
    } catch (error) {
        return res.status(401).send({ message: 'UNAUTHORIZED' });
    }
    next();
};
