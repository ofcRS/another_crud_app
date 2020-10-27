import styled from 'styled-components';
import { medium } from 'styles/breakpoints';

const UserMenu = styled.div`
    position: absolute;
    display: none;
    left: 0;
    top: 15px;
`;

const UserBlock = styled.div`
    position: relative;

    :hover {
        ${UserMenu} {
            display: block;
        }
    }

    @media (max-height: ${medium}) {
        display: none;
    }
`;

export const Styled = {
    UserBlock,
    UserMenu,
};
