import React, { useEffect, useState, useCallback, useRef } from 'react';

import { Styled } from './MoreButton.styles';
import { Props } from './MoreButton.types';

import Icon from './assets/more.svg';

export const MoreButton: React.FC<Props> = ({
    calloutItems,
    ...props
}: Props) => {
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
            {!calloutHidden && (
                <Styled.Callout>
                    {calloutItems.map(({ key, label, onClick }) => (
                        <Styled.CalloutItem key={key} onClick={onClick}>
                            {label}
                        </Styled.CalloutItem>
                    ))}
                </Styled.Callout>
            )}
        </Styled.MoreButton>
    );
};
