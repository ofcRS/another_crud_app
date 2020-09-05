import { types } from 'mobx-state-tree';

export const UserModel = types.model({
    id: types.maybeNull(types.number),
    email: types.string,
});
