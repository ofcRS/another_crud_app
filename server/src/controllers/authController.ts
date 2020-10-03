import { verify } from 'jsonwebtoken';

import { PostController } from 'types/utility/controller';

import { User } from 'entities';
import { ContextPayload } from 'types/services/context';

import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from 'services/auth';

import { logger } from 'services/logger';
import { AUTH_COOKIES_PATH } from '../config/network';

type AuthController = {
    refreshToken: PostController;
    getCurrentUser: PostController;
    logout: PostController;
};

export const authController: AuthController = {
    refreshToken: async (req, res) => {
        try {
            const token = req.cookies.jid;
            if (!token) {
                throw 'no tokens was provided';
            }
            const payload: ContextPayload | null = verify(
                token,
                process.env.REFRESH_JWT_SECRET!
            ) as ContextPayload;

            /* рефреш токен валидный и мы можем отправить access токен клиенту */
            const user = await User.findOne({ id: payload.id });
            if (!user) {
                throw new Error('user not found');
            }
            if (user.tokenVersion !== payload.version) {
                throw new Error("versions of tokens aren't equal");
            }
            sendRefreshToken(res, createRefreshToken(user));
            return res.send({
                ok: true,
                accessToken: createAccessToken(user),
            });
        } catch (error) {
            logger.error(error);
            res.status(400).send({ ok: false, error });
        }
    },
    getCurrentUser: async (req, res) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                isOk: false,
                message: 'no tokens was provided',
            });
        }

        const contextPayload = verify(
            token,
            process.env.JWT_SECRET!
        ) as ContextPayload;

        const user = await User.findOne({ id: contextPayload.id });

        if (!user) {
            return res.status(404).send({
                isOk: false,
                message: 'user not found',
            });
        }

        return res.send({
            user,
        });
    },
    logout: async (req, res) => {
        res.clearCookie('jid', {
            path: AUTH_COOKIES_PATH,
        }).send({
            isOk: true,
        });
    },
};
