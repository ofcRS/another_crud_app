import styled from 'styled-components';
import { ButtonVariant, Props } from './Button.types';

const BaseButton = styled.button`
    background: none;

    cursor: pointer;
    color: ${({ theme }) => theme.colors.neutral};
`;

const Button = styled(BaseButton)<Props>`
    display: flex;
    align-items: center;

    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral};
    border-radius: 3px;

    font-weight: 600;
    font-size: 16px;

    ${({ variant, theme }) => {
        switch (variant as ButtonVariant) {
            case ButtonVariant.submit:
                return `
                    background: ${theme.colors.action};
                    color: ${theme.colors.neutral};
                    
                    transition: background 0.3s;
                    
                    :hover {
                        background: ${theme.colors.actionBrighter};                        
                    }
                `;
            case ButtonVariant.text:
                return `
                    background: none;
                    border: none;
                    text-decoration: underline;
                `;
        }
        return '';
    }}

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
