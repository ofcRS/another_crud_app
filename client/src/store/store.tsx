import { types, flow } from 'mobx-state-tree';

import { LoginMutation, User } from 'graphql/generated';

import { createStore } from './createStore';
import { inMemoryToken, refreshToken } from 'utils/auth';
import { UserModel } from 'models';

export type Store = {
    user: User | null;

    initializationInProgress: boolean;
    initApp: () => void;

    login: (response: LoginMutation) => void;
};

export const StoreModel = types
    .model({
        user: types.maybeNull(UserModel),
        initializationInProgress: types.boolean,
    })
    .actions(self => ({
        initApp: flow(function*() {
            try {
                yield refreshToken();
            } catch (error) {
            } finally {
                self.initializationInProgress = false;
            }
        }),
        login(response: LoginMutation) {
            if (response) {
                const {
                    login: { user, accessToken },
                } = response;
                self.user = UserModel.create(user);
                inMemoryToken.accessToken = accessToken;
            }
        },
    }));

export const [StoreProvider, useStore] = createStore<typeof StoreModel>(
    StoreModel.create({
        initializationInProgress: false,
        user: null,
    })
);
