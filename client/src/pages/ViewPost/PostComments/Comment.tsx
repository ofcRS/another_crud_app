import React, { useContext } from 'react';
import { format, parseISO } from 'date-fns';

import { Button, ButtonVariant } from 'components/Button';

import { Styled } from './PostComments.styles';
import { CommentProps } from './PostComments.types';
import { NewComment } from '../NewComment';
import { PostComments } from './PostComments';

import { viewPostContext } from '../context';

export const Comment: React.FC<CommentProps> = ({
    comment: {
        data: { text, user, createdAt, id },
        replies,
    },
    showReplay,
    onReplay,
}) => {
    const { onLeaveComment } = useContext(viewPostContext);

    return (
        <Styled.Comment>
            <div>
                <b>{user.email} - </b>

                <i>{format(parseISO(createdAt), 'dd.MM.yyyy hh:mm:ss')}</i>
            </div>
            {text}
            {showReplay ? (
                <NewComment onLeaveComment={text => onLeaveComment(text, id)} />
            ) : (
                <Button onClick={onReplay} variant={ButtonVariant.text}>
                    replay
                </Button>
            )}
            <PostComments commentsTree={replies} />
        </Styled.Comment>
    );
};
