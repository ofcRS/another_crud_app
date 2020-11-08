import styled from 'styled-components';

const TextEditor = styled.div`
    width: 100%;

    > div {
        height: 500px;

        border: 1px solid ${({ theme }) => theme.colors.neutral};
    }
`;

export const Styled = {
    TextEditor,
};
