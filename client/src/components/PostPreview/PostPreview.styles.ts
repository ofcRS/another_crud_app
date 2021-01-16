import styled from 'styled-components';

import { Props } from './PostPreview.types';

import { smoothTime } from 'consts/animation';

const PostPreview = styled.div<Props>`
    position: fixed;
    z-index: 1;

    width: 100%;
    transform: translate(${({ show }) => (show ? '0' : '100%')});

    transition: all ${smoothTime.ms} linear;
`;

export const Styled = {
    PostPreview,
};
