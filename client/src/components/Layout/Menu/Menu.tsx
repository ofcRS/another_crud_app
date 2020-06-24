import React from 'react';
import { Styled } from './Menu.styles';

import { tabRoutes } from 'routes';
import { useUIStore } from 'store/uiStore';
import { useStore } from 'store/store';
import { observer } from 'mobx-react';

export const Menu = observer(() => {
    const uiStore = useUIStore();
    const store = useStore();
    return (
        <Styled.Menu>
            {tabRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
            <button onClick={() => uiStore.toggleRegistryModal(true)}>
                log in
            </button>
            {store.user && (
                <div>
                    {store.user.email} - [{store.user.id}]
                </div>
            )}
        </Styled.Menu>
    );
});
