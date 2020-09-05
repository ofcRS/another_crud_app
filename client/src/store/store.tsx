import { createStore } from './createStore';

import { LoginMutation, User } from 'graphql/generated';

import { inMemoryToken, refreshToken } from 'utils/auth';

export type Store = {
    user: User | null;

    initializationInProgress: boolean;
    initApp: () => void;

    login: (response: LoginMutation) => void;
};

export const [StoreProvider, useStore] = createStore<Store>(() => ({
    user: null,

    initApp: async function() {
        try {
            await refreshToken();
        } catch (error) {
        } finally {
            this.initializationInProgress = false;
        }
    },
    initializationInProgress: true,

    login(response) {
        if (response) {
            const {
                login: { user, accessToken },
            } = response;
            this.user = user;
            inMemoryToken.accessToken = accessToken;
        }
    },
}));
