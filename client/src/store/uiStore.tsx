import { types } from 'mobx-state-tree';
import { createStore } from './createStore';
// import { createStore } from './createStore';
// import { StoreModel } from './store';

export type UIStore = {
    registryModalOpen: boolean;
};

export const UIStoreModel = types
    .model({
        registryModalOpen: types.boolean,
    })
    .actions(self => ({
        toggleRegistryModal(value: boolean) {
            self.registryModalOpen = value;
        },
    }));

export const [UIStoreProvider, useUIStore] = createStore<typeof UIStoreModel>(
    UIStoreModel.create({
        registryModalOpen: false,
    })
);
