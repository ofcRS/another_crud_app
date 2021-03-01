import styled, { keyframes } from 'styled-components';
import { Theme } from 'styles/theme';
import { smoothTiming } from 'consts/animation';

const highlightOnRender = (theme: Theme) => keyframes`
    50% {
        background: ${theme.colors.actionBrighter};
    }
`;

const Comment = styled.div<{ highlighted?: boolean }>`
    padding: 8px;

    animation-name: ${({ theme }) => highlightOnRender(theme)};
    ${({ highlighted }) => {
        if (highlighted) {
            return `
                    animation-duration: 1s;
                    animation-timing-function: ${smoothTiming};`;
        }
    }};
`;

export const Styled = {
    Comment,
};
