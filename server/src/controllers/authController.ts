import { verify } from 'jsonwebtoken';

import { PostController } from 'types/utility/controller';

import { User } from 'entities';
import { ContextPayload } from 'types/services/context';

import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from 'services/auth';

import logger from 'services/logger';

type AuthController = {
    refreshToken: PostController;
    getCurrentUser: PostController;
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
                ifOk: false,
                message: 'no tokens was provided',
            });
        }
        const context = verify(
            token,
            process.env.JWT_SECRET!
        ) as ContextPayload;

        const user = await User.findOne({ id: context.id });

        return res.send({
            user,
        });
    },
};
