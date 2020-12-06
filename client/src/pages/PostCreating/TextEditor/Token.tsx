import React, { useRef, useState } from 'react';

import { Callout } from 'components/Callout';
import { Icon } from 'components/Icon';

import { Styled } from './TextEditor.styles';
import { TokenProps } from './TextEditor.types';
import { useDelayUnmount } from '../../../hooks/useDelayUnmount';
import { smoothTime } from '../../../consts/animation';

export const Token: React.FC<TokenProps> = ({
    offsetKey,
    children,
    ...props
}) => {
    const [showCallout, setShowCallout] = useState(false);
    const tokenRef = useRef<HTMLSpanElement>(null);

    const shouldRender = useDelayUnmount({
        mounted: !showCallout,
        delay: smoothTime.int,
    });

    console.log({ props, showCallout });

    return (
        <Styled.Token
            ref={tokenRef}
            onClick={() => setShowCallout(true)}
            data-offset-key={offsetKey}
        >
            {shouldRender && (
                <Callout
                    target={tokenRef.current}
                    onDismiss={() => setShowCallout(false)}
                    show={showCallout}
                >
                    <div>123</div>
                </Callout>
            )}
            <Icon iconName="attach" />
            {children}
        </Styled.Token>
    );
};
