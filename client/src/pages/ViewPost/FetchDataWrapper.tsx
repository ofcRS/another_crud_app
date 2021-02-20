import React, { useEffect, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router';
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';

import { viewPostContext } from './context';
import { ViewPost } from './ViewPost';
import {
    usePostLazyQuery,
    useLeaveCommentMutation,
    PostQuery,
    PostDocument,
    PostQueryVariables,
} from 'graphql/generated';
import { CommentTreeElement, OnLeaveComment } from './ViewPost.types';

export const FetchDataWrapper = () => {
    const [commentTree, setCommentTree] = useState<CommentTreeElement[]>([]);
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const { params } = useRouteMatch<{ id: string }>();

    const postId = parseInt(params.id);

    const [leaveComment, { client }] = useLeaveCommentMutation();

    const [getPostInfo, { data }] = usePostLazyQuery({
        onCompleted: data => {
            if (data.getPost) {
                const { body, comments } = data.getPost;
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

                // Строим дерево комментов
                const rootTags = comments.filter(
                    ({ replayId }) => replayId === null
                );
                const mapChildren = (parentId: number) => {
                    const replies = comments.filter(
                        ({ replayId }) => replayId === parentId
                    );

                };
                // setCommentTree();
            }
        },
    });

    useEffect(() => {
        getPostInfo({
            variables: {
                id: postId,
            },
        });
    }, [getPostInfo, postId]);

    useEffect(() => {
        if (data?.getPost?.body) {
        }
    }, [data]);

    const onLeaveComment: OnLeaveComment = async (text, replayId) => {
        const { data: commentData } = await leaveComment({
            variables: {
                postId,
                text,
                replayId,
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
                setCommentTree,
                commentTree,
            }}
        >
            <ViewPost />
        </viewPostContext.Provider>
    );
};
