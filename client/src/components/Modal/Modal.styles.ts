import styled, { keyframes } from 'styled-components';
import { smoothTime, smoothTiming } from 'consts/animation';

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform:  translateY(calc(-50% + 30px)) translateX(-50%);
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
        transform: translateY(calc(-50% + 30px)) translateX(-50%);
    }
`;

const Modal = styled.div<{ show: boolean }>`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);

    color: ${({ theme }) => theme.colors.neutral};

    background: ${({ theme }) => theme.colors.baseBackground};

    width: max-content;
    height: max-content;

    animation-name: ${({ show }) => (show ? fadeIn : fadeOut)};
    animation-duration: ${smoothTime.ms};
    animation-timing-function: ${smoothTiming};
    animation-fill-mode: both;
`;

export const Styled = {
    Modal,
};
