import styled from 'styled-components';

const IconButton = styled.button`
    display: flex;
    align-items: center;

    cursor: pointer;
    background: none;

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
    IconButton,
};
