import React, { useEffect, useState, useCallback, useRef } from 'react';

import { Callout } from 'components';

import { Styled } from './MoreButton.styles';
import { Props } from './MoreButton.types';

import Icon from './assets/more.svg';

export const MoreButton: React.FC<Props> = ({
    calloutItems,
    ...props
}: Props) => {
    const [calloutHidden, setCalloutHidden] = useState<boolean>(true);

    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <Styled.MoreButton
                ref={buttonRef}
                onClick={() => setCalloutHidden(false)}
                {...props}
            >
                <Icon />
            </Styled.MoreButton>
            {!calloutHidden && (
                <Callout
                    onDismiss={() => setCalloutHidden(true)}
                    target={buttonRef.current}
                >
                    {calloutItems.map(({ key, label, onClick }) => (
                        <Styled.CalloutItem key={key} onClick={onClick}>
                            {label}
                        </Styled.CalloutItem>
                    ))}
                </Callout>
            )}
        </>
    );
};
