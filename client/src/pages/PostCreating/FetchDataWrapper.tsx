import React, { useCallback } from 'react';
import { PostDocument, PostQuery, useAddPostMutation } from 'graphql/generated';

import { postCreatingContext } from './context';
import { OnAddPost } from './PostCreating.types';
import { PostCreating } from './PostCreating';
import { convertToRaw } from 'draft-js';

export const FetchDataWrapper: React.FC = () => {
    const [addPost, { client }] = useAddPostMutation();
    const onAddPost = useCallback<OnAddPost>(
        async ({ body, title }, helpers) => {
            const { data } = await addPost({
                variables: {
                    title: title,
                    body: JSON.stringify(
                        convertToRaw(body.getCurrentContent())
                    ),
                },
            });
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

    return (
        <postCreatingContext.Provider
            value={{
                onAddPost,
            }}
        >
            <PostCreating />
        </postCreatingContext.Provider>
    );
};
