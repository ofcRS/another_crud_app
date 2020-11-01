import styled from 'styled-components';

const Header = styled.header`
    position: sticky;
    top: 0;
    z-index: 2;

    display: flex;
    align-items: center;

    height: ${({ theme }) => theme.layout.headerHeight}px;
    width: 100%;

    background: ${({ theme }) => theme.colors.primaryColor};

    svg {
        path {
            fill: ${({ theme }) => theme.colors.secondaryColor};
        }
    }
`;

export const Styled = {
    Header,
};
