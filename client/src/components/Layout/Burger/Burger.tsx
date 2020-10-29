import React from 'react';
import { observer } from 'mobx-react';

import { Styled } from './Burger.styles';

import { useStore } from 'store';

import BurgerButton from 'assets/svg/burgerButton.svg';

export const Burger: React.FC = observer(() => {
    const { ui } = useStore();

    return (
        <Styled.BurgerButton onClick={() => ui.toggleSidebar()}>
            <BurgerButton />
        </Styled.BurgerButton>
    );
});
