import React, { PropsWithChildren } from 'react';

import { Menu } from './Menu';
import { Styled } from './Layout.styled';

export const Layout: React.FC = ({ children }: PropsWithChildren<{}>) => {
    return (
        <Styled.Layout>
            <Menu />
            {children}
        </Styled.Layout>
    );
};
