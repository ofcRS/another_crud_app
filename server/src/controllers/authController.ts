import { sign, Secret, verify } from 'jsonwebtoken';

import { getManager } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { PostController } from 'types/utility/controller';

import { User } from 'entities';
import { ContextPayload } from 'types/services/context';

import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from '../services/auth';
import logger from 'services/logger';

type AuthController = {
    login: PostController<User>;
    signUp: PostController<User>;
    refreshToken: PostController;
};

export const authController: AuthController = {
    login: async (req, res) => {
        try {
            const { password, email } = req.body;

            const userRepository = await getManager().getRepository(User);

            const userWithRequestedEmail = await userRepository.findOne({
                where: {
                    email,
                },
            });

            if (!userWithRequestedEmail) {
                return res.status(404).send({
                    error: 'User not found',
                    isOk: false,
                });
            }

            const isPasswordsValid = await compare(
                password,
                userWithRequestedEmail.password
            );

            if (isPasswordsValid) {
                const secret: Secret = process.env.JWT_SECRET!;
                const token = sign(
                    {
                        email,
                    },
                    secret,
                    {
                        expiresIn: 3600,
                    }
                );

                return res.status(200).send({
                    token,
                    isOk: true,
                });
            } else {
                return res.status(401).send({
                    isOk: false,
                    error: 'Password is incorrect',
                });
            }
        } catch (error) {
            res.status(404);
            res.send({
                isOk: false,
                error,
            });
        }
    },
    signUp: async (req, res) => {
        try {
            const { email, password } = req.body;

            const userRepository = getManager().getRepository(User);

            const userWithSameEmail = await userRepository.findOne({
                where: {
                    email,
                },
            });

            if (userWithSameEmail) {
                throw 'User already exist';
            }

            const hashedPassword = await hash(password, 10);

            const user = new User();
            user.email = email;
            user.password = hashedPassword;

            await userRepository.save(user);

            res.send({
                ok: 'true',
            });
        } catch (error) {
            res.status(400);
            res.send({
                isOk: false,
                error,
            });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const token = req.cookies.jid;
            if (!token) {
                throw 'no tokens was provided';
            }
            let payload: ContextPayload | null = null;
            payload = verify(
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
        } catch ({ message }) {
            logger.error(message);
            res.status(400).send({ ok: false });
        }
    },
};
