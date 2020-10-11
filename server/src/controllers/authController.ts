import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

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

// апи с которым неудобно работать через graphql
export class AuthController extends ControllerImplementation {
    readonly refreshTokenCookieName = 'jid';
    readonly accessTokenHeader = 'authorization';

    constructor() {
        super('/auth');
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.getApiPath('/refresh_token'), this.refreshToken);
        this.router.get(this.getApiPath('/current'), this.getCurrentUser);
        this.router.get(this.getApiPath('/logout'), this.logout);
    }

    // получить текущего пользователя из рефреш или акксесс токена
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
