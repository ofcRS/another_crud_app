import React from 'react';
import { Styled } from './Menu.styles';

import { tabRoutes } from 'routes';
import { useUIStore } from '../../../store/uiStore';

export const Menu: React.FC = () => {
    const uiStore = useUIStore();
    return (
        <Styled.Menu>
            {tabRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
            <button onClick={uiStore.toggleRegistryModal}>log in</button>
        </Styled.Menu>
    );
};
