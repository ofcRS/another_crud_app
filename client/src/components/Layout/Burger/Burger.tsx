import React from 'react';
import { observer } from 'mobx-react';

import { Styled } from './Burger.styles';

import { useStore } from 'store';
import { IconButton } from '../../IconButton';

export const Burger: React.FC = observer(() => {
    const { ui } = useStore();

    return (
        <Styled.BurgerButton onClick={() => ui.toggleSidebar()}>
            <IconButton
                iconProps={{
                    iconName: 'burger',
                }}
            />
        </Styled.BurgerButton>
    );
});
