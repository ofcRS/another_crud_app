import React, { useCallback, useEffect, useState } from 'react';

import { postsContext } from './context';
import {
    PostsDocument,
    PostsQuery,
    useDeletePostMutation,
    usePostLazyQuery,
} from 'graphql/generated';

import { OnDeletePost, OnSelectPost, SelectedPost } from './Posts.types';
import { List } from './List';
import { useHistory } from 'react-router';
import { delay } from 'utils/throttle';

export const FetchDataWrapper: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<SelectedPost>(null);
    const [deletePost, { client }] = useDeletePostMutation();
    const [getPost, { data }] = usePostLazyQuery();

    const onDeletePost = useCallback<OnDeletePost>(
        async targetId => {
            await deletePost({
                variables: {
                    id: targetId,
                },
            });
            const current = client?.readQuery<PostsQuery>({
                query: PostsDocument,
            });
            if (current?.posts) {
                const updatedList = current.posts.filter(
                    ({ id }) => id !== targetId
                );
                client?.writeQuery<PostsQuery>({
                    query: PostsDocument,
                    data: { posts: updatedList },
                });
            }
        },
        [client, deletePost]
    );

    const history = useHistory();

    useEffect(() => {
        if (data?.getPost?.id) {
            const { id } = data?.getPost;
            history.push('/posts/' + id);
        }
    }, [data, history]);

    const onSelectPost: OnSelectPost = async post => {
        setSelectedPost(post);

        // искусственная задержка, чтобы показать анимацию :)
        await delay(4000);

        if (post !== null) {
            getPost({
                variables: {
                    id: post.id,
                },
            });
        }
    };

    return (
        <postsContext.Provider
            value={{
                onDeletePost,
                selectedPost,
                onSelectPost,
            }}
        >
            <List />
        </postsContext.Provider>
    );
};
