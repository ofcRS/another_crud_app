import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from 'entities';
import { AUTH_COOKIES_PATH } from '../config/network';

export const createAccessToken = (user: User) =>
    sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '10s',
        }
    );

export const createRefreshToken = (user: User) =>
    sign(
        {
            id: user.id,
            version: user.tokenVersion,
        },
        process.env.REFRESH_JWT_SECRET!,
        {
            expiresIn: '365d',
        }
    );

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('jid', token, {
        httpOnly: true,
        path: AUTH_COOKIES_PATH,
    });
};
