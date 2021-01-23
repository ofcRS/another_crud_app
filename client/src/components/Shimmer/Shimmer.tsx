import React from 'react';

import { Styled } from './Shimmer.styles';
import { Props } from './Shimmer.types';

export const Shimmer: React.FC<Props> = props => {
    return (
        <Styled.ShimmerWrapper {...props}>
            <Styled.Shimmer />
        </Styled.ShimmerWrapper>
    );
};
