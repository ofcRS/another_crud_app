import styled from 'styled-components';

const Link = styled.span`
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.pastel[0]};

    cursor: pointer;

    svg {
        width: 16px;
        fill: ${({ theme }) => theme.colors.pastel[0]};
    }
`;

export const Styled = {
    Link,
};
