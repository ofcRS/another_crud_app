import { createStore } from './createStore';

import { GraphQlResponse } from 'typings/network';
import { LoginMutation, User } from 'graphql/generated';

import { parseGraphQLError } from 'utils/validators';
import { inMemoryToken, refreshToken } from 'utils/auth';

export type Store = {
    user: User | null;

    initializationInProgress: boolean;
    initApp: () => void;

    login: (
        loginFn: () => GraphQlResponse<LoginMutation | null>
    ) => Promise<void>;
    loginError: string | null;
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

    login: async function(loginFn) {
        try {
            const { data } = await loginFn();
            /*
             * Кастую через not-null assertion, потому что data будет во всех случях, кроме того,
             * когда запрос вернет ошибку(она ловится ниже).
             * */
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.user = data!.login.user;
            inMemoryToken.accessToken = data?.login.accessToken;
        } catch (error) {
            this.loginError = parseGraphQLError(error);
        }
    },
    loginError: null,
}));
