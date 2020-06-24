import React from 'react';
import { useLocalStore } from 'mobx-react';

export type UIStore = {
    registryModalOpen: boolean;
    toggleRegistryModal: (value: boolean) => void;
};

export const createStore = (): UIStore => ({
    registryModalOpen: false,
    toggleRegistryModal(value: boolean) {
        this.registryModalOpen = value;
    },
});

const storeContext = React.createContext<null | UIStore>(null);

export const UIStoreProvider: React.FC = ({ children }) => {
    const store = useLocalStore(createStore);
    return (
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
    );
};

export const useUIStore = (): UIStore => {
    const store = React.useContext(storeContext);
    if (!store) {
        throw new Error('useStore must be within a StoreProvider');
    }
    return store;
};
