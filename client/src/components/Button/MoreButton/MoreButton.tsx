import React, { useState, useRef } from 'react';

import { Callout } from 'components';

import { Styled } from './MoreButton.styles';
import { Props } from './MoreButton.types';

import { useDelayUnmount } from 'hooks/useDelayUnmount';
import { smoothTime } from 'consts/animation';
import { Icon } from '../../Icon';

export const MoreButton: React.FC<Props> = ({
    calloutItems,
    ...props
}: Props) => {
    const [calloutHidden, setCalloutHidden] = useState<boolean>(true);
    const shouldRender = useDelayUnmount({
        mounted: !calloutHidden,
        delay: smoothTime.int,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <Styled.MoreButton
                ref={buttonRef}
                onClick={() => setCalloutHidden(false)}
                {...props}
            >
                <Icon iconName="more" />
            </Styled.MoreButton>
            {shouldRender && (
                <Callout
                    show={!calloutHidden}
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
