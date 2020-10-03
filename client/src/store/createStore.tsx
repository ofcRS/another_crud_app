import React from 'react';
import { IModelType, Instance } from 'mobx-state-tree';

export const createStore = <Store extends IModelType<any, any>>(
    store: any
): [React.FC, () => Instance<Store>, Instance<Store>] => {
    const storeContext = React.createContext<null | Instance<Store>>(null);

    const useStore = () => {
        const store = React.useContext(storeContext);
        if (!store) {
            throw new Error('useStore must be within a StoreProvider');
        }
        return store;
    };

    const StoreProvider: React.FC = ({ children }) => (
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
    );

    // возвращаю store отдельно для мока при тестировании
    return [StoreProvider, useStore, store];
};
