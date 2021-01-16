import styled from 'styled-components';

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
};
