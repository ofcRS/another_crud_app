import React, {
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Styled } from './Callout.styles';
import { Props, Position } from './Callout.types';
import { body } from 'links';

export const Callout: React.FC<Props> = ({
    children,
    target,
    onDismiss,
    show,
}: Props) => {
    const [position, setPosition] = useState<Position>({
        x: 0,
        y: 0,
    });

    const calloutRef = useRef(null);

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
        if (target) {
            const yOffset = window.pageYOffset;
            const xOffset = window.pageXOffset;

            const targetWidth = target.offsetWidth;
            const targetHeight = target.offsetHeight;

            const y =
                yOffset + target.getBoundingClientRect().top + targetHeight;
            const x = xOffset + target.getBoundingClientRect().left;

            setPosition({ y, x });
        }
    }, [target]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideCallout);
        return () =>
            document.removeEventListener('click', handleClickOutsideCallout);
    }, [handleClickOutsideCallout]);

    return createPortal(
        <Styled.Callout show={show} ref={calloutRef} {...position}>
            {children}
        </Styled.Callout>,
        body
    );
};
