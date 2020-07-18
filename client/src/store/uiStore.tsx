import { createStore } from './createStore';

export type UIStore = {
    registryModalOpen: boolean;
    toggleRegistryModal: (value: boolean) => void;
};

export const [UIStoreProvider, useUIStore] = createStore<UIStore>(() => ({
    registryModalOpen: false,
    toggleRegistryModal(value: boolean) {
        this.registryModalOpen = value;
    },
}));
