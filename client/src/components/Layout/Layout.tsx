import React from 'react';

import { AuthModal } from 'pages/AuthModal';

import { Sidebar } from './Sidebar';
import { UserBlock } from './UserBlock';
import { Header } from './Header';

import { Styled } from './Layout.styles';

export const Layout: React.FC = ({ children }) => {
    return (
        <>
            <AuthModal />
            <Header />
            <Styled.Layout>
                <Sidebar />
                <Styled.MainArea>{children}</Styled.MainArea>
                <UserBlock />
            </Styled.Layout>
        </>
    );
};
