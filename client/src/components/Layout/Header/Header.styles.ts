import styled from 'styled-components';

const Header = styled.header`
    height: ${({ theme }) => theme.layout.headerHeight};
    width: 100%;
    margin-bottom: 32px;

    background: #3080d6;

    svg {
        height: 100%;
        padding: 8px;
    }
`;

export const Styled = {
    Header,
};
