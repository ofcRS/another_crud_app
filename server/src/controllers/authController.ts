import { verify } from 'jsonwebtoken';
import { Router, Request, Response } from 'express';

import { User } from 'entities';
import { ContextPayload } from 'types/services/context';

import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from 'services/auth';

import { AUTH_COOKIES_PATH } from '../config/network';
import { ControllerImplementation } from './controller';
import { ApiHandler } from 'utils/ApiHandler';

type CurrentUser = {
    user: User | null;
    error: string | null;
};

export class AuthController extends ControllerImplementation {
    path = '/auth';
    router = Router();
    readonly refreshTokenCookieName = 'jid';
    readonly accessTokenHeader = 'authorization';

    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.getApiPath('/refresh_token'), this.refreshToken);
        this.router.get(this.getApiPath('/current'), this.getCurrentUser);
        this.router.get(this.getApiPath('/logout'), this.logout);
    }

    private static async getCurrentUser(
        token: string | null,
        secret: string
    ): Promise<CurrentUser> {
        const result: CurrentUser = {
            error: null,
            user: null,
        };

        if (!token) {
            result.error = 'No token was provided';
            return result;
        }
        const payload: ContextPayload | null = verify(
            token,
            secret
        ) as ContextPayload;

        const user = await User.findOne({ id: payload.id });

        if (!user) {
            result.error = "User wasn't fount";
            return result;
        }

        if (user.tokenVersion !== payload.version) {
            result.error = 'Tokens versions are different';
            return result;
        }

        result.user = user;
        return result;
    }

    private refreshToken = async (req: Request, res: Response) => {
        const currentUser = await AuthController.getCurrentUser(
            this.getRefreshToken(req),
            process.env.REFRESH_JWT_SECRET!
        );
        if (!currentUser.user) {
            return ApiHandler.sendError(res, {
                message: currentUser.error,
                status: 401,
            });
        }
        sendRefreshToken(res, createRefreshToken(currentUser.user));
        ApiHandler.sendSuccessResponse(res, {
            accessToken: createAccessToken(currentUser.user),
        });
    };

    private getCurrentUser = async (req: Request, res: Response) => {
        const currentUser = await AuthController.getCurrentUser(
            this.getAccessToken(req),
            process.env.JWT_SECRET!
        );
        if (!currentUser.user) {
            return ApiHandler.sendError(res, {
                status: 401,
                message: currentUser.error,
            });
        }
        ApiHandler.sendSuccessResponse(res, {
            user: currentUser.user,
        });
    };

    private logout = async (req: Request, res: Response) => {
        res.clearCookie('jid', {
            path: AUTH_COOKIES_PATH,
        });
        ApiHandler.sendSuccessResponse(res, null);
    };

    private getRefreshToken(req: Request): string | null {
        return req.cookies[this.refreshTokenCookieName] || null;
    }
    private getAccessToken(req: Request): string | null {
        return req.headers[this.accessTokenHeader] || null;
    }
}

// export const authController = {
//     refreshToken: async (req, res) => {
//         try {
//             const token = req.cookies.jid;
//             if (!token) {
//                 throw 'no tokens was provided';
//             }
//             const payload: ContextPayload | null = verify(
//                 token,
//                 process.env.REFRESH_JWT_SECRET!
//             ) as ContextPayload;
//
//             /* рефреш токен валидный и мы можем отправить access токен клиенту */
//             const user = await User.findOne({ id: payload.id });
//             if (!user) {
//                 throw new Error('user not found');
//             }
//             if (user.tokenVersion !== payload.version) {
//                 throw new Error("versions of tokens aren't equal");
//             }
//             sendRefreshToken(res, createRefreshToken(user));
//             return res.send({
//                 ok: true,
//                 accessToken: createAccessToken(user),
//             });
//         } catch (error) {
//             logger.error(error);
//             res.status(400).send({ ok: false, error });
//         }
//     },
//     getCurrentUser: async (req, res) => {
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).send({
//                 isOk: false,
//                 message: 'no tokens was provided',
//             });
//         }
//
//         const contextPayload = verify(
//             token,
//             process.env.JWT_SECRET!
//         ) as ContextPayload;
//
//         const user = await User.findOne({ id: contextPayload.id });
//
//         if (!user) {
//             return res.status(404).send({
//                 isOk: false,
//                 message: 'user not found',
//             });
//         }
//
//         return res.send({
//             user,
//         });
//     },
//     logout: async (req, res) => {
//         res.clearCookie('jid', {
//             path: AUTH_COOKIES_PATH,
//         }).send({
//             isOk: true,
//         });
//     },
// };
