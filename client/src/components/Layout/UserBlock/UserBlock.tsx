import React from 'react';
import { observer } from 'mobx-react';

import { Styled } from './UserBlock.styles';
import { Props } from './UserBlock.types';

import { useStore } from 'store';

export const UserBlock: React.FC<Props> = observer(() => {
    const { ui, app } = useStore();

    let userBlock: React.ReactNode;

    if (!app.initialized) {
        userBlock = null;
    } else if (!app.user) {
        userBlock = 'not logged in';
    } else {
        userBlock = `logged in as: ${app.user.email}`;
    }

    const onClickLogout = async () => app.logout();

    return (
        <div style={{ border: '1px solid black', borderRadius: '5px' }}>
            <Styled.UserBlock>
                {userBlock}
                <Styled.UserMenu>
                    <button onClick={() => ui.toggleRegistryModal(true)}>
                        login
                    </button>
                    <button onClick={onClickLogout}>logout</button>
                </Styled.UserMenu>
            </Styled.UserBlock>
        </div>
    );
});
