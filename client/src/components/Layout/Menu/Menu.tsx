import React from 'react';
import { Styled } from './Menu.styles';

import { mainMenuRoutes } from 'routes';

import { observer } from 'mobx-react';
import { useUIStore } from 'store/uiStore';

export const Menu = observer(() => {
    const uiStore = useUIStore();
    // const { data, loading } = useMeQuery();

    let userBlock: React.ReactNode;

    /*if (loading) {
        userBlock = null;
    } else if (!data?.me) {
        userBlock = 'not logged in';
    } else {
        userBlock = `logged in as: ${data.me.email}`;
    }*/

    return (
        <Styled.Menu>
            {mainMenuRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
            <button onClick={() => uiStore.toggleRegistryModal(true)}>
                log in
            </button>
            <div>{userBlock}</div>
        </Styled.Menu>
    );
});
