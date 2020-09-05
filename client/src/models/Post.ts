import { types } from 'mobx-state-tree';

export const PostModel = types.model({
    id: types.maybeNull(types.number),
    title: types.string,
    body: types.string,
});
