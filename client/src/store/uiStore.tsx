import { types } from 'mobx-state-tree';

export const UIStoreModel = types
    .model({
        registryModalOpen: types.boolean,
        sidebarOpen: types.boolean,
    })
    .volatile<{ afterAuthCallback: (() => void) | null }>(() => ({
        afterAuthCallback: null,
    }))
    .actions(self => ({
        toggleRegistryModal(value: boolean, callback?: () => void) {
            self.registryModalOpen = value;
            if (value && callback) {
                // колбек будет вызван после успешной авторизации
                self.afterAuthCallback = callback;
            } else {
                self.afterAuthCallback = null;
            }
        },
        toggleSidebar(value?: boolean) {
            self.sidebarOpen = value !== undefined ? value : !self.sidebarOpen;
        },
    }));
