import styled from 'styled-components';

import { Styled as BaseButton } from '../Button.styles';

const MoreButton = styled(BaseButton.Button)`
    position: relative;
    width: 15px;
    height: 25px;
    background: none;
    border: none;

    svg {
        fill: ${({ theme }) => theme.colors.neutral};
    }
`;

const CalloutItem = styled.div`
    cursor: pointer;
    width: max-content;
    border: 1px solid #000000;
`;

export const Styled = {
    MoreButton,
    CalloutItem,
};
