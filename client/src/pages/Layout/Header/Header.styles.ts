import styled from 'styled-components';

const Header = styled.header`
    position: sticky;
    top: 0;
    z-index: 2;

    display: flex;
    align-items: center;

    height: ${({ theme }) => theme.layout.headerHeight}px;
    width: 100%;
    padding-right: 16px;

    background: ${({ theme }) => theme.colors.primaryColor};

    > :first-child {
        margin-right: 16px;

        svg {
            fill: ${({ theme }) => theme.colors.secondaryColor};
        }
    }

    > input {
        margin-right: 16px;
    }

    > :last-child {
        margin-left: auto;
    }
`;

export const Styled = {
    Header,
};
