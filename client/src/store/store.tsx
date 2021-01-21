import { types, flow, getRoot } from 'mobx-state-tree';

import { client } from 'apolloClient';

import { UserModel } from 'models';
import { LoginResponse } from 'graphql/generated';

import { RootStore } from './RootStore';
import { inMemoryToken, refreshToken, getCurrentUser } from 'utils/auth';
import { request } from 'utils/request';
import { asyncFnToGenerator } from 'utils/typeCasting';

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
        login(response: LoginResponse) {
            if (response) {
                const { user, accessToken } = response;
                inMemoryToken.accessToken = accessToken;
                self.user = UserModel.create(user);
                const { ui } = getRoot<typeof RootStore>(self);
                ui.afterAuthCallback?.();
                ui.toggleRegistryModal(false);
            }
        },
        logout: flow(function*() {
            const { ok } = yield* asyncFnToGenerator(() =>
                request<{ ok: boolean }>({
                    url: 'auth/logout',
                })
            )();
            if (ok) {
                inMemoryToken.accessToken = undefined;
                yield client.resetStore();
                self.user = null;
            }
        }),
        checkAuthBefore: (callback: () => void) => {
            if (!self.user) {
                const { ui } = getRoot<typeof RootStore>(self);
                ui.toggleRegistryModal(true, callback);
            } else {
                callback();
            }
        },
    }));
