import React from 'react';
import { observer } from 'mobx-react';

import { Burger } from '../Burger';
import { UserBlock } from '../UserBlock';

import { Props } from './Header.types';
import { Styled } from './Header.styles';

export const Header = observer<React.FC<Props>>(() => {
    return (
        <Styled.Header>
            <Burger />
            <UserBlock />
        </Styled.Header>
    );
});
