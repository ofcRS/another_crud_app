import styled from 'styled-components';

const Header = styled.header`
    display: flex;
    align-items: center;

    height: ${({ theme }) => theme.layout.headerHeight};
    width: 100%;
    margin-bottom: 32px;

    background: ${({ theme }) => theme.colors.primaryColor};
`;

export const Styled = {
    Header,
};
