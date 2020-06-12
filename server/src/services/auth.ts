import { Secret, sign } from 'jsonwebtoken';
import { User } from 'entities';

export const createAccessToken = (user: User) =>
    sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: 3600,
        }
    );

export const createRefreshToken = (user: User) =>
    sign(
        {
            id: user.id,
        },
        process.env.REFRESH_JWT_SECRET!,
        {
            expiresIn: '365d',
        }
    );
