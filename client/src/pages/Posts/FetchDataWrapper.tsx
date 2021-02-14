import React, { useCallback, useEffect, useState } from 'react';

import { postsContext } from './context';
import {
    PostsPreviewsDocument,
    PostsPreviewsQuery,
    useDeletePostMutation,
    usePostLazyQuery,
    usePostsPreviewsLazyQuery,
} from 'graphql/generated';

import {
    FetchMorePostsPreviews,
    OnDeletePost,
    OnSelectPost,
    SelectedPost,
} from './Posts.types';
import { List } from './List';
import { useHistory, useLocation } from 'react-router';
import { delay } from 'utils/throttle';
import { ITEMS_ON_PAGE, SHOW_POST_PREVIEW_KEY } from './consts';

export const FetchDataWrapper: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<SelectedPost>(null);
    const [deletePost] = useDeletePostMutation();
    const [getPost, { data }] = usePostLazyQuery();

    const [skip, setSkip] = useState(0);

    const [
        getPostsPreviews,
        { data: postsPreviewsData, fetchMore, client },
    ] = usePostsPreviewsLazyQuery();

    const fetchMorePostsPreviews = useCallback<FetchMorePostsPreviews>(
        (skip, take) => {
            fetchMore?.({
                variables: {
                    skip,
                    take,
                },
            });
        },
        [fetchMore]
    );

    useEffect(() => {
        const options = {
            variables: {
                skip,
                take: ITEMS_ON_PAGE,
            },
        };

        // fetchMore не будет работать, если предварительно не вызвать getPostsPreviews,
        // ыпоэтому вызываю его для первой страницы
        if (skip === 0) {
            getPostsPreviews(options);
        } else {
            fetchMorePostsPreviews(skip, ITEMS_ON_PAGE);
        }
    }, [fetchMorePostsPreviews, getPostsPreviews, skip]);

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

            if (current) {
                const filtered = current.postsPreview.filter(
                    ({ id }) => id !== targetId
                );
                client?.writeQuery<PostsPreviewsQuery>({
                    query: PostsPreviewsDocument,
                    data: {
                        postsPreview: filtered,
                        totalItems: current.totalItems - 1,
                    },
                    variables: {
                        rewrite: true,
                    },
                });
                fetchMorePostsPreviews(Math.max(skip - 1, 0), ITEMS_ON_PAGE);
            }
        },
        [client, deletePost, fetchMorePostsPreviews, skip]
    );

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // проверяем не ушел ли пользователь со
        // страницы не дождавшись загрузки поста целиком
        const previewStillActive =
            new URLSearchParams(location.search).get(SHOW_POST_PREVIEW_KEY) !==
            null;

        if (data?.getPost?.id && previewStillActive) {
            const { id } = data?.getPost;
            history.replace('/posts/' + id);
        }
    }, [data, history, location.search]);

    const onSelectPost: OnSelectPost = async post => {
        history.push(`?${SHOW_POST_PREVIEW_KEY}=true`);
        setSelectedPost(post);
        // искусственная задержка, чтобы показать анимацию :)
        await delay(1000);

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
                skip,
                setSkip,
                postsPreviews: postsPreviewsData?.postsPreview || [],
                totalItems: postsPreviewsData?.totalItems || 0,
            }}
        >
            <List />
        </postsContext.Provider>
    );
};
