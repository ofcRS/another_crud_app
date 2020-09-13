import React from 'react';
import { observer } from 'mobx-react';

import { Styled } from './Menu.styles';

import { mainMenuRoutes } from 'routes';

export const Menu = observer(() => {
    return (
        <Styled.Menu>
            {mainMenuRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
        </Styled.Menu>
    );
});
