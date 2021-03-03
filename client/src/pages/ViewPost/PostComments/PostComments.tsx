import React, { useContext } from 'react';

import { Comment } from './Comment';

import { Styled } from './PostComments.styles';
import { Props } from './PostComments.types';

import { viewPostContext } from '../context';

export const PostComments: React.FC<Props> = ({
    commentsTree,
    showBranchIndicator,
    onClickBranchIndicator,
}) => {
    const {
        onLeaveComment,
        lastAddedCommentId,
        replyingCommentId,
        setReplyingCommentId,
    } = useContext(viewPostContext);

    return (
        <Styled.PostComments>
            {commentsTree.map(comment => (
                <Comment
                    highlighted={lastAddedCommentId === comment.id}
                    onLeaveComment={(...data) => {
                        onLeaveComment(...data);
                        setReplyingCommentId(null);
                    }}
                    key={comment.id}
                    comment={comment}
                    showReplay={replyingCommentId === comment.id}
                    onReplay={() => setReplyingCommentId(comment.id)}
                />
            ))}
            {showBranchIndicator && (
                <CommentsBranchIndicator
                    onClick={() => onClickBranchIndicator?.()}
                />
            )}
        </Styled.PostComments>
    );
};

const CommentsBranchIndicator = ({ onClick }: { onClick: () => void }) => (
    <Styled.CommentsBranchIndicatorWrapper onClick={onClick}>
        <Styled.CommentsBranchIndicator />
    </Styled.CommentsBranchIndicatorWrapper>
);
