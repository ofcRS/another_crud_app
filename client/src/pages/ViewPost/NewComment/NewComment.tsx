import React, { FormEvent, useState } from 'react';

import { Button, ButtonVariant } from 'components/Button';

import { Styled } from './NewComment.styles';
import { Props } from './NewComment.types';

export const NewComment: React.FC<Props> = ({ onLeaveComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await onLeaveComment(commentText);
        setCommentText('');
    };

    return (
        <Styled.NewComment onSubmit={handleSubmit}>
            <textarea
                placeholder="Comment..."
                value={commentText}
                onChange={event => setCommentText(event.target.value)}
            />
            <Button variant={ButtonVariant.submit}>Send</Button>
        </Styled.NewComment>
    );
};
