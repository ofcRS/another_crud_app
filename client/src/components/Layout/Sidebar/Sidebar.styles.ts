import styled from 'styled-components';
import { NavLink as NativeNavLink } from 'react-router-dom';

import { medium } from 'styles/breakpoints';

const Sidebar = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;

    transition: transform 100ms;

    width: 80%;
    max-width: 300px;
    height: 100%;
    border-right: 1px solid black;

    background: ${({ theme }) => theme.colors.baseBackground};

    @media (min-width: ${medium}) {
        top: ${({ theme }) => theme.layout.headerHeight}px;
        height: calc(100vh - ${({ theme }) => theme.layout.headerHeight}px);
        border: 1px solid black;
        border-radius: 5px;
    }
`;

const NavLink = styled(NativeNavLink)`
    display: block;
    padding: 8px;

    color: ${({ theme }) => theme.colors.neutral};
    text-decoration: none;

    &.active {
        background: ${({ theme }) => theme.colors.active};
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    background: ${({ theme }) => theme.colors.secondaryColor};

    height: ${({ theme }) => theme.layout.headerHeight}px;

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
