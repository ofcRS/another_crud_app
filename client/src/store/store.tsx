import React from 'react';
import { useLocalStore } from 'mobx-react';
import {
    LoginMutationFn,
    LoginMutationVariables,
    User,
} from 'graphql/generated/graphql';

export type Store = {
    user: User | null;
    login: (values: LoginMutationVariables, login: LoginMutationFn) => void;
};

export const createStore = (): Store => ({
    user: null,
    login: async function({ password, email }, login) {
        const { data } = await login({
            variables: {
                email,
                password,
            },
        });
        if (data?.login.user) {
            this.user = data?.login.user;
        }
    },
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
