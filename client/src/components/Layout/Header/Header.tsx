import React from 'react';

import BurgerButton from 'assets/svg/burgerButton.svg';

import { Props } from './Header.types';
import { Styled } from './Header.styles';

export const Header: React.FC<Props> = () => {
    return (
        <Styled.Header>
            <BurgerButton />
        </Styled.Header>
    );
};
