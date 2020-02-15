import React from 'react';
import { Styled } from './Menu.styled';

import { tabRoutes } from 'routes';

export const Menu: React.FC = () => {
    return (
        <Styled.Menu>
            {tabRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
        </Styled.Menu>
    );
};
