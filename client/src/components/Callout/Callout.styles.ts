import styled, { keyframes } from 'styled-components';

import { Position } from './Callout.types';
import { smoothTime, smoothTiming } from 'consts/animation';

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
        height: max-content;
        animation-name: ${openCallout};
        animation-duration: ${smoothTime.ms};
        animation-timing-function: ${smoothTiming};
        animation-fill-mode: both;
    `,
};
