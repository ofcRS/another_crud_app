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
    const { ui, app } = useStore();
    const history = useHistory();

    const navigateToNewPost = () => history.push('/users');

    const onClickNewPostButton = () => {
        if (!app.user) {
            ui.toggleRegistryModal(true, navigateToNewPost);
        } else {
            navigateToNewPost();
        }
    };

    return (
        <Styled.Header>
            <Burger />
            <input placeholder="поиск" />
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
