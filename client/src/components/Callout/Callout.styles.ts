import styled, { keyframes } from 'styled-components';

import { Position, StyledCalloutProps } from './Callout.types';
import { smoothTime, smoothTiming } from 'consts/animation';

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px)
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0)
    }
    100% {
        opacity: 0;
        transform: translateY(10px);
    }
`;

const Callout = styled.div<Position & StyledCalloutProps>`
    position: absolute;
    top: ${({ y }) => y + 'px'};
    left: ${({ x }) => x + 'px'};

    height: max-content;

    color: ${({ theme }) => theme.colors.neutral};

    background: ${({ theme }) => theme.colors.baseBackground};

    animation-name: ${({ show }) => (show ? fadeIn : fadeOut)};
    animation-duration: ${smoothTime.ms};
    animation-timing-function: ${smoothTiming};
    animation-fill-mode: both;
`;

export const Styled = {
    Callout,
};
