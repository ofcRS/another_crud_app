import styled from 'styled-components';

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
`;

export const Styled = {
    UserBlock,
    UserMenu,
};
