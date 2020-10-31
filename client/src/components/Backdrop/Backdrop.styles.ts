import styled, { keyframes } from 'styled-components';
import { smoothTime, smoothTiming } from 'consts/animation';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const Backdrop = styled.div<{ show: boolean }>`
    z-index: 1;
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    width: 100%;
    height: 100%;

    animation-name: ${({ show }) => (show ? fadeIn : fadeOut)};
    animation-duration: ${smoothTime.ms};
    animation-timing-function: ${smoothTiming};
    animation-fill-mode: both;

    transition: visibility 1s linear;
`;

export const Styled = {
    Backdrop,
};
