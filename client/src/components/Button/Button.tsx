import React from 'react';

import { Icon } from 'components/Icon';

import { Styled } from './Button.styles';
import { Props } from './Button.types';

export const Button: React.FC<Props> = ({ children, iconProps, ...props }) => {
    return (
        <Styled.Button {...props}>
            {iconProps && <Icon {...iconProps} />}
            <span>{children}</span>
        </Styled.Button>
    );
};
