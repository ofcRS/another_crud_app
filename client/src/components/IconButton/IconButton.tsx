import React from 'react';

import { Icon } from 'components/Icon';

import { Styled } from './IconButton.styles';
import { Props } from './IconButton.types';

export const IconButton: React.FC<Props> = ({ iconProps, onClick }) => {
    return (
        <Styled.IconButton onClick={onClick}>
            <Icon iconName={iconProps.iconName} />
        </Styled.IconButton>
    );
};
