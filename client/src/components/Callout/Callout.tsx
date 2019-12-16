import React, { useEffect } from 'react';

import { Props } from './Callout.types';

export const Callout: React.FC<Props> = ({ children, target }: Props) => {
    useEffect(() => {
        if (target) {
            const offset = window.pageYOffset;
            const targetPosition = offset + target.getBoundingClientRect().top;

            console.log(targetPosition);
        }
    }, [target]);

    return <div>{children}</div>;
};
