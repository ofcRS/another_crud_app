import styled, { keyframes } from 'styled-components';

import { Position } from './Callout.types';

const openCallout = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px)
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Styled = {
    Callout: styled.div<Position>`
        position: absolute;
        top: ${({ y }) => y + 'px'};
        left: ${({ x }) => x + 'px'};
        width: 33px;
        height: max-content;
        animation-name: ${openCallout};
        animation-duration: 267ms;
        animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
        animation-fill-mode: both;
    `,
};
