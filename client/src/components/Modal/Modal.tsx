import React from 'react';
import { createPortal } from 'react-dom';

import { Backdrop } from 'components';

import { Styled } from './Modal.styles';

import { Props } from './Modal.types';

import { root } from 'links';

export const Modal: React.FC<Props> = ({ children, onClose, open }) => {
    if (!root || !open) return null;
    return createPortal(
        <>
            <Backdrop onClick={onClose} />
            <Styled.Modal onClick={onClose}>{children}</Styled.Modal>
        </>,
        root
    );
};

export default Modal;
