import React from 'react';
import { createPortal } from 'react-dom';
import { Backdrop } from 'components';
import { root, body } from 'links';

import { useDelayUnmount } from 'hooks/useDelayUnmount';

import { Styled } from './Modal.styles';
import { Props } from './Modal.types';
import { smoothTime } from '../../consts/animation';

export const Modal: React.FC<Props> = ({ children, open, onClose }) => {
    const shouldRender = useDelayUnmount({
        mounted: open,
        delay: smoothTime.int,
    });

    if (!root || !shouldRender) return null;

    return createPortal(
        <>
            <Backdrop show={open} onClick={onClose}>
                <Styled.Modal show={open}>{children}</Styled.Modal>
            </Backdrop>
        </>,
        body
    );
};
