import styled from 'styled-components';

import { medium } from 'styles/breakpoints';
import { smoothTime } from 'consts/animation';

const Posts = styled.div<{ showPostPreview: boolean }>`
    width: 100%;
    padding-top: 32px;
    transition: all ${smoothTime.ms} linear;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    ${({ showPostPreview, theme }) => {
        if (!showPostPreview) return '';
        return `
            height: calc(100vh - ${theme.layout.headerHeight}px);
            overflow: hidden;
            left: -100vw;
        `;
    }}

    @media (min-width: ${medium}) {
        width: 50vw;
    }
`;

const MoreButton = styled.button`
    width: 320px;
    padding: 16px;
    margin: 0 auto;

    color: ${({ theme }) => theme.colors.neutral};
    font-size: 32px;
    font-weight: bold;

    background: ${({ theme }) => theme.colors.pastel[3]};
`;

export const Styled = {
    Posts,
    MoreButton,
};
