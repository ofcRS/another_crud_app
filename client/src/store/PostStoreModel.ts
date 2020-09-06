import { types } from 'mobx-state-tree';
import { PostModel, PostModelType } from 'models';
import { PostQuery } from '../graphql/generated';

export const PostStoreModel = types
    .model({
        items: types.array(PostModel),
    })
    .actions(self => ({
        setItems: (response: PostQuery) =>
            self.items.replace(response.posts as PostModelType[]),
    }));
