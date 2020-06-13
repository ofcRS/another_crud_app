import React from 'react';
import { useLocalStore } from 'mobx-react';
import { User } from 'graphql/generated/graphql';

export type Store = {
    user: User | null;
};

export const createStore = (): Store => ({
    user: null,
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
