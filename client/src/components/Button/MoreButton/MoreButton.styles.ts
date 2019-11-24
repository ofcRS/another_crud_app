import styled, { keyframes } from 'styled-components';

import { Styled as BaseButton } from '../Button.styles';

const openCallout = keyframes`
    0% {
        height: 0;
    }
    100% {
        height: 100%;
    }
`;

export const Styled = {
    MoreButton: styled(BaseButton.Button)`
        position: relative;
        width: 15px;
        height: 25px;
        background: none;
        border: none;

        svg {
            fill: #000000;
        }
    `,
    Callout: styled.div`
        position: absolute;
        width: max-content;
        height: max-content;
        overflow-y: hidden;
        cursor: auto;
        animation-name: ${openCallout};
        animation-duration: 150ms;
        animation-timing-function: ease-in-out;
    `,
    CalloutItem: styled.div`
        cursor: pointer;
        border: 1px solid #000000;
    `,
};
