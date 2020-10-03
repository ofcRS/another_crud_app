import { types } from 'mobx-state-tree';

export const UIStoreModel = types
    .model({
        registryModalOpen: types.boolean,
    })
    .actions(self => ({
        toggleRegistryModal(value: boolean) {
            self.registryModalOpen = value;
        },
    }));
