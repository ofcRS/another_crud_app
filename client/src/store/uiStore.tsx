import { createStore } from './createStore';
import { Store } from './store';

export type UIStore = {
    registryModalOpen: boolean;
    toggleRegistryModal: (value: boolean) => void;

    store: Store | null;
    initUIStore: (store: Store) => void;
};

export const [UIStoreProvider, useUIStore] = createStore<UIStore>(() => ({
    initUIStore(store) {
        this.store = store;
    },
    store: null,

    registryModalOpen: false,
    toggleRegistryModal(value: boolean) {
        this.registryModalOpen = value;
    },
}));
