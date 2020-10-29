import styled from 'styled-components';

const BurgerButton = styled.button`
    cursor: pointer;
    background: none;

    margin-left: 16px;
    border: none;

    :hover {
        opacity: 0.6;
    }

    svg {
        width: 24px;
        height: 24px;
    }
`;

export const Styled = {
    BurgerButton,
};
