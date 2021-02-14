import styled from 'styled-components';

import { Props } from './PostPreview.types';

import { smoothTime } from 'consts/animation';

const PostPreview = styled.div<Props>`
    position: absolute;
    z-index: 1;

    width: 100%;
    height: 100%;

    background: ${({ theme }) => theme.colors.dark};

    left: ${({ show }) => (show ? '50%' : '100%')};
    transform: translateX(${({ show }) => (show ? '-50%' : '100%')});

    overflow: hidden;

    transition: all ${smoothTime.ms} linear;
`;

const Wrapper = styled.div`
    max-width: 680px;
    width: 50vw;

    margin: 0 auto;
`;

const ImagePreview = styled.div`
    margin: 0 auto 16px;
    width: 30vw;
`;

export const Styled = {
    PostPreview,
    ImagePreview,
    Wrapper,
};
