import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Styled = {
    Menu: styled.nav`
        display: flex;
    `,
    NavLink: styled(NavLink)`
        display: block;
        padding: 8px;

        &.active {
            background: red;
        }
    `,
};
