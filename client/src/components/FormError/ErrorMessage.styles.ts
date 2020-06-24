import styled, { keyframes } from 'styled-components';
import { smoothTime, smoothTiming } from 'consts/animation';

const fadeIn = keyframes`
    0% {
        padding: 0;
        opacity: 0;
    }
    100% {
        padding: 0 0 10px;
        opacity: 1;
    }
`;

const ErrorMessageContainer = styled.div`
    padding: 0 0 10px;

    font-size: 14px;
    color: red;

    animation-name: ${fadeIn};
    animation-timing-function: ${smoothTiming};
    animation-duration: ${smoothTime.ms};
`;

const ErrorMessage = styled.div``;

export const Styled = {
    ErrorMessageContainer,
    ErrorMessage,
};
