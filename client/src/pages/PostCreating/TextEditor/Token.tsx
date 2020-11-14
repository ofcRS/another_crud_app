import React from 'react';

import { Styled } from './TextEditor.styles';
import { TokenProps } from './TextEditor.types';

export const Token: React.FC<TokenProps> = ({ offsetKey, children }) => {
    return <Styled.Token data-offset-key={offsetKey}>{children}</Styled.Token>;
};
