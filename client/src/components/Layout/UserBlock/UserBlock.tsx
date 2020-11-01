import React from 'react';
import { observer } from 'mobx-react';

import { Styled } from './UserBlock.styles';
import { Props } from './UserBlock.types';

import { useStore } from 'store';
import { Button } from 'components/Button';

export const UserBlock: React.FC<Props> = observer(() => {
    const { ui, app } = useStore();

    let userBlock: React.ReactNode;

    if (!app.initialized) {
        userBlock = null;
    } else if (!app.user) {
        userBlock = (
            <Button onClick={() => ui.toggleRegistryModal(true)}>Login</Button>
        );
    } else {
        userBlock = `logged in as: ${app.user.email}`;
    }

    const onClickLogout = async () => app.logout();

    return (
        <Styled.UserBlock>
            {userBlock}
            {/*   <Styled.UserMenu>
                <button onClick={onClickLogout}>logout</button>
            </Styled.UserMenu>*/}
        </Styled.UserBlock>
    );
});
