import { types } from 'mobx-state-tree';
import { PostModel } from 'models';

export const PostStoreModel = types
    .model({
        items: types.array(PostModel),
    })
    .actions(() => ({}));
