import * as jwt from 'jsonwebtoken';
import db from 'config/db';

import { PostController } from 'types/utility/controller';
import { RecordUser, User } from 'shared/types/User';
import { WithRowDataPacket } from 'types/services/db';

type AuthController = {
    login: PostController<User>;
};

export const authController: AuthController = {
    login: async (req, res) => {
        try {
            const { password, email } = req.body;
            const [rows] = await db.execute<WithRowDataPacket<RecordUser>[]>(`
            SELECT * FROM users
            WHERE password = '${password}' AND email = '${email}'
        `);
            if (rows.length !== 0) {
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
            }
        } catch (error) {
            res.status(404);
            res.send({
                isOk: false,
                error,
            });
        }
    },
};
