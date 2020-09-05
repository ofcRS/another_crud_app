import { types } from 'mobx-state-tree';
import { PostModel } from 'models';

import { createStore } from 'store/createStore';
import { PostQuery } from 'graphql/generated';

const PostStoreModel = types
    .model({
        posts: types.array(PostModel),
    })
    .actions(self => ({
        setPosts: (response: PostQuery) => {
            self.posts.replace(response.posts);
        },
    }));

export const [PostStoreProvider, usePostStore] = createStore<
    typeof PostStoreModel
>(
    PostStoreModel.create({
        posts: [],
    })
);
