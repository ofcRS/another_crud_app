import React from 'react';

import { Props } from './PostImage.types';
import { Styled } from './PostImage.styles';

export const PostImage: React.FC<Props> = ({ src }) => {
    return (
        <Styled.ImageWrapper>
            <img alt="preview" src={src} />
        </Styled.ImageWrapper>
    );
};
