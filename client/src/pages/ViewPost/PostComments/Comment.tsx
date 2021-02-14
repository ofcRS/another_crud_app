import React from 'react';
import { parseISO, format } from 'date-fns';

import { Styled } from './PostComments.styles';
import { CommentProps } from './PostComments.types';

export const Comment: React.FC<CommentProps> = ({
    comment: { text, user, createdAt },
}) => {
    return (
        <Styled.Comment>
            <div>
                <b>{user.email} - </b>

                <i>{format(parseISO(createdAt), 'dd.MM.yyyy hh:mm:ss')}</i>
            </div>
            {text}
        </Styled.Comment>
    );
};
