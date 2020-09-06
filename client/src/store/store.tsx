import { types, flow } from 'mobx-state-tree';

import { createStore } from './createStore';
import { inMemoryToken, refreshToken } from 'utils/auth';
import { UserModel } from 'models';
import { LoginMutation } from '../graphql/generated';

export const AppStoreModel = types
    .model({
        user: types.maybeNull(UserModel),
        initialized: types.boolean,
    })
    .actions(self => ({
        initApp: flow(function*() {
            try {
                yield refreshToken();
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
    }));

export const [StoreProvider, useStore] = createStore<typeof AppStoreModel>(
    AppStoreModel.create({
        initialized: false,
        user: null,
    })
);
