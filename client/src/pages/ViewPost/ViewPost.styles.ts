import styled from 'styled-components';

const ViewPostWrapper = styled.div`
    background: ${({ theme }) => theme.colors.dark};
    height: 100%;
`;

const ViewPost = styled.div`
    max-width: 680px;
    width: 50vw;
    margin: 0 auto;

    img {
        width: 100%;
        object-fit: contain;
        max-height: 600px;
    }

    div[data-block='true']:not(:last-child) {
        margin-bottom: 32px;
    }

    > h2 {
        margin: 8px 0;
    }
`;

const EditorWrapper = styled.div`
    padding-bottom: 16px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.neutral};
`;

export const Styled = {
    ViewPost,
    ViewPostWrapper,
    EditorWrapper,
};
