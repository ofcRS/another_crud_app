import React from 'react';
import { observer } from 'mobx-react';

import { Button } from 'components/Button';

import { Burger } from '../Burger';
import { UserBlock } from '../UserBlock';

import { Props } from './Header.types';
import { Styled } from './Header.styles';

export const Header = observer<React.FC<Props>>(() => {
    return (
        <Styled.Header>
            <Burger />
            <input placeholder="поиск" />
            <Button
                iconProps={{
                    iconName: 'plus',
                }}
            >
                New post
            </Button>
            <UserBlock />
        </Styled.Header>
    );
});
