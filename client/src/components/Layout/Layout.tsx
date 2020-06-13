import React, { PropsWithChildren } from 'react';

import { Menu } from './Menu';
import { Styled } from './Layout.styles';
import { RegistryModal } from 'components/RegistryModal/RegistryModal';

export const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => (
    <Styled.Layout>
        <RegistryModal />
        <Menu />
        {children}
    </Styled.Layout>
);
