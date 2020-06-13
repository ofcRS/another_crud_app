import styled, { keyframes } from 'styled-components';
import { smoothTime, smoothTiming } from 'consts/animation';

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform:  translateY(50px) translateX(-50%);
    }
    100% {
        opacity: 1;
        transform: translateY(-50%) translateX(-50%);
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
        transform: translateY(-50%) translateX(-50%);

    }
    100% {
        opacity: 0;
        transform:  translateY(50px) translateX(-50%);

    }
`;

export const Styled = {
    Modal: styled.div<{ show: boolean }>`
        visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
        position: fixed;
        left: 50%;
        top: 50%;

        background: #fff;
        width: max-content;
        height: max-content;

        animation-name: ${({ show }) => (show ? fadeIn : fadeOut)};
        animation-duration: ${smoothTime.ms};
        animation-timing-function: ${smoothTiming};
        animation-fill-mode: both;

        transition: visibility 1s linear;
    `,
};
