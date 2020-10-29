import styled from 'styled-components';
import { NavLink as NativeNavLink } from 'react-router-dom';

import { medium } from 'styles/breakpoints';

const Sidebar = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;

    width: 80%;
    max-width: 300px;
    height: 100%;
    border-right: 1px solid black;

    background: #fff;

    @media (min-width: ${medium}) {
        position: static;
        border: 1px solid black;
        border-radius: 5px;
    }
`;

const NavLink = styled(NativeNavLink)`
    display: block;
    padding: 8px;

    &.active {
        background: red;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    background: #fff;

    height: ${({ theme }) => theme.layout.headerHeight};

    @media (min-width: ${medium}) {
        display: none;
    }

    svg {
        path {
            fill: ${({ theme }) => theme.colors.primaryColor};
        }
    }
`;

export const Styled = {
    Sidebar,
    NavLink,
    SidebarHeader,
};
