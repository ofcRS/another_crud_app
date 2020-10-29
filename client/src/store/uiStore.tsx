import { types } from 'mobx-state-tree';

export const UIStoreModel = types
    .model({
        registryModalOpen: types.boolean,
        sidebarOpen: types.boolean,
    })
    .actions(self => ({
        toggleRegistryModal(value: boolean) {
            self.registryModalOpen = value;
        },
        toggleSidebar(value?: boolean) {
            self.sidebarOpen = value !== undefined ? value : !self.sidebarOpen;
        },
    }));
