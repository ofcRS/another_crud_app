import React from 'react';
import { observer } from 'mobx-react';

import { Styled } from './Sidebar.styles';

import { mainMenuRoutes } from 'routes';
import { useStore } from 'store';
import { Burger } from '../Burger';

export const Sidebar = observer(() => {
    const { ui } = useStore();

    if (!ui.sidebarOpen) return null;

    return (
        <Styled.Sidebar>
            <Styled.SidebarHeader>
                <Burger />
            </Styled.SidebarHeader>
            {mainMenuRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
        </Styled.Sidebar>
    );
});
