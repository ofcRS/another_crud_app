import React from 'react';

import { Styled } from './Backdrop.styles';

import { Props } from './Backdrop.types';

export const Backdrop: React.FC<Props> = ({ onClick }: Props) => {
    return <Styled.Backdrop onClick={onClick} />;
};
