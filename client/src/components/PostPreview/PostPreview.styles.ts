import styled from 'styled-components';

import { Props } from './PostPreview.types';

import { smoothTime } from 'consts/animation';

const PostPreview = styled.div<Props>`
    position: absolute;
    z-index: 1;

    width: 100%;
    height: 100%;
    left: ${({ show }) => (show ? '50%' : '100%')};
    transform: translateX(${({ show }) => (show ? '-50%' : '100%')});

    overflow: hidden;

    transition: all ${smoothTime.ms} linear;
`;

const ImagePreview = styled.div`
    margin: 0 auto 16px;
    width: 30vw;
`;

export const Styled = {
    PostPreview,
    ImagePreview,
};
