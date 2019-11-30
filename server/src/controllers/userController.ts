import db from 'config/db';

import { PostController } from 'types/utility/controller';
import { RecordUser, User } from 'shared/types/User';
import { WithRowDataPacket } from 'types/services/db';

type UserController = {
    login: PostController<User>;
};

export const userController: UserController = {
    login: async (req, res) => {
        try {
            const { password, email } = req.body;
            const [rows] = await db.execute<WithRowDataPacket<RecordUser>[]>(`
            SELECT * FROM users
            WHERE password = '${password}' AND email = '${email}'
        `);
            if (rows.length !== 0) {
                res.send({
                    isOk: true,
                    rows,
                });
            } else {
                throw 'Пользователь не найден';
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
