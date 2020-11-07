import React, { useCallback } from 'react';

import { postsContext } from './context';
import {
    PostDocument,
    PostQuery,
    useDeletePostMutation,
} from 'graphql/generated';

import { OnDeletePost } from './Posts.types';
import { List } from './List';

export const FetchDataWrapper: React.FC = () => {
    const [deletePost, { client }] = useDeletePostMutation();

    const onDeletePost = useCallback<OnDeletePost>(
        async targetId => {
            await deletePost({
                variables: {
                    id: targetId,
                },
            });
            const current = client?.readQuery<PostQuery>({
                query: PostDocument,
            });
            if (current?.posts) {
                const updatedList = current.posts.filter(
                    ({ id }) => id !== targetId
                );
                client?.writeQuery<PostQuery>({
                    query: PostDocument,
                    data: { posts: updatedList },
                });
            }
        },
        [client, deletePost]
    );

    return (
        <postsContext.Provider
            value={{
                onDeletePost,
            }}
        >
            <List />
        </postsContext.Provider>
    );
};
