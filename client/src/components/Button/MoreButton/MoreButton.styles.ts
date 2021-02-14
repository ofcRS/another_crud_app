import styled from 'styled-components';

import { Styled as BaseButton } from '../Button.styles';

const MoreButton = styled(BaseButton.Button)`
    position: relative;
    background: none;

    border: none;
    padding: 0;

    svg {
        width: 25px;
        fill: ${({ theme }) => theme.colors.neutral};
    }
`;

const CalloutItem = styled.div`
    cursor: pointer;
    width: max-content;
    padding: 8px;
    font-size: 18px;
    border: 1px solid #000000;
`;

export const Styled = {
    MoreButton,
    CalloutItem,
};
