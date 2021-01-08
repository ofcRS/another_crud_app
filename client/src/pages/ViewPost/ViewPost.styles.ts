import styled from 'styled-components';

const PostHeader = styled.h1`
    font-size: 48px;
    line-height: 64px;
    margin-bottom: 16px;
`;

const ViewPost = styled.div`
    img {
        width: 100%;
        object-fit: contain;
        max-height: 600px;
    }

    div[data-block='true']:not(:last-child) {
        margin-bottom: 32px;
    }
`;

export const Styled = {
    ViewPost,
    PostHeader,
};
