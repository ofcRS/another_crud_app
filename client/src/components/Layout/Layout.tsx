import React, { PropsWithChildren } from 'react';

import { Menu } from './Menu';
import { Styled } from './Layout.styles';
import { AuthModal } from 'components/AuthModal/AuthModal';

export const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => (
    <Styled.Layout>
        <AuthModal />
        <Menu />
        {children}
    </Styled.Layout>
);
