import React from 'react';
import { useLocalStore } from 'mobx-react';

export const createStore = <Store extends Record<string, unknown>>(
    createStore: () => Store
): [React.FC, () => Store] => {
    const storeContext = React.createContext<null | Store>(null);

    const useStore = () => {
        const store = React.useContext(storeContext);
        if (!store) {
            throw new Error('useStore must be within a StoreProvider');
        }
        return store;
    };

    const StoreProvider: React.FC = ({ children }) => {
        const store = useLocalStore(createStore);
        return (
            <storeContext.Provider value={store}>
                {children}
            </storeContext.Provider>
        );
    };

    return [StoreProvider, useStore];
};
