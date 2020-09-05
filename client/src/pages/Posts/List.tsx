import React from 'react';
import { observer } from 'mobx-react';

import { Post } from './Post';
import { CreatePost } from './CreatePost';

import { usePostStore, PostStoreProvider } from './store';

import { usePostQuery } from 'graphql/generated';

const ListBody = observer(() => {
    const postStore = usePostStore();
    usePostQuery({
        fetchPolicy: 'network-only',
        onCompleted: postStore.setPosts,
    });

    return (
        <div>
            <CreatePost fetchPosts={() => null} />
            {postStore.posts.map(post => (
                <Post refreshList={() => null} key={post.id} data={post} />
            ))}
        </div>
    );
});

export const List: React.FC = () => {
    return (
        <PostStoreProvider>
            <ListBody />
        </PostStoreProvider>
    );
};
