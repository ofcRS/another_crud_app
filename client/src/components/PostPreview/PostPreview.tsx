import React, { useContext } from 'react';

import { PostTitle } from 'components/PostTitle';
import { Shimmer } from 'components/Shimmer';
import { postsContext } from 'pages/Posts/context';

import { Styled } from './PostPreview.styles';
import { Props } from './PostPreview.types';

import { emptyArray } from 'utils/array';

export const PostPreview: React.FC<Props> = props => {
    const { selectedPost } = useContext(postsContext);

    const getShimmers = (amount: number) =>
        emptyArray(amount).map((_, i) => <Shimmer key={i} />);

    const imagePreviewShimmer = (
        <Styled.ImagePreview>
            <Shimmer height="300px" />
        </Styled.ImagePreview>
    );

    return (
        <Styled.PostPreview {...props}>
            <PostTitle>{selectedPost?.title}</PostTitle>
            {props.show && (
                <>
                    {getShimmers(4)}
                    {imagePreviewShimmer}
                    {getShimmers(8)}
                </>
            )}
        </Styled.PostPreview>
    );
};
