import styled from 'styled-components';

import { MoreButton as MoreButtonBase } from 'components/index';

const Post = styled.section`
    position: relative;
    width: 100%;
    min-width: 250px;
    min-height: 80px;
    border: 1px solid #f4f4f4;
    cursor: pointer;

    p {
        white-space: pre-line;
    }

    :not(:last-child) {
        margin-bottom: 32px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;
const MoreButton = styled(MoreButtonBase)`
    position: absolute;
    right: 5px;
    top: 5px;
`;

export const Styled = {
    Post,
    MoreButton,
};
