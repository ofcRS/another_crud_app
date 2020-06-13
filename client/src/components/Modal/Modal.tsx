import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop } from 'components';
import { root, body } from 'links';

import { useDelayUnmount } from 'hooks/useDelayUnmount';

import { Styled } from './Modal.styles';
import { Props } from './Modal.types';
import { smoothTime } from '../../consts/animation';

export const Modal: React.FC<Props> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    const shouldRender = useDelayUnmount({
        mounted,
        delay: smoothTime.int,
    });

    if (!root || !shouldRender) return null;

    return createPortal(
        <>
            <Backdrop show={mounted} onClick={() => setMounted(false)}>
                <Styled.Modal show={mounted}>{children}</Styled.Modal>
            </Backdrop>
        </>,
        body
    );
};
