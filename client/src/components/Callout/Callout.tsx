import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Styled } from './Callout.styles';
import { Props, Position } from './Callout.types';
import { body } from 'links';

export const Callout: React.FC<Props> = ({
    children,
    target,
    onDismiss,
    ...props
}: Props) => {
    const [position, setPosition] = useState<Position>({
        x: 0,
        y: 0,
    });

    const calloutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('resize', () => onDismiss());
        return () => {
            window.removeEventListener('resize', onDismiss);
        };
    }, [onDismiss]);

    const handleClickOutsideCallout = useCallback(
        (event: MouseEvent) => {
            const callout = calloutRef.current;
            if (
                event.target instanceof Element &&
                callout &&
                !event.target.contains(callout)
            ) {
                onDismiss();
            }
        },
        [onDismiss]
    );

    useEffect(() => {
        const callout = calloutRef.current;
        if (target && callout) {
            const yOffset = window.pageYOffset;
            const xOffset = window.pageXOffset;

            const targetWidth = target.offsetWidth;
            const targetHeight = target.offsetHeight;

            const targetBounding = target.getBoundingClientRect();
            const calloutBounding = callout.getBoundingClientRect();

            const y = yOffset + targetBounding.top + targetHeight;
            let x = xOffset + targetBounding.left;

            // Если слева от таргета нет места рендерим справа
            if (calloutBounding.width + x > window.innerWidth) {
                x -= calloutBounding.width;
            }

            setPosition({ y, x });
        }
    }, [target]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideCallout);
        return () =>
            document.removeEventListener('click', handleClickOutsideCallout);
    }, [handleClickOutsideCallout]);

    return createPortal(
        <Styled.Callout ref={calloutRef} {...position} {...props}>
            {children}
        </Styled.Callout>,
        body
    );
};
