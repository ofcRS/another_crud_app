import React from 'react';
import { observer } from 'mobx-react';

import { Burger } from '../Burger';

import { Props } from './Header.types';
import { Styled } from './Header.styles';

export const Header = observer<React.FC<Props>>(() => {
    return (
        <Styled.Header>
            <Burger />
        </Styled.Header>
    );
});
