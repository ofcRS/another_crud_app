import React, { PropsWithChildren } from 'react';

import { Menu } from './Menu';
import { AuthModal } from 'components/AuthModal';

import { Styled } from './Layout.styles';

export const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => (
    <Styled.Layout>
        <AuthModal />
        <Menu />
        {children}
    </Styled.Layout>
);
