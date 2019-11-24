import React, { useEffect, useState, useCallback, useRef } from 'react';

import { Styled } from './MoreButton.styles';
import Icon from './assets/more.svg';

export const MoreButton: React.FC<{}> = props => {
    const [calloutHidden, setCalloutHidden] = useState<boolean>(true);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClickDocument = useCallback((event: MouseEvent): void => {
        if (buttonRef && buttonRef.current) {
            if (
                event.target instanceof Element &&
                !buttonRef.current.contains(event.target)
            ) {
                setCalloutHidden(true);
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickDocument);
        return () => document.removeEventListener('click', handleClickDocument);
    }, [handleClickDocument]);

    return (
        <Styled.MoreButton
            ref={buttonRef}
            onClick={() => setCalloutHidden(false)}
            {...props}
        >
            <Icon />
            {!calloutHidden && <Styled.Callout>123</Styled.Callout>}
        </Styled.MoreButton>
    );
};
