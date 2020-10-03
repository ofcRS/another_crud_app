import { types, flow } from 'mobx-state-tree';

import { client } from 'apolloClient';
import { createStore } from './createStore';
import { inMemoryToken, refreshToken, getCurrentUser } from 'utils/auth';
import { UserModel } from 'models';
import { LoginMutation } from 'graphql/generated';
import { request } from 'utils/request';
import { asyncFnToGenerator } from '../utils/typeCasting';

export const AppStoreModel = types
    .model({
        user: types.maybeNull(UserModel),
        initialized: types.boolean,
    })
    .actions(self => ({
        initApp: flow(function*() {
            try {
                yield refreshToken();
                const user = yield* asyncFnToGenerator(getCurrentUser)();
                if (user) {
                    self.user = UserModel.create(user);
                }
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
            const { isOk } = yield* asyncFnToGenerator(() =>
                request<{ isOk: boolean }>({
                    url: 'auth/logout',
                })
            )();
            if (isOk) {
                inMemoryToken.accessToken = undefined;
                yield client.resetStore();
                self.user = null;
            }
        }),
    }));

export const [StoreProvider, useStore] = createStore<typeof AppStoreModel>(
    AppStoreModel.create({
        initialized: false,
        user: null,
    })
);
