import React, { useRef } from 'react';

import { Styled } from './Backdrop.styles';

import { Props } from './Backdrop.types';

export const Backdrop: React.FC<Props> = ({ onClick, children, show }) => {
    const backdropRef = useRef<HTMLDivElement>(null);

    return (
        <Styled.Backdrop
            show={show}
            ref={backdropRef}
            onClick={event => {
                //ignore click on children
                if (event.target === backdropRef.current) {
                    onClick();
                }
            }}
        >
            {children}
        </Styled.Backdrop>
    );
};
