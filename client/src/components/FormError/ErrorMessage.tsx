import React from 'react';

import { Styled } from './ErrorMessage.styles';

import { Props } from './ErrorMessage.types';

export const ErrorMessage: React.FC<Props> = ({ children, visible }) => {
    return (
        <Styled.ErrorMessageContainer>{children}</Styled.ErrorMessageContainer>
    );
};