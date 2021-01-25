import React, { useCallback, useEffect, useState } from 'react';

import { postsContext } from './context';
import {
    PostPreview,
    PostsDocument,
    PostsQuery,
    useDeletePostMutation,
    usePostLazyQuery,
    usePostsPreviewsLazyQuery,
} from 'graphql/generated';

import { OnDeletePost, OnSelectPost, SelectedPost } from './Posts.types';
import { List } from './List';
import { useHistory } from 'react-router';
import { delay } from 'utils/throttle';

export const ITEMS_ON_PAGE = 1;

export const FetchDataWrapper: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedPost, setSelectedPost] = useState<SelectedPost>(null);
    const [deletePost, { client }] = useDeletePostMutation();
    const [getPost, { data }] = usePostLazyQuery();

    const [postsPreviews, setPostsPreview] = useState<PostPreview[]>([]);
    const [
        getPostsPreviews,
        { data: postsPreviewsData },
    ] = usePostsPreviewsLazyQuery();

    useEffect(() => {
        getPostsPreviews({
            variables: {
                skip: (currentPage - 1) * ITEMS_ON_PAGE,
                take: ITEMS_ON_PAGE,
            },
        });
    }, [currentPage, getPostsPreviews]);
    useEffect(() => {
        setPostsPreview(prev => [
            ...prev,
            ...(postsPreviewsData?.postsPreview || []),
        ]);
    }, [postsPreviewsData?.postsPreview]);

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
                currentPage,
                setCurrentPage,
                postsPreviews,
                totalItems: postsPreviewsData?.totalItems || 0,
            }}
        >
            <List />
        </postsContext.Provider>
    );
};
