import React, { useEffect, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router';
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import { cloneDeep } from 'lodash';

import { viewPostContext } from './context';
import { ViewPost } from './ViewPost';
import {
    usePostLazyQuery,
    useLeaveCommentMutation,
    PostQuery,
    PostDocument,
    PostQueryVariables,
} from 'graphql/generated';
import {
    CommentTreeElement,
    OnLeaveComment,
    LastAddedCommentId,
} from './ViewPost.types';

export const FetchDataWrapper = () => {
    const [commentTree, setCommentTree] = useState<CommentTreeElement[]>([]);
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const [lastAddedCommentId, setLastAddedCommentId] = useState<
        LastAddedCommentId
    >(null);

    const { params } = useRouteMatch<{ id: string }>();

    const postId = parseInt(params.id);

    const [leaveComment, { client }] = useLeaveCommentMutation();

    const [getPostInfo, { data }] = usePostLazyQuery({
        onCompleted: data => {
            if (data.getPost) {
                const { body } = data.getPost;
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
        },
    });

    useEffect(() => {
        if (data?.getPost) {
            const { comments } = data.getPost;

            /*
             * Создаем копию объекта,
             * для работы с рид-онли данными
             * */
            const clonedComments = cloneDeep(comments) as CommentTreeElement[];

            /*
             * Ищем комментарии, которые являются ответами
             * непосредственно на пост
             */
            const rootComments = clonedComments.filter(
                ({ replyId }) => replyId === null
            );

            /*
             * Для каждого реплая типа { id: number },
             * заменяем на { id: number, data: Comment }.
             * Не могу сделать это на сервере,
             * потому что графкуэль не дает передать рекурсию произвольной глубины
             * */
            const fillReplies = (comment: CommentTreeElement) => {
                comment.data = { ...comment };
                comment.replies.forEach(reply => {
                    const relativeRecord = clonedComments.find(
                        ({ id }) => reply.id === id
                    );
                    if (relativeRecord) {
                        reply.replies = relativeRecord.replies;
                        reply.data = relativeRecord;
                        fillReplies(relativeRecord);
                    }
                });
            };

            rootComments.forEach(fillReplies);

            setCommentTree(rootComments);
        }
    }, [data]);

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

    const onLeaveComment: OnLeaveComment = async (text, replyId) => {
        const { data: commentData } = await leaveComment({
            variables: {
                postId,
                text,
                replyId,
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
            const data = {
                getPost: {
                    ...current.getPost,
                    comments: [
                        ...current.getPost.comments.map(comment => {
                            if (
                                comment.id === commentData.leaveComment.replyId
                            ) {
                                return {
                                    ...comment,
                                    replies: [
                                        ...comment.replies,
                                        { id: commentData.leaveComment.id },
                                    ],
                                };
                            }
                            return comment;
                        }),
                        {
                            ...commentData.leaveComment,
                            replies: commentData.leaveComment.replies || [],
                        },
                    ],
                },
            };

            client?.writeQuery<PostQuery, PostQueryVariables>({
                query: PostDocument,
                data,
                variables,
            });
            setLastAddedCommentId(commentData.leaveComment.id);
        }
    };

    if (!params.id || Number.isNaN(parseInt(params.id))) {
        return <Redirect to="/posts" />;
    }

    return (
        <viewPostContext.Provider
            value={{
                onLeaveComment,
                lastAddedCommentId,
                postId,
                post: data?.getPost || null,
                setEditorState,
                editorState,
                setCommentsTree: setCommentTree,
                commentsTree: commentTree,
            }}
        >
            <ViewPost />
        </viewPostContext.Provider>
    );
};
