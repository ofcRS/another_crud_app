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
        padding: 6px;
        color: ${({ theme }) => theme.colors.neutral};
        background: none;

        border: 1px solid ${({ theme }) => theme.colors.neutral};
        border-radius: 3px;

        ::placeholder {
            color: ${({ theme }) => theme.colors.neutral};
        }
    }

    > :last-child {
        margin-left: auto;
    }
`;

export const Styled = {
    Header,
};
