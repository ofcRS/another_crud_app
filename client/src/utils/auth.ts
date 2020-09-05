import decode from 'jwt-decode';
import { request } from './request';

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
    inMemoryToken.accessToken = accessToken;
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
