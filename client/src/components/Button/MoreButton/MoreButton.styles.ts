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
    CalloutItem: styled.div`
        cursor: pointer;
        width: max-content;
        border: 1px solid #000000;
    `,
};
