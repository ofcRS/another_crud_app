import React from 'react';
import { useLocalStore } from 'mobx-react';
import { LoginMutation, LoginResponse, User } from 'graphql/generated/graphql';
import { CaughtGraphQLError, GraphQlResponse } from 'typings/network';
import { parseGraphQLError } from 'utils/validators';

export type Store = {
    user: User | null;

    login: (loginFn: () => GraphQlResponse<LoginMutation>) => Promise<void>;
    loginError: string | null;
};

export const createStore = (): Store => ({
    user: null,
    login: async function(loginFn) {
        try {
            const { data } = await loginFn();
            /*
             * Кастую через not-null assertion, потому что data будет во всех случях, кроме того,
             * когда запрос вернет ошибку(она ловится ниже).
             * */
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.user = data!.login.user;
        } catch (error) {
            this.loginError = parseGraphQLError(error);
        }
    },
    loginError: null,
});

const storeContext = React.createContext<null | Store>(null);

export const StoreProvider: React.FC = ({ children }) => {
    const store = useLocalStore(createStore);
    return (
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
    );
};

export const useStore = () => {
    const store = React.useContext(storeContext);
    if (!store) {
        throw new Error('useStore must be within a StoreProvider');
    }
    return store;
};
