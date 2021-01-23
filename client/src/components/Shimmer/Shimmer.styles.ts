import styled, { keyframes } from 'styled-components';
import { Props } from './Shimmer.types';

const shimmerBackground = keyframes`
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
`;

const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '16px';

const GroupWrapper = styled.div`
    display: flex;
`;

const ShimmerWrapper = styled.div<Props>`
    position: relative;
    overflow-x: hidden;
    background: ${({ theme }) => theme.colors.dark};
    width: ${({ width }) => width ?? DEFAULT_WIDTH};
    height: ${({ height }) => height ?? DEFAULT_HEIGHT};

    border-radius: 5px;

    :not(:last-child) {
        margin-bottom: 16px;
        margin-right: 8px;
    }
`;

const Shimmer = styled.div`
    position: absolute;
    left: 0;

    background-image: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.dark} 0,
        ${({ theme }) => theme.colors.baseBackground} 35% 65%,
        ${({ theme }) => theme.colors.dark} 100%
    );

    height: 100%;
    width: 100%;

    animation: ${shimmerBackground} 2s ease infinite;
`;

export const Styled = {
    Shimmer,
    ShimmerWrapper,
    GroupWrapper,
};
