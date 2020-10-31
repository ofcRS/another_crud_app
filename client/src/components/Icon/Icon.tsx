import React, { useEffect, useState } from 'react';

import { Props } from './Icon.types';

export const Icon: React.FC<Props> = ({ iconName }) => {
    const [icon, setIcon] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const loadIcon = async () => {
            const { default: svgComponent } = await import(
                '../../assets/svg/' + iconName + '.svg'
            );
            setIcon(svgComponent);
        };
        loadIcon();
    }, [iconName]);

    if (!icon) return null;

    return icon;
};
