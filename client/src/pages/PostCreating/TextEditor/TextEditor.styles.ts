import styled from 'styled-components';
import { DraftStyleMap } from 'draft-js';

const TextEditor = styled.div`
    width: 100%;
    min-height: calc(100vh - 200px);

    .DraftEditor-root {
        height: 100%;
        border: 1px solid ${({ theme }) => theme.colors.neutral};
    }
`;

const ControlsWrapper = styled.div`
    display: flex;
`;

const Token = styled.span`
    color: ${({ theme }) => theme.colors.pastel[1]};
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
};
