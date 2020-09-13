import { types, flow } from 'mobx-state-tree';

import { createStore } from './createStore';
import { inMemoryToken, refreshToken, getCurrentUser } from 'utils/auth';
import { UserModel } from 'models';
import { LoginMutation } from 'graphql/generated';

export const AppStoreModel = types
    .model({
        user: types.maybeNull(UserModel),
        initialized: types.boolean,
    })
    .actions(self => ({
        initApp: flow(function*() {
            try {
                yield refreshToken();
                const user = yield getCurrentUser();
                self.user = UserModel.create(user);
            } catch (error) {
            } finally {
                self.initialized = true;
            }
        }),
        login(response: LoginMutation) {
            if (response) {
                const {
                    login: { user, accessToken },
                } = response;
                inMemoryToken.accessToken = accessToken;
                self.user = UserModel.create(user);
            }
        },
        logout: flow(function*() {
            inMemoryToken.accessToken = undefined;
            self.user = null;
        }),
    }));

export const [StoreProvider, useStore] = createStore<typeof AppStoreModel>(
    AppStoreModel.create({
        initialized: false,
        user: null,
    })
);
