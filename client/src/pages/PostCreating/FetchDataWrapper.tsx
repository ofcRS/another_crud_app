import React, { useCallback } from 'react';
import {
    PostDocument,
    PostQuery,
    useAddPostMutation,
    PostBodyInput,
    EntityMapInput,
} from 'graphql/generated';
import { convertToRaw } from 'draft-js';
import { useHistory } from 'react-router';

import { postCreatingContext } from './context';
import { OnAddPost } from './PostCreating.types';
import { PostCreating } from './PostCreating';

export const FetchDataWrapper: React.FC = () => {
    const [addPost, { client }] = useAddPostMutation();
    const history = useHistory();

    const onAddPost = useCallback<OnAddPost>(
        async ({ body, title }, helpers) => {
            const rawBody = convertToRaw(body.getCurrentContent());
            const formattedBody: PostBodyInput = {
                blocks: rawBody.blocks.map(({ data, ...block }) => block),
                entityMap: Object.keys(rawBody.entityMap).map<EntityMapInput>(
                    key => {
                        return rawBody.entityMap[key] as EntityMapInput;
                    }
                ),
            };

            const { data } = await addPost({
                variables: {
                    title: title,
                    body: formattedBody,
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
            }
            history.push('/posts');
        },
        [addPost, client, history]
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
