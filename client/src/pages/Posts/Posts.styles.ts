import styled from 'styled-components';

import { medium } from 'styles/breakpoints';
import { smoothTime } from 'consts/animation';

const Posts = styled.div<{ showPostPreview: boolean }>`
    width: 100%;
    padding-top: 32px;
    transition: all ${smoothTime.ms} linear;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    ${({ showPostPreview }) => {
        if (!showPostPreview) return '';
        return `
            left: -100vw;
        `;
    }}

    @media (min-width: ${medium}) {
        width: 50vw;
    }
`;

export const Styled = {
    Posts,
};
