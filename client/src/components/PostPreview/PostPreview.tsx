import React, { useContext } from 'react';

import { PostTitle } from 'components/PostTitle';
import { postsContext } from 'pages/Posts/context';

import { Styled } from './PostPreview.styles';
import { Props } from './PostPreview.types';

export const PostPreview: React.FC<Props> = props => {
    const { selectedPost } = useContext(postsContext);
    return (
        <Styled.PostPreview {...props}>
            <PostTitle>{selectedPost?.title}</PostTitle>
        </Styled.PostPreview>
    );
};
