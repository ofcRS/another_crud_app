import { useEffect, useState } from 'react';

export const useDelayUnmount = ({
    delay,
    mounted,
}: {
    mounted: boolean;
    delay: number;
}) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timerId: number;
        if (mounted && !shouldRender) {
            setShouldRender(true);
        } else if (!mounted && shouldRender) {
            timerId = setTimeout(() => {
                setShouldRender(false);
            }, delay);
        }
        return () => clearTimeout(timerId);
    }, [delay, mounted, shouldRender]);

    return shouldRender;
};
