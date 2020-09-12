import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Backdrop } from 'components';

import { useDelayUnmount } from 'hooks/useDelayUnmount';

import { Styled } from './Modal.styles';
import { Props } from './Modal.types';

import { root, body } from 'links';
import { smoothTime } from 'consts/animation';
import { Keys } from 'consts/keys';

export const Modal: React.FC<Props> = ({ children, open, onClose }) => {
    const shouldRender = useDelayUnmount({
        mounted: open,
        delay: smoothTime.int,
    });

    useEffect(() => {
        if (open) {
            const listener = (event: KeyboardEvent) => {
                if (event.code === Keys.Esc) {
                    onClose();
                }
            };
            document.addEventListener('keydown', listener);
            return () => document.removeEventListener('keydown', listener);
        }
    }, [onClose, open]);

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
