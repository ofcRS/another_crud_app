import React from 'react';
import { observer } from 'mobx-react';

import { IconButton } from 'components/IconButton';
import { Styled } from './Burger.styles';

import { useStore } from 'store';

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
