import React from 'react';

import { AuthModal } from 'components/AuthModal';

import { Menu } from './Menu';
import { UserBlock } from './UserBlock';
import { Header } from './Header';

import { Styled } from './Layout.styles';

export const Layout: React.FC = ({ children }) => (
    <>
        <AuthModal />
        <Header />
        <Styled.Layout>
            <Menu />
            <Styled.MainArea>{children}</Styled.MainArea>
            <UserBlock />
        </Styled.Layout>
    </>
);
