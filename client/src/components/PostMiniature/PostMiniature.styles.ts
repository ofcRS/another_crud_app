import styled from 'styled-components';

import { MoreButton as MoreButtonBase } from 'components/index';

const Post = styled.section`
    transition: all 1s ease;
    position: relative;

    display: flex;

    width: 100%;
    min-width: 250px;
    min-height: 80px;
    margin-bottom: 32px;
    border: 1px solid #f4f4f4;

    cursor: pointer;

    p {
        white-space: pre-line;
    }


    a {
        text-decoration: none;
        color: inherit;
        width: 100%;
        height: auto;
    }
`;

const MoreButton = styled(MoreButtonBase)`
    position: absolute;
    right: 5px;
    top: 10px;
`;

const PostTitle = styled.h2`
    font-size: 32px;
    line-height: 48px;
    padding: 0 8px;
`;

const TextPreview = styled.div`
    padding: 8px;
`;

export const Styled = {
    Post,
    MoreButton,
    PostTitle,
    TextPreview,
};
