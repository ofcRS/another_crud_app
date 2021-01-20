import styled from 'styled-components';
import { DraftStyleMap } from 'draft-js';

const TextEditor = styled.div`
    width: 100%;
    min-height: calc(100vh - 200px);
    position: relative;

    .public-DraftEditor-content {
        min-height: 300px;
    }

    img {
        display: block;
        max-width: 50%;
        margin: 0 auto;
    }
`;

const ControlButton = styled.button<{ selected?: boolean }>`
    background: ${({ theme, selected }) =>
        selected ? theme.colors.neutral : 'none'};
    color: ${({ theme, selected }) =>
        selected ? theme.colors.baseBackground : theme.colors.neutral};
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.neutral};
    border-radius: 4px;

    :not(:last-child) {
        margin-right: 4px;
    }

    svg {
        width: 20px;
        fill: ${({ theme }) => theme.colors.neutral};
    }
`;

const ControlsWrapper = styled.div<{ float?: boolean }>`
    position: sticky;

    display: flex;

    margin-bottom: 16px;

    background: ${({ theme }) => theme.colors.dark};

    ${({ float, theme: { layout } }) => {
        if (float) {
            return `
                position: fixed;
                right: 16px;
                top: ${layout.headerHeight + 8}px;
                z-index: 2;
                
                flex-direction: column;
                
                > ${ControlButton} {
                    margin-right: 0;
                }
            `;
        }
    }}
`;

const Token = styled.span`
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.pastel[0]};

    cursor: pointer;

    svg {
        width: 16px;
        fill: ${({ theme }) => theme.colors.pastel[0]};
    }
`;

const lineStyleMap: DraftStyleMap = {
    CODE: {
        color: 'red',
    },
};

export const Styled = {
    TextEditor,
    ControlsWrapper,
    Token,
    lineStyleMap,
    ControlButton,
};
