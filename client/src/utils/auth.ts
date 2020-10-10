import decode from 'jwt-decode';
import { request } from './request';
import { User } from 'graphql/generated';

type InMemoryToken = {
    accessToken: string | undefined;
};

export const inMemoryToken: InMemoryToken = {
    accessToken: undefined,
};

export const refreshToken = async () => {
    const { accessToken } = await request<{ accessToken: string }>({
        url: '/auth/refresh_token',
    });
    console.log(accessToken);
    inMemoryToken.accessToken = accessToken;
};

export const getCurrentUser = async (): Promise<User | null> => {
    if (inMemoryToken.accessToken) {
        const { user } = await request<{ user: User }>({
            url: '/auth/current',
            headers: {
                authorization: inMemoryToken.accessToken,
            },
        });
        return user;
    }
    return null;
};

export const isAccessTokenValidOrUndefined = () => {
    if (!inMemoryToken.accessToken) return true;
    try {
        const { exp } = decode(inMemoryToken.accessToken);
        const isTokenExpired = Date.now() > exp * 1000;
        return !isTokenExpired;
    } catch (error) {
        return false;
    }
};
