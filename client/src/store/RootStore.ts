import { Instance, types } from 'mobx-state-tree';

import { PostStoreModel } from './PostStoreModel';
import { AppStoreModel } from './store';
import { UIStoreModel } from './uiStore';
import { createStore } from './createStore';

const RootStore = types.model({
    post: PostStoreModel,
    app: AppStoreModel,
    ui: UIStoreModel,
});

export type RootStoreType = Instance<typeof RootStore.Type>;

export const [RootStoreProvider, useRootStore] = createStore<typeof RootStore>(
    RootStore.create({
        post: PostStoreModel.create({
            items: [],
        }),
        app: AppStoreModel.create({
            user: null,
            initialized: false,
        }),
        ui: UIStoreModel.create({
            registryModalOpen: false,
        }),
    })
);
