import React from 'react';
import { Styled } from './Menu.styles';

import { mainMenuRoutes } from 'routes';

import { observer } from 'mobx-react';

import { useStore } from 'store';
import { useLogoutMutation, useMeQuery } from 'graphql/generated';
import { inMemoryToken } from '../../../utils/auth';

export const Menu = observer(() => {
    const { ui } = useStore();
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();

    let userBlock: React.ReactNode;

    if (loading) {
        userBlock = null;
    } else if (!data?.me) {
        userBlock = 'not logged in';
    } else {
        userBlock = `logged in as: ${data.me.email}`;
    }

    const onClickLogout = async () => {
        await logout();
        inMemoryToken.accessToken = undefined;
        client?.resetStore();
    };

    return (
        <Styled.Menu>
            {mainMenuRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
            <button onClick={() => ui.toggleRegistryModal(true)}>login</button>
            <button onClick={onClickLogout}>logout</button>
            <div>{userBlock}</div>
        </Styled.Menu>
    );
});
