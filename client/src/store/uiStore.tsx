import { types, Instance } from 'mobx-state-tree';
import { createStore } from './createStore';
import { Store, StoreModel } from './store';

export type UIStore = {
    registryModalOpen: boolean;

    store: Store | null;
};

const UIStoreModel = types
    .model({
        registryModalOpen: types.boolean,
        store: types.maybeNull(StoreModel),
    })
    .actions(self => ({
        initUIStore: (store: Instance<typeof StoreModel>) => {
            self.store = store;
        },
        toggleRegistryModal(value: boolean) {
            self.registryModalOpen = value;
        },
    }));

export const [UIStoreProvider, useUIStore] = createStore<typeof UIStoreModel>(
    UIStoreModel.create({
        registryModalOpen: false,
        store: null,
    })
);
