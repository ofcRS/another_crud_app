import React, { useEffect, useState } from 'react';

import { viewPostContext } from './context';
import { ViewPost } from './ViewPost';
import { Redirect, useRouteMatch } from 'react-router';
import {
    usePostLazyQuery,
    useLeaveCommentMutation,
    PostQuery,
    PostDocument,
    PostQueryVariables,
} from '../../graphql/generated';
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';

export const FetchDataWrapper = () => {
    const { params } = useRouteMatch<{ id: string }>();

    const postId = parseInt(params.id);

    const [leaveComment, { client }] = useLeaveCommentMutation();
    const [getPostInfo, { data }] = usePostLazyQuery();

    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    useEffect(() => {
        getPostInfo({
            variables: {
                id: postId,
            },
        });
    }, [getPostInfo, params.id]);

    useEffect(() => {
        if (data?.getPost?.body) {
            const { body } = data?.getPost;
            const contentState = convertFromRaw({
                ...body,
                entityMap: body.entityMap.reduce(
                    (res, cur, index) => ({
                        ...res,
                        [index]: cur,
                    }),
                    {}
                ),
            } as RawDraftContentState);
            setEditorState(prev =>
                EditorState.set(
                    EditorState.push(prev, contentState, 'adjust-depth'),
                    {}
                )
            );
        }
    }, [data]);

    const onLeaveComment = async (text: string) => {
        const { data: commentData } = await leaveComment({
            variables: {
                postId,
                text,
            },
        });
        const variables: PostQueryVariables = {
            id: postId,
        };

        const current = client?.readQuery<PostQuery, PostQueryVariables>({
            query: PostDocument,
            variables,
        });
        if (commentData?.leaveComment && current?.getPost) {
            client?.writeQuery<PostQuery, PostQueryVariables>({
                query: PostDocument,
                data: {
                    getPost: {
                        ...current.getPost,
                        comments: [
                            ...current.getPost.comments,
                            commentData.leaveComment,
                        ],
                    },
                },
                variables,
            });
        }
    };

    if (!params.id || Number.isNaN(parseInt(params.id))) {
        return <Redirect to="/posts" />;
    }

    return (
        <viewPostContext.Provider
            value={{
                onLeaveComment,
                postId,
                post: data?.getPost || null,
                setEditorState,
                editorState,
            }}
        >
            <ViewPost />
        </viewPostContext.Provider>
    );
};
