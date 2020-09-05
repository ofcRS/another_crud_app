/*
import { types } from 'mobx-state-tree';
import { PostModel } from 'models';

const PostStoreModel = types
    .model({
        posts: types.array(PostModel),
    })
    .actions(self => ({
        setPosts: response => {
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
*/
