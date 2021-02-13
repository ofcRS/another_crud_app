import React, { useCallback, useEffect, useState } from 'react';

import { postsContext } from './context';
import {
    PostsPreviewsDocument,
    PostsPreviewsQuery,
    useDeletePostMutation,
    usePostLazyQuery,
    usePostsPreviewsLazyQuery,
} from 'graphql/generated';

import { OnDeletePost, OnSelectPost, SelectedPost } from './Posts.types';
import { List } from './List';
import { useHistory } from 'react-router';
import { delay } from 'utils/throttle';

export const ITEMS_ON_PAGE = 2;

export const FetchDataWrapper: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedPost, setSelectedPost] = useState<SelectedPost>(null);
    const [deletePost, { client }] = useDeletePostMutation();
    const [getPost, { data }] = usePostLazyQuery();

    const skip = (currentPage - 1) * ITEMS_ON_PAGE;
    const take = ITEMS_ON_PAGE;

    const [
        getPostsPreviews,
        { data: postsPreviewsData, fetchMore },
    ] = usePostsPreviewsLazyQuery();

    useEffect(() => {
        const options = {
            variables: {
                skip,
                take,
            },
        };

        // fetchMore не будет работать, если предварительно не вызвать getPostsPreviews,
        // ыпоэтому вызываю его для первой страницы
        if (skip === 0) {
            getPostsPreviews(options);
        } else {
            fetchMore?.({
                variables: {
                    skip,
                    take,
                },
            });
        }
    }, [fetchMore, getPostsPreviews, skip, take]);

    const onDeletePost = useCallback<OnDeletePost>(
        async targetId => {
            await deletePost({
                variables: {
                    id: targetId,
                },
            });
            const current = client?.readQuery<PostsPreviewsQuery>({
                query: PostsPreviewsDocument,
            });
            if (current?.postsPreview) {
                const updatedList = current.postsPreview.filter(
                    ({ id }) => id !== targetId
                );
                client?.writeQuery<PostsPreviewsQuery>({
                    query: PostsPreviewsDocument,
                    data: {
                        totalItems: current.totalItems - 1,
                        postsPreview: updatedList,
                    },
                    variables: { rewrite: true },
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
        await delay(2500);

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
                postsPreviews: postsPreviewsData?.postsPreview || [],
                totalItems: postsPreviewsData?.totalItems || 0,
            }}
        >
            <List />
        </postsContext.Provider>
    );
};
