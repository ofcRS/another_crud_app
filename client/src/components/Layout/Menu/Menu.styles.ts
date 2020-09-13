import styled from 'styled-components';
import { NavLink as NativeNavLink } from 'react-router-dom';

const Menu = styled.nav`
    width: 30vw;
    border: 1px solid black;

    border-radius: 5px;
`;

const NavLink = styled(NativeNavLink)`
    display: block;
    padding: 8px;

    &.active {
        background: red;
    }
`;

export const Styled = {
    Menu,
    NavLink,
};
