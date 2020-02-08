import { sign, Secret } from 'jsonwebtoken';
import db from 'config/db';
import { getManager } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { PostController } from 'types/utility/controller';
import { WithRowDataPacket } from 'types/services/db';
import { User } from 'entities';

type AuthController = {
    login: PostController<User>;
    signUp: PostController<User>;
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

            /*if (rows.length !== 0) {
                const { email } = rows[0];
                const secret: jwt.Secret = process.env.JWT_SECRET!;
                const token = jwt.sign(
                    {
                        email,
                    },
                    secret,
                    {
                        expiresIn: 3600,
                    }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                });

                res.send({
                    isOk: true,
                });
            } else {
                throw 'Неверный логин или пароль';
            }*/
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
};
