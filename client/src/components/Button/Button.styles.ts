import styled from 'styled-components';

const BaseButton = styled.button`
    background: none;

    cursor: pointer;
    color: ${({ theme }) => theme.colors.neutral};
`;

const Button = styled(BaseButton)`
    display: flex;
    align-items: center;

    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral};
    border-radius: 3px;

    > svg {
        height: 12px;
        width: 12px;

        fill: ${({ theme }) => theme.colors.neutral};

        :not(:only-child) {
            margin-right: 4px;
        }
    }
`;

const LinkButton = styled(BaseButton)`
    color: ${({ theme }) => theme.colors.secondaryColor};
    border: none;
`;

export const Styled = {
    Button,
    LinkButton,
};
