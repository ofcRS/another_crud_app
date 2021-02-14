import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';

import { Button } from 'components/Button';

import { Burger } from '../Burger';
import { UserBlock } from '../UserBlock';

import { Props } from './Header.types';
import { Styled } from './Header.styles';

import { useStore } from 'store';

export const Header = observer<React.FC<Props>>(() => {
    const { app } = useStore();
    const history = useHistory();

    const onClickNewPostButton = () =>
        app.checkAuthBefore(() => history.push('/new-post'));

    return (
        <Styled.Header>
            <Burger />
            <input placeholder="Search" />
            <Button
                onClick={onClickNewPostButton}
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
