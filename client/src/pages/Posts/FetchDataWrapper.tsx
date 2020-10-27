import React, { useCallback } from 'react';

import { postsContext } from './context';
import {
    PostDocument,
    PostQuery,
    useAddPostMutation,
    useDeletePostMutation,
} from 'graphql/generated';

import { OnAddPost, OnDeletePost } from './Posts.types';

export const FetchDataWrapper: React.FC = ({ children }) => {
    const [addPost, { client }] = useAddPostMutation();
    const [deletePost] = useDeletePostMutation();

    const onAddPost = useCallback<OnAddPost>(
        async (values, helpers) => {
            const { data } = await addPost({ variables: values });
            const current = client?.readQuery<PostQuery>({
                query: PostDocument,
            });
            if (current?.posts && data?.addPost) {
                const updatedPosts = [data.addPost, ...current?.posts];
                client?.writeQuery<PostQuery>({
                    query: PostDocument,
                    data: {
                        posts: updatedPosts,
                    },
                });
                helpers.resetForm();
            }
        },
        [addPost, client]
    );

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
                onAddPost,
            }}
        >
            {children}
        </postsContext.Provider>
    );
};
