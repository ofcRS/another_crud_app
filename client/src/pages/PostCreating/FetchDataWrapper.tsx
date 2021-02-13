import React, { useCallback } from 'react';
import {
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

            for (let i = 0; i < 10; i++) {
                await addPost({
                    variables: {
                        title: title + ' ' + i,
                        body: formattedBody,
                    },
                });
            }
            history.push('/posts');
        },
        [addPost, history]
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
